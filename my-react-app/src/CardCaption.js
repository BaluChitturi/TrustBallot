import React, { useState, useEffect } from 'react';
import './CardCaption.css'; // Import your CSS file for styling
import Verification from './pages/Ver';
import { Link } from 'react-router-dom';
import myVideo from './vid.mp4';

const CardCaption = () => {
  return (
    <div className='View'>
           <div className="dash">
  <video autoPlay muted loop>
    <source src={myVideo} type="video/mp4" />
    Your browser does not support the video tag.
  </video>
</div>
<div className='content'>
        <h3>Start Voting</h3>
        <p>"Voting is the cornerstone of democracy,<br></br> empowering voices and shaping futures."</p>
        <Link to="/verification" style={{ textDecoration: 'none' }}>
         <button className='Verify'>Verify Your Vote</button>
        </Link>
      </div>
    </div>
  );
};

export default CardCaption;
/*
<div className='CardCaption'>
     
      
</div>*/