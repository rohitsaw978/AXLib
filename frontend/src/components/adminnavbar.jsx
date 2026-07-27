import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./adminnavbar.css";
import logo from "../assets/axlib-logo.png";
import { FaBook, FaPlus, FaUserCircle } from "react-icons/fa";
export default function AdminNavbar() {

  const [menuOpen, setMenuOpen] = useState(false);
  const [booksOpen, setBooksOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const token = localStorage.getItem("authToken");
  const role = localStorage.getItem("role");

  const navigate = useNavigate();

  /* ==========================
      SCROLL EFFECT
  ========================== */

  useEffect(() => {

    const handleScroll = () => {

      setScrolled(window.scrollY > 40);

    };

    window.addEventListener("scroll", handleScroll);

    return () => {

      window.removeEventListener("scroll", handleScroll);

    };

  }, []);

  /* ==========================
      LOGOUT
  ========================== */

  const handleLogout = () => {

    localStorage.removeItem("authToken");
    localStorage.removeItem("role");

    navigate("/login");

  };

  /* ==========================
      CLOSE MENU
  ========================== */

  const closeMenu = () => {

    setMenuOpen(false);
    setBooksOpen(false);

  };

  return (

    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>

      <div className="navbar-container">

        {/* ==========================
            LOGO
        ========================== */}

        <Link
          to="/admin"
          className="navbar-brand"
          onClick={closeMenu}
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

        {/* ==========================
            MOBILE TOGGLE
        ========================== */}

        <button
          className={`navbar-toggle ${menuOpen ? "open" : ""
            }`}
          onClick={() => {
  setMenuOpen((prev) => !prev);

  if (menuOpen) {
    setBooksOpen(false);
  }
}}
        >

          <span className="toggle-bar"></span>
          <span className="toggle-bar"></span>
          <span className="toggle-bar"></span>

        </button>

        {/* ===== PART 2 START ===== */}
        {/* ==========================
            NAVIGATION MENU
        ========================== */}

        <div
          className={`navbar-links ${menuOpen ? "show" : ""
            }`}
        >

          {/* Dashboard */}

          <NavLink
            to="/admin"
            end
            onClick={closeMenu}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Dashboard
          </NavLink>

          {/* ==========================
              BOOKS DROPDOWN
          ========================== */}

          <div className="admin-dropdown">

  <button
    className="admin-dropdown-btn"
    type="button"
    onClick={() => setBooksOpen((prev) => !prev)}
    aria-expanded={booksOpen}
  >
    Books

    <span
      className={`dropdown-arrow ${
        booksOpen ? "rotate" : ""
      }`}
    >
      ▾
    </span>
  </button>

  <div
    className={`admin-dropdown-content ${
      booksOpen ? "show" : ""
    }`}
  >

    <NavLink
      to="/admin/addbook"
      onClick={closeMenu}
      className={({ isActive }) =>
        isActive ? "nav-link active" : "nav-link"
      }
    >
      <FaPlus className="nav-icon" />
      &nbsp;Add Book
    </NavLink>

    <NavLink
      to="/admin/viewbook"
      onClick={closeMenu}
      className={({ isActive }) =>
        isActive ? "nav-link active" : "nav-link"
      }
    >
      <FaBook className="nav-icon" />
      &nbsp;View Books
    </NavLink>

  </div>

</div>

          {/* ===== PART 3 START ===== */}
          {/* ==========================
              LIBRARIAN MENU
          ========================== */}

          {role === "librarian" && (

            <>

              <NavLink
                to="/admin/issuerequest"
                onClick={closeMenu}
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Issue Request
              </NavLink>

              <NavLink
                to="/admin/returnrequest"
                onClick={closeMenu}
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Return Request
              </NavLink>

            </>

          )}

          {/* ==========================
              BOOKS BORROWED
          ========================== */}

          <NavLink
            to="/admin/issued"
            onClick={closeMenu}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Books Borrowed
          </NavLink>

          {/* ==========================
              ADMIN MENU
          ========================== */}

          {role === "admin" && (

            <NavLink
              to="/admin/addlibrarian"
              onClick={closeMenu}
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Add Librarian
            </NavLink>

          )}

          {/* ===== PART 4 START ===== */}
          {/* ==========================
              AUTH SECTION
          ========================== */}

          <div className="auth-section">

            {token ? (

              <>

                <Link
                  to="/admin"
                  className="login-btn"
                  onClick={closeMenu}
                >
                  <FaUserCircle className="nav-icon" />
                  &nbsp;Profile
                </Link>

                <button
                  type="button"
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

              <Link
                to="/login"
                className="login-btn"
                onClick={closeMenu}
              >
                Login
              </Link>

            )}

          </div>

          {/* ===== PART 5 START ===== */}
        </div>

      </div>

    </nav>

  );

}