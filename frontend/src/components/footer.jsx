import { Link } from "react-router-dom";
import {
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiLinkedin,
  FiMail,
  FiPhone,
  FiMapPin,
  FiClock,
} from "react-icons/fi";
import "./footer.css";

const Footer = () => {
  const handleLinkClick = () => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    setTimeout(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 0);
    setTimeout(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 100);
  };

  return (
    <footer className="library-footer">
      <div className="footer-container">

        {/* Top Gradient Line */}
        <div className="footer-top-line"></div>

        <div className="footer-main">

          {/* About */}
          <div className="footer-column">
            <h3 className="footer-heading">About Us</h3>

            <p className="footer-about-text">
              The Library serves as the academic hub of our
              institution, providing resources and services to support
              learning, teaching, and research for students and faculty.
            </p>

            <div className="footer-social">

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label="Facebook"
              >
                <FiFacebook />
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label="Twitter"
              >
                <FiTwitter />
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label="Instagram"
              >
                <FiInstagram />
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label="LinkedIn"
              >
                <FiLinkedin />
              </a>

            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-column">

            <h3 className="footer-heading">Quick Links</h3>

            <ul className="footer-links">

              <li>
                <Link
                  to="/"
                  className="footer-link"
                  onClick={handleLinkClick}
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/aboutus"
                  className="footer-link"
                  onClick={handleLinkClick}
                >
                  About
                </Link>
              </li>

              <li>
                <Link
                  to="/books"
                  className="footer-link"
                  onClick={handleLinkClick}
                >
                  Books
                </Link>
              </li>

              <li>
                <Link
                  to="/category"
                  className="footer-link"
                  onClick={handleLinkClick}
                >
                  Categories
                </Link>
              </li>

              <li>
                <Link
                  to="/contactus"
                  className="footer-link"
                  onClick={handleLinkClick}
                >
                  Contact
                </Link>
              </li>

            </ul>

          </div>

          {/* Contact */}
          <div className="footer-column">

            <h3 className="footer-heading">Contact Us</h3>

            <ul className="footer-contact-info">

              <li className="contact-item">
                <FiMapPin className="contact-icon" />
                <span>
                  Advance Experence Library,
                  Dhanbad, Jharkhand - 826001
                </span>
              </li>

              <li className="contact-item">
                <FiMail className="contact-icon" />
                <span>library@axlib.edu</span>
              </li>

              <li className="contact-item">
                <FiPhone className="contact-icon" />
                <span>0326-2305070</span>
              </li>

              <li className="contact-item">
                <FiClock className="contact-icon" />

                <div>
                  <p>Mon - Fri : 8:00 AM - 10:00 PM</p>
                  <p>Sat - Sun : 10:00 AM - 6:00 PM</p>
                </div>

              </li>

            </ul>

          </div>

        </div>

        {/* Bottom */}

        <div className="footer-bottom">

          <div className="footer-copyright">
            © {new Date().getFullYear()} AXlib Library. All Rights Reserved.
          </div>

          <div className="footer-legal">

            <Link
              to="/privacy"
              className="legal-link"
              onClick={handleLinkClick}
            >
              Privacy Policy
            </Link>

            <Link
              to="/terms"
              className="legal-link"
              onClick={handleLinkClick}
            >
              Terms of Use
            </Link>

            <Link
              to="/accessibility"
              className="legal-link"
              onClick={handleLinkClick}
            >
              Accessibility
            </Link>

          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;