import React, { useState, useEffect } from "react";
import Web3 from "web3";
import SimpleStorage from "./SimpleStorge.json"
import FlashCard from "./FlashCards";
import tdpImage from "./ysr.jpg";
import ysrImage from "./tdp.jpg"; 
import jspImage from "./jsp.jpg"; 
import './Voters.css';
import { Link } from "react-router-dom";
import DisableBackButton from "./DisableBackButton";

function Voters() {
  const [state, setState] = useState({
    web3: null,
    contract: null,
  });
  const [dataA, setDataA] = useState("nill");
  const [dataB, setDataB] = useState("nill");
  const [dataC, setDataC] = useState("nill");
  //const [voted, setVoted] = useState(false);

  useEffect(() => {
    const provider = new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545");

    async function template() {
      const web3 = new Web3(provider);
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleStorage.networks[networkId];
      console.log(deployedNetwork.address);
      const contract = new web3.eth.Contract(
        SimpleStorage.abi,
        deployedNetwork && deployedNetwork.address // Add null check here
      );
      setState({ web3: web3, contract: contract });
    }

    provider && template();
  }, []);

  useEffect(() => {
    const { contract } = state;

    async function readData() {
      if (!contract) return;

      try {
        const dataA = await contract.methods.getter().call();
        const dataB = await contract.methods.getter1().call();
        const dataC = await contract.methods.getter2().call();
        setDataA(parseInt(dataA));
        setDataB(parseInt(dataB));
        setDataC(parseInt(dataC));
      } catch (error) {
        console.error("Error reading contract data:", error);
      }
    }

    readData();
  }, [state]);

  async function writeData(variable) {
    const { contract } = state;

    if (!contract) return;

    let newData;
    switch (variable) {
      case 'a':
        newData = parseInt(dataA) + 1;
        setDataA(newData);
        try {
          await contract.methods.setter(newData).send({ from: "0x4e75D40AA6188DDD007Dbf9aDE94a7890B2ECfB5"});
        } catch (error) {
          console.error("Error writing data A:", error);
        }
        window.alert("successfuly Voted");
        break;
      case 'b':
        newData = parseInt(dataB) + 1;
        setDataB(newData);
        try {
          await contract.methods.setter1(newData).send({ from: "0x4e75D40AA6188DDD007Dbf9aDE94a7890B2ECfB5"});
        } catch (error) {
          console.error("Error writing data B:", error);
        }
        window.alert("successfuly Voted");
        break;
      case 'c':
        newData = parseInt(dataC) + 1;
        setDataC(newData);
        try {
          await contract.methods.setter2(newData).send({ from: "0x4e75D40AA6188DDD007Dbf9aDE94a7890B2ECfB5"});
        } catch (error) {
          console.error("Error writing data C:", error);
        }
        window.alert("successfuly Voted");
        break;
      default:
        break;
    }
    //setVoted(true);
  }


  return (
    <div className="App">
      
      
      <DisableBackButton to ="/"/>
      
      <div className="flashcard-container">
      <h3>Vote Here</h3>
        <Link style={{ textDecoration: 'none' }} to="/" ><FlashCard className="flashcard" frontContent={<img  alt="Party Symbol" className="party-image" />} backContent="Vote YSRCP" onVote={() => writeData('a')} /></Link>
        <Link style={{ textDecoration: 'none' }} to="/"><FlashCard className="flashcard" frontContent={<img  alt="Party Symbol" className="party-image" />} backContent="Vote TDP" onVote={() => writeData('b')} /></Link>
        <Link style={{ textDecoration: 'none' }}to="/"><FlashCard className="flashcard" frontContent={<img  alt="Party Symbol" className="party-image" />} backContent="Vote JSP" onVote={() => writeData('c')} /></Link>
      </div>
    </div>
  );
}

export default Voters;
