import React, { useState, useEffect } from 'react';
import './CardCaption1.css'; // Import your CSS file for styling
import Verification from './pages/Ver';
import { Link } from 'react-router-dom';
import myVideo from './vid.mp4';

const CardCaption1 = () => {
  return (
    <div className='View1'>
<div className='content1'>
        <h3>What are the Steps?</h3>
        <ul>
            <li>Register for vote</li>
            <li>Click on Verify button</li>
            <li>Capture your Image</li>
            <li>Vote</li>
        </ul>
      </div>
      <div className="dash1">
    <img src="https://img.freepik.com/free-vector/internet-electronic-voting_74855-4428.jpg?w=740&t=st=1708118844~exp=1708119444~hmac=855d7888c71eccf3c09baed09e60ec561a6e31411cdf001a5e845d410295616b"></img>
</div>
    </div>
  );
};

export default CardCaption1;
/*
<div className='CardCaption'>
     
      
</div>*/