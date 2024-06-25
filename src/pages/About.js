import React from "react";
import "../assets/Trade.css";
import mouse from "../assets/mouse.png";
import college from "../assets/IIIT-Lucknow.jpg";
import "../assets/About.css";
function About() {
  return (
    <div className="about">
      <div className="container-fluid mt-3">
        <div className=" pb-3">
          <div className="alignMid">
            <h1 className="about-h1">
              Campus Cart <br />
              Your Gateway to Smart Campus Living
            </h1>
          </div>
          <div className="text-center img">
            <a href="#text" className="text-decoration-none">
              <img src={mouse} alt="mouse" className="img-fluid pb-4" />
              <p className="yellow-text pb-5">SCROLL DOWN</p>
            </a>
          </div>
        </div>
      </div>

      <div id="text" className="container-fluid p-5 text">
        <div className="container text-white">
          <h3>
            Campus Cart is a comprehensive campus service platform designed
            specifically for college students to facilitate buying, selling, and
            sharing of items and services. The platform promotes cost-effective
            exchanges by enabling students to trade used items at affordable
            prices, share taxis for reduced transportation costs, and combine
            online orders to eliminate extra charges and secure specific
            discounts from popular services like Blinkit, BigBasket, and
            Flipkart Groceries. By integrating various services into a single
            platform, CampusMart aims to foster a sustainable and supportive
            campus community.
          </h3>
        </div>
      </div>
    </div>
  );
}

export default About;
