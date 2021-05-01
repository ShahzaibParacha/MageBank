import React from "react";
import "../App.css";

const Navbar = () => {
  return (
    <nav>
      <div className="logo">
        <a href="/">
          <img src="/favicon.ico" alt="MageBank-Logo"></img>
        </a>
      </div>
      <ul className="nav-links">
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/About">About</a>
        </li>
        <li>
          <a href="/Images">Images</a>
        </li>
        <li>
          <a href="/Add">Add</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
