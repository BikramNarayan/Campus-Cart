import React from "react";
import butterfly from "../assets/butterfly.png";
import campus from "../assets/IIIT-Lucknow3.jpg";
import "../assets/Contact.css";
import { Link } from "react-router-dom";

function Contact() {
  return (
    <div>
      <footer>
        <div
          className="container contact-container"
          // style={{ paddingTop: 25, paddingBottom: 25 }}
        >
          <div className="row">
            <div className="col-md-6 mt-5">
              <p style={{ fontWeight: "400" }}>Download app from</p>
              <i class="bx bxl-play-store bx-lg" style={{ rotate: "none" }}></i>
              <i class="bx bxl-apple bx-lg" style={{ rotate: "none" }}></i>
              <br /> <br />
              <br />
            </div>

            <div className="col-md-6 right-col">
              <img
                className="img-fluid"
                src={campus}
                alt=""
                style={{ borderRadius: "69px" }}
              />
            </div>
          </div>
        </div>

        <div className="green">
          <p>
            All rights reserved ©️CampusCart 2023 <br />
            {/* Developed by{" "}
            <a href="https://www.linkedin.com/in/bikram-narayan/">
              Bikram Narayan Dhanraj
            </a>{" "} */}
            <span className="up-arrow">
              <a className="p-2" href="#">
                <i className="bx bx-up-arrow-alt"></i>
              </a>
            </span>
          </p>
          <div className="row" style={{ marginRight: 0, marginLeft: 0 }}>
            <div className="col-lg-4">
              <Link className="links" to="">
                Terms & Conditions
              </Link>
            </div>

            <div className="col-lg-4">
              <Link className="links" to="/contact">
                Contact Us
              </Link>
            </div>
            <div className="col-lg-4">
              <Link className="links" to="/about">
                About
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Contact;
