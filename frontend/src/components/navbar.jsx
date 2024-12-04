import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import imageProfile from "../images/profile.jpeg";
import imageLogo from "../images/logo.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const navLinks = [
    { name: "Leaderboard", path: "/leaderboard" },
    { name: "Quiz", path: "/quiz" },
    { name: "Courses", path: "#" },
    { name: "Code Playground", path: "#" },
    { name: "Discuss", path: "#" },
    { name: "Blog", path: "#" },
  ];

  return (
    <header>
      <div className="logo">
        <img className="ada" src={imageLogo} alt="Logo" />
        <h1>sololearn</h1>
      </div>

      <div className="nav-menu">
        <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle Menu">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            width="24px"
            fill="#5f6368"
          >
            <path
              d={
                menuOpen
                  ? "m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"
                  : "M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" 
              }
            />
          </svg>
        </button>
      </div>

      {(menuOpen || window.innerWidth > 768) && (
        <nav className="nav-link">
          <ul>
            {navLinks.map((link, index) => (
              <li key={index}>
                <Link to={link.path}>{link.name}</Link>
              </li>
            ))}
            <li>
              <button className="go-pro">Go PRO</button>
            </li>
            <li>
              <img className="profile-image" src={imageProfile} alt="Profile" />
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
