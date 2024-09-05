import React, { useEffect, useRef, useState } from 'react';
import AWS from 'aws-sdk';
import './verification.css'
import { useNavigate } from 'react-router-dom';
import App from '../App';
import Voters from "./Voters";
const Ver = () => {
  const navigate=useNavigate();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const photoRef = useRef(null);
  const [photoData, setPhotoData] = useState(null);

  useEffect(() => {
    startCamera();
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const capturePhoto = () => {
    const context = canvasRef.current.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
    const dataUrl = canvasRef.current.toDataURL('image/jpeg');
    setPhotoData(dataUrl);
    photoRef.current.src = dataUrl;
    photoRef.current.style.display = 'block';
    uploadToS3(dataUrl);
    //voterVerification();
  };

  const uploadToS3 = async (photoData) => {
    AWS.config.update({
      accessKeyId: 'AKIAQNPVCM45L4PJPHXS',
      secretAccessKey: 'a6iCUWsugYnxSZiEBOcJmDy8RGGVi6XmvcFbMm7Q',
      region: 'ap-south-1'
    });
    const s3 = new AWS.S3();
    const imageData = photoData.replace(/^data:image\/\w+;base64,/, '');
    const arrayBuffer = Uint8Array.from(atob(imageData), (c) => c.charCodeAt(0));
    const buffer = new Blob([arrayBuffer], { type: 'image/jpeg' });

    const params = {
      Bucket: 'temporary-098',
      Key: 'image.jpeg',
      Body: buffer,
      ContentType: 'image/jpeg'
    };
    s3.putObject(params, async (err, data) => {
      if (err) {
          console.error('Error uploading image:', err);
      } else {
          const rekognition = new AWS.Rekognition();
          const detectParams = {
              Image: {
                  S3Object: {
                      Bucket: 'temporary-098',
                      Name: 'image.jpeg'
                  }
              }
          };

          rekognition.detectFaces(detectParams, (err, data) => {
              if (err) {
                  console.log('Error detecting faces:', err);
              } else {
                  const numFaces = data.FaceDetails.length;
                  if (numFaces >= 2) {
                      console.log('There are two or more faces in the image.');
                      window.alert("there are "+numFaces+"faces we are unable to vote");
                      window.location.href='/';
                  } else {
                      console.log('There are fewer than two faces in the image.');
                      const params1 = {
                          Bucket: 'my-bucket-for-captured-image',
                          Key: 'image.jpeg',
                          Body: buffer,
                          ContentType: 'image/jpeg'
                      };

                      s3.putObject(params1, async (err, data) => {
                          if (err) {
                              console.error('Error uploading image:', err);
                          } else {
                              console.log('Image uploaded successfully:', data);
                              

                          }
                      });
                      voterVerification();
                  }
              }
          });
 }
});
    
  };


  

  const voterVerification = async () => {
    const rekognition = new AWS.Rekognition();
    const bucket_name_1 = 'my-bucket-for-captured-image';
    const bucket_name_2 = 'my-bucket-for-actual-images';
    const bucket_name_3 = 'my-bucket-for-voted-images';
    let a = 0;

    try {
      const s3 = new AWS.S3();
      const response1 = await s3.listObjectsV2({ Bucket: bucket_name_1 }).promise();
      const response2 = await s3.listObjectsV2({ Bucket: bucket_name_2 }).promise();
      const response3 = await s3.listObjectsV2({ Bucket: bucket_name_3 }).promise();

      const object_key_1 = response1.Contents[0].Key;

      if (!response1.Contents || !response2.Contents) {
        console.log("Objects not found in one or both buckets.");
      }

      for (const obj of response2.Contents) {
        const object_key_2 = obj.Key;
        const image_source_1 = {
          S3Object: {
            Bucket: bucket_name_1,
            Name: object_key_1
          }
        };
        const image_source_2 = {
          S3Object: {
            Bucket: bucket_name_2,
            Name: object_key_2
          }
        };
        
        const response = await rekognition.compareFaces({
          SourceImage: image_source_1,
          TargetImage: image_source_2,
          SimilarityThreshold: 90
        }).promise();
        if (response.FaceMatches.length > 0) {
          console.log("voter is in voters list");
          a++;
          if (!response3.Contents) {
            console.log("voter is eligible");
            const params = {
              Bucket: 'my-bucket-for-voted-images',
              Key: object_key_2,
              Body: object_key_2,
              ContentType: 'image/jpeg'
            };
            try {
              const data = await s3.putObject(params).promise();
              console.log('Image uploaded successfully:', data);
            } catch (error) {
              console.error('Error uploading image:', error);
            }
            window.location.href='/'
          } else {
            let x = 0;
            for (const obj of response3.Contents) {
              const object_key_3 = obj.Key;
              if (object_key_2 === object_key_3) {
                x = 1;
                window.alert("Voter is Already Voted");
                console.log("already voted");
                window.location.href='/';
              }
            }
            if (x === 0) {
              console.log("voter is eligible");
              const params = {
                Bucket: 'my-bucket-for-voted-images',
                Key: object_key_2,
                Body: object_key_2,
                ContentType: 'image/jpeg'
              };
              try {
                const data = await s3.putObject(params).promise();
                console.log('Image uploaded successfully:', data);
              } catch (error) {
                console.error('Error uploading image:', error);
              }
              //redirect to voting page
              window.location.href='./Voters';
            }
          }
        }
      }
      if (a === 0) {
        console.log("voter is not in voters list");
        window.alert("Voter is not in the voters list.");
       window.location.href='/';
        //redirect to same page
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <div className="header">
        <h5>Image Upload and Comparison</h5>
      </div>
      <div className="container">
        <div className="camera-container">
          <video ref={videoRef} width="400" height="400" autoPlay></video>
        </div>
        <h3 style={{ display: 'none' }}>Verfying</h3>
        <canvas ref={canvasRef} width="400" height="400" style={{ display: 'none' }}></canvas>
        <img  ref={photoRef} width="100" height="100" style={{ display: 'none' }} alt="Captured Photo" />
      </div>
      <center><button onClick={capturePhoto}>Capture Photo</button></center>
    </div>
  );
};
export default Ver;
