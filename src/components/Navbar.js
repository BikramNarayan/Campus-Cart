import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../assets/logo.png";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import "../assets/Navbar.css";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Link
      style={{ padding: "10px 35px", borderRadius: 25 }}
      className="nav-link login-button"
      to="/"
      onClick={() => loginWithRedirect()}
    >
      Log In
    </Link>
  );
};

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <Link
      className="nav-link login-button"
      style={{ padding: "10px 35px", borderRadius: 25 }}
      to="/"
      onClick={() =>
        logout({
          // @ts-ignore
          returnTo: window.location.origin,
        })
      }
    >
      <FontAwesomeIcon className="mx-1" icon={faSignOutAlt} />
      Logout
    </Link>
  );
};

const Navbar = () => {
  const { isAuthenticated, user } = useAuth0();
  const [navbarExpanded, setNavbarExpanded] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to manage dropdown menu visibility

  const handleNavbarToggle = () => {
    setNavbarExpanded(!navbarExpanded);
  };

  const handleLinkClick = () => {
    setNavbarExpanded(false);
  };

  // Function to handle mouse enter event for the dropdown menu
  const handleDropdownEnter = () => {
    setIsDropdownOpen(true);
  };

  // Function to handle mouse leave event for the dropdown menu
  const handleDropdownLeave = () => {
    setIsDropdownOpen(false);
  };

  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{ marginBottom: 30, paddingBottom: 0 }}
    >
      <div className="container">
        <Link to="/" className="navbar-brand">
          <img
            src={logo}
            alt="logo"
            width="30"
            height="30"
            style={{ paddingBottom: 10 }}
          />
          Campus Cart!
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded={navbarExpanded ? "true" : "false"}
          aria-label="Toggle navigation"
          onClick={handleNavbarToggle}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`collapse navbar-collapse justify-content-end ${
            navbarExpanded ? "show" : ""
          }`}
          id="navbarNav"
        >
          <ul
            className="navbar-nav mid-nav"
            style={{ marginRight: "auto", marginLeft: "auto" }}
          >
            <li className="nav-item">
              <Link className="nav-link" to="/" onClick={handleLinkClick}>
                HOME
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about" onClick={handleLinkClick}>
                ABOUT
              </Link>
            </li>

            <li
              className="nav-item"
              onMouseEnter={handleDropdownEnter}
              onMouseLeave={handleDropdownLeave}
            >
              <div className="dropdown">
                <button
                  className="btn dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded={isDropdownOpen ? "true" : "false"}
                >
                  SERVICES
                </button>
                <ul
                  className={`dropdown-menu ${isDropdownOpen ? "show" : ""}`}
                  aria-labelledby="dropdownMenuButton1"
                >
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/buy"
                      onClick={handleLinkClick}
                    >
                      Buy / Sell<i className="bx bx-up-arrow-alt"></i>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/sell"
                      onClick={handleLinkClick}
                    >
                      Enlist your items<i className="bx bx-up-arrow-alt"></i>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/ridesharing"
                      onClick={handleLinkClick}
                    >
                      Share Ride<i className="bx bx-up-arrow-alt"></i>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/combine"
                      onClick={handleLinkClick}
                    >
                      Combined Orders<i className="bx bx-up-arrow-alt"></i>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/yourblogs"
                      onClick={handleLinkClick}
                    >
                      Your Blogs<i className="bx bx-up-arrow-alt"></i>
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
          <ul className="navbar-nav nav-2">
            <li className="nav-item d-flex">
              {isAuthenticated && (
                <Link className="nav-link m-0" onClick={handleLinkClick}>
                  {user?.nickname || user?.name || "User"}
                  <img
                    style={{ height: 30, borderRadius: "50%", paddingLeft: 8 }}
                    src={user.picture}
                    alt={user.name}
                  />
                </Link>
              )}
            </li>

            {isAuthenticated ? (
              <li className="nav-item">
                <LogoutButton />
              </li>
            ) : (
              <li className="nav-item">
                <LoginButton />
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
