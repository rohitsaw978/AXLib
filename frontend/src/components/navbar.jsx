import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import "./navbar.css";
import logo from "../assets/axlib-logo.png";
import { FaUserCircle } from "react-icons/fa";

export default function Navbar() {

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const token = localStorage.getItem("authToken");

  const navigate = useNavigate();

  /* ===============================
      SCROLL EFFECT
  =============================== */

  useEffect(() => {

    const handleScroll = () => {

      if (window.scrollY > 40) {

        setScrolled(true);

      } else {

        setScrolled(false);

      }

    };

    window.addEventListener("scroll", handleScroll);

    return () => {

      window.removeEventListener("scroll", handleScroll);

    };

  }, []);

  /* ===============================
      LOGOUT
  =============================== */

  const handleLogout = () => {

    localStorage.removeItem("authToken");
    localStorage.removeItem("role");

    navigate("/login");

  };

  /* ===============================
      CLOSE MOBILE MENU
  =============================== */

  const closeMenu = () => {

    setMenuOpen(false);

  };

  /* ===============================
      NAVIGATION CLICK
  =============================== */

  const handleNavClick = () => {

    closeMenu();

    window.scrollTo({

      top: 0,
      left: 0,
      behavior: "smooth",

    });

  };

  return (

    <nav
      className={`navbar ${scrolled ? "scrolled" : ""}`}
    >

      <div className="navbar-container">

        {/* ===============================
              LOGO
        =============================== */}

        <Link
          to="/"
          className="navbar-brand"
          onClick={handleNavClick}
        >

          <img
            src={logo}
            alt="AXLIB Logo"
            className="navbar-logo"
          />

          <div className="brand-text">

            <h2>

              <span className="logo-a">
                A
              </span>

              XLIB

            </h2>

          </div>

        </Link>

        {/* ===============================
              MOBILE TOGGLE
        =============================== */}

        <button
          className={`navbar-toggle ${menuOpen ? "open" : ""
            }`}
          onClick={() => setMenuOpen(!menuOpen)}
        >

          <span className="toggle-bar"></span>

          <span className="toggle-bar"></span>

          <span className="toggle-bar"></span>

        </button>

        {/* ======= PART 2 STARTS FROM HERE ======= */}

        {/* ===============================
              NAVIGATION MENU
        =============================== */}

        <div
          className={`navbar-links ${menuOpen ? "show" : ""
            }`}
        >

          <NavLink
            to="/"
            onClick={handleNavClick}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/books"
            onClick={handleNavClick}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Books
          </NavLink>

          <NavLink
            to="/category"
            onClick={handleNavClick}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Category
          </NavLink>

          <NavLink
            to="/aboutus"
            onClick={handleNavClick}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            About
          </NavLink>

          <NavLink
            to="/contactus"
            onClick={handleNavClick}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Contact
          </NavLink>

          {/* ===============================
                AUTH SECTION
          =============================== */}

          <div className="auth-section">

            {token ? (

              <>

                <Link
                  to="/user"
                  className="login-btn"
                  onClick={handleNavClick}
                >
                  <FaUserCircle className="nav-icon" />
                  &nbsp;Profile
                </Link>

                <button
                  className="logout-btn"
                  onClick={() => {
                    closeMenu();
                    handleLogout();
                  }}
                >
                  Logout
                </button>

              </>

            ) : (

              <>

                <Link
                  to="/login"
                  className="login-btn"
                  onClick={handleNavClick}
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="signup-btn"
                  onClick={handleNavClick}
                >
                  Signup
                </Link>

              </>

            )}

          </div>

        </div>
      </div>

    </nav>

  );

}