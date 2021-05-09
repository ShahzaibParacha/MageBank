import React from "react";
import "../MageBank.css";

const About = () => {
  return (
    <div className="about">
      <h1>About</h1>
      <br />
      <p>This is my take on the Shopify Developer Intern Challenge Question for Fall 2021</p>
      <h3>How to use?</h3>
      <div className="detail">
        <p>
          To use the app, navigate to the home page. There click on view all
          images to view all the images in the repository.
        </p>
      </div>
      <br />
      <h3>Technologies Used</h3>
      <ul>
        <li>React</li>
        <li>AWS S3</li>
        <li>PostgreSQL</li>
        <li>Coolors for the Palette</li>
        <li></li>
      </ul>
    </div>
  );
};

export default About;
