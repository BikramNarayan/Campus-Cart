import React from "react";
import { Link } from "react-router-dom";
// @ts-ignore
import tree1 from "../assets/tree1.png";
// @ts-ignore
import group2 from "../assets/Group2.png";
import group4 from "../assets/group3.png";
import group3 from "../assets/Maskgroup.png";
import campus_mask from "../assets/campus1.jpg";
import planetclip from "../assets/planetclip.png";
import card1 from "../assets/card1.png";
import card2 from "../assets/card2.png";
import card3 from "../assets/card3.png";
import college_logo from "../assets/logo_college.png";
import eco from "../assets/eco.webp";
import u1 from "../assets/Untitled.jpeg";
import u2 from "../assets/Untitled (1).jpeg";
import u3 from "../assets/Untitled (2).jpeg";
import "../App.css";
import "../assets/Home.css";
import hero from "../assets/hero2.png";
function Home() {
  return (
    <div>
      {/* landing */}
      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-6 home-div">
              <div>
                {/* <h1>{process.env.REACT_APP_DOMAIN} </h1> */}
                <h1>
                  Welcome to{" "}
                  <span
                    style={{
                      border: "3px solid #DCF8AB",
                      borderRadius: 40,
                      padding: "0px 12px",
                    }}
                  >
                    Campus Cart
                  </span>{" "}
                  - Your{" "}
                  <span
                    style={{
                      backgroundColor: "#DCF8AB",
                      borderRadius: 40,
                      padding: "0px 12px",
                    }}
                  >
                    one-stop
                  </span>{" "}
                  shop for{" "}
                  <img
                    src={college_logo}
                    alt=""
                    className="sapling pb-1"
                    style={{ width: "100px", height: "100px" }}
                  />
                  campus community{" "}
                </h1>{" "}
                <br />
                <p className="para-text">
                  This platform promotes cost-effective exchanges by enabling
                  students to trade used items at affordable prices, share taxis
                  for reduced transportation costs, and combine online orders to
                  eliminate extra charges and secure specific discounts from
                  popular services like Blinkit, BigBasket, and Flipkart
                  Groceries. By integrating various services into a single
                  platform.
                </p>{" "}
                <br />
              </div>
              <a className="butn" href="#about-us">
                Learn More <i className="bx bx-up-arrow-alt"></i>
              </a>
            </div>
            <div className="col-md-6">
              <img
                className="img-fluid"
                style={{ boxShadow: "none" }}
                src={hero}
                alt="group"
              />
            </div>
          </div>
        </div>
      </section>
      <br />
      {/* merquesssss */}
      <section className="section2">
        <div className="news-ticker">
          <marquee behavior="scroll" direction="left" loop="infinite">
            {/* Add your news items here */}
            <img
              className="img-fluid"
              src={eco}
              style={{ height: "20px", width: "20px" }}
              alt="campusIcon"
            />
            <span className="merq">Trade used items at affordable prices!</span>
            <img
              className="img-fluid"
              src={eco}
              style={{ height: "20px", width: "20px" }}
              alt="campusIcon"
            />
            <span className="merq">
              Share taxis to reduce transportation costs!
            </span>
            <img
              className="img-fluid"
              src={eco}
              style={{ height: "20px", width: "20px" }}
              alt="campusIcon"
            />
            <span className="merq">
              Combine online orders to save on extra charges!
            </span>
            <img
              className="img-fluid"
              src={eco}
              style={{ height: "20px", width: "20px" }}
              alt="campusIcon"
            />
            <span className="merq">
              Secure discounts from popular services!
            </span>
            <img
              className="img-fluid"
              src={eco}
              style={{ height: "20px", width: "20px" }}
              alt="campusIcon"
            />
            <span className="merq">Join a supportive campus community!</span>
            <img
              className="img-fluid"
              src={eco}
              style={{ height: "20px", width: "20px" }}
              alt="campusIcon"
            />
            <span className="merq">Trade used items at affordable prices!</span>
            <img
              className="img-fluid"
              src={eco}
              style={{ height: "20px", width: "20px" }}
              alt="campusIcon"
            />
            <span className="merq">
              Share taxis to reduce transportation costs!
            </span>
            <img
              className="img-fluid"
              src={eco}
              style={{ height: "20px", width: "20px" }}
              alt="campusIcon"
            />
            <span className="merq">
              Combine online orders to save on extra charges!
            </span>
            <img
              className="img-fluid"
              src={eco}
              style={{ height: "20px", width: "20px" }}
              alt="campusIcon"
            />
            <span className="merq">
              Secure discounts from popular services!
            </span>
            <img
              className="img-fluid"
              src={eco}
              style={{ height: "20px", width: "20px" }}
              alt="campusIcon"
            />
            <span className="merq">Join a supportive campus community!</span>
            <img
              className="img-fluid"
              src={eco}
              style={{ height: "20px", width: "20px" }}
              alt="campusIcon"
            />
            <span className="merq">Trade used items at affordable prices!</span>
            <img
              className="img-fluid"
              src={eco}
              style={{ height: "20px", width: "20px" }}
              alt="campusIcon"
            />
            <span className="merq">
              Share taxis to reduce transportation costs!
            </span>
            <img
              className="img-fluid"
              src={eco}
              style={{ height: "20px", width: "20px" }}
              alt="campusIcon"
            />
            <span className="merq">
              Combine online orders to save on extra charges!
            </span>
            <img
              className="img-fluid"
              src={eco}
              style={{ height: "20px", width: "20px" }}
              alt="campusIcon"
            />
            <span className="merq">
              Secure discounts from popular services!
            </span>
            <img
              className="img-fluid"
              src={eco}
              style={{ height: "20px", width: "20px" }}
              alt="campusIcon"
            />
            <span className="merq">Join a supportive campus community!</span>
          </marquee>
        </div>
      </section>

      {/* mission page */}
      <section className="section3">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <img
                className="img-fluid"
                style={{
                  // boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  borderRadius: "69px",
                }}
                src={campus_mask}
                alt="group"
              />
            </div>
            <div className="col-md-6 mission">
              <p className="yellow-text">Campus Cart</p>
              <h1 id="about-us">
                {" "}
                A comprehensive{" "}
                <span
                  style={{
                    backgroundColor: "#DCF8AB",
                    borderRadius: 40,
                    padding: "0px 12px",
                  }}
                >
                  campus service platform
                </span>{" "}
                designed specifically for iitl students.
              </h1>{" "}
              <br />
              <p className="yellow-text">Our Mission</p>
              <h1 id="about-us">
                {" "}
                To promote{" "}
                <span style={{ fontWeight: "bold", color: "#C0D62C" }}>
                  sustainability and proper resource use
                </span>{" "}
                within the campus community.
              </h1>{" "}
              <br />
              <p className="para-text">
                CampusMart aims to save costs and encourage eco-friendly habits
                by enabling students to buy, sell, and share items and services.
                By trading used items at affordable prices, sharing
                transportation, and combining online orders to reduce extra
                charges, we help minimize waste and promote the efficient use of
                resources.
              </p>
              <Link className="butn" to="/about">
                Learn More <i className="bx bx-up-arrow-alt"></i>
              </Link>
            </div>
          </div>
        </div>{" "}
        <br /> <br /> <br />
      </section>

      {/* solution and cards */}
      <section className="section4 mt-5">
        <div className="container">
          <p className="yellow-text">Solutions</p>
          <h1>
            CampusMart isn’t just about facilitating more exchanges. It's about
            promoting smarter, more sustainable choices.
          </h1>{" "}
          <br /> <br />
          <div className="row">
            {/* Card 1 */}
            <div className="col-lg-4 col-md-6 mb-4">
              <Link to="/buy" style={{ textDecoration: "none" }}>
                <div
                  className="card"
                  style={{ height: "95%", width: "90%", padding: 15 }}
                >
                  <img src={u2} className="card-img-top" alt="Card 1" />
                  <p className="p-3  card-title text-center">Buy/Sell</p>
                </div>
              </Link>
            </div>

            {/* Card 2 */}
            <div className="col-lg-4 col-md-6 mb-4">
              <Link to="/ridesharing" style={{ textDecoration: "none" }}>
                <div
                  className="card"
                  style={{ height: "95%", width: "90%", padding: 15 }}
                >
                  <img src={u1} className="card-img-top" alt="Card 2" />
                  <p className="p-3  card-title text-center">Share a ride</p>
                </div>
              </Link>
            </div>

            {/* Card 3 */}
            <div className="col-lg-4 col-md-6 mb-4">
              <Link to="/combine" style={{ textDecoration: "none" }}>
                <div
                  className="card"
                  style={{ height: "95%", width: "90%", padding: 15 }}
                >
                  <img src={u3} className="card-img-top" alt="Card 3" />
                  <p className="p-3  card-title text-center">Combined Orders</p>
                </div>
              </Link>
            </div>
          </div>{" "}
          <br /> <br />
        </div>
      </section>
    </div>
  );
}

export default Home;
