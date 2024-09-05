import React from 'react';
import './Navbar.css'; // Import the CSS file
import { Link } from 'react-router-dom'; // Import Link from React Router
import { Carousel } from 'react-bootstrap';
import CardCaption from './CardCaption';
import CardCaption1 from './CardCaption1';
import Footer from  './Footer';

function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          {/* Use Link component instead of anchor tag */}
          <Link className="navbar-brand" to="/" style={{ color: 'orengered' }}>Let's Vote</Link>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              {/* Use Link component instead of anchor tag */}
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              {/* Use Link component to navigate to the About page */}
              <li className="nav-item">
                <Link className="nav-link" to="/About">About</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Help">Help</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <CardCaption />
      <CardCaption1 />
      <Footer />
    </div>
  );
}

export default Navbar;
