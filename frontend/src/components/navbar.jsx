import React, { useState } from "react";
import "../App.css";
import imageProfile from "../images/profile.jpeg";
import imageLogo from "../images/logo.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header>
      <div className="logo">
        <img className="ada" src={imageLogo} alt="Logo" />
        <h1>sololearn</h1>
      </div>
      
      <div className="nav-menu">
        {!menuOpen ? (
          <svg
            onClick={toggleMenu}
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#5f6368"
          >
            <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
          </svg>
        ) : (
          <svg
            onClick={toggleMenu}
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#5f6368"
          >
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
          </svg>
        )}{" "}
      </div>
      {menuOpen && (
        <div className="nav-link">
          <ul>
            <li>
              <a href="#">Leaderboard</a>
            </li>
            <li>
              <a href="#">Courses</a>
            </li>
            <li>
              <a href="#">Code Playground</a>
            </li>
            <li>
              <a href="#">Discuss</a>
            </li>
            <li>
              <a href="#">Blog</a>
            </li>
            <li>
              <button className="go-pro">Go PRO</button>
            </li>
            <li>
              <p>465</p>
            </li>
            <li>
              <img height="100px" src={imageProfile} alt="Profile" />
            </li>
          </ul>
        </div>
      )}
      <nav className="navbar-icon">
        <ul>
          <li>
            <a href="#">Leaderboard</a>
          </li>
          <li>
            <a href="#">Courses</a>
          </li>
          <li>
            <a href="#">Code Playground</a>
          </li>
          <li>
            <a href="#">Discuss</a>
          </li>
          <li>
            <a href="#">Blog</a>
          </li>
          <li>
            <button className="go-pro">Go PRO</button>
          </li>
          <li>
            <p>465</p>
          </li>
          <li>
            <img src={imageProfile} alt="Profile" />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
