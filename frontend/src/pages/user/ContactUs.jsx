import { useForm } from "react-hook-form";
import axios from "axios";
import { FiMail, FiPhone, FiMapPin, FiClock, FiSend } from "react-icons/fi";
import "./contact.css";
import { Server_URL } from "../../utils/config";
import { showErrorToast, showSuccessToast } from "../../utils/toasthelper";
import { MdSupportAgent } from "react-icons/md";
import { FiZap } from "react-icons/fi";
import { FiLock } from "react-icons/fi";

const ContactUs = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const url = Server_URL + "users/contact";
      await axios.post(url, data);
      showSuccessToast(
        "Your message has been sent! We will get back to you soon."
      );
      reset();
    } catch {
      showErrorToast(
        "There was a problem sending your message. Please try again later."
      );
    }
  };

  return (
    <div className="contact-page">

      {/* Hero Section */}

      <section className="contact-hero">
        <div className="hero-glow"></div>

        <div className="contact-container">

          <div className="hero-content">

            <h1>
              Contact A<span>XLIB</span>
            </h1>

            <p>
              We&apos;re here to help you with library services,
              memberships, resources and support.
            </p>

          </div>

        </div>
      </section>

      {/* Contact Cards */}

      <section className="contact-info-section">

        <div className="contact-container">

          <div className="contact-info-grid">

            <div className="contact-info-card">
              <FiMapPin
                className="contact-icon"
                size={28}
              />

              <h3>Visit Us</h3>

              <p>
                Advance Experience Library,
                <br />
                Dhanbad, Jharkhand - 826001
              </p>
            </div>

            <div className="contact-info-card">
              <FiMail
                className="contact-icon"
                size={28}
              />

              <h3>Email Us</h3>

              <p>
                support@axlib.edu
              </p>
            </div>

            <div className="contact-info-card">
              <FiPhone
                className="contact-icon"
                size={28}
              />

              <h3>Call Us</h3>

              <p>
                (0326)-2305070
                <br />
                Mon-Fri, 8AM - 5PM
              </p>
            </div>

            <div className="contact-info-card">
              <FiClock
                className="contact-icon"
                size={28}
              />

              <h3>Working Hours</h3>

              <p>
                Mon-Fri: 8AM - 10PM
                <br />
                Sat-Sun: 10AM - 6PM
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* Contact Form */}

      <section className="contact-form-section">

        <div className="contact-container">

          <div className="contact-form-wrapper">

            <div className="contact-form-text">

              <h2>
                Send Us A Message
              </h2>

              <p>
                Have questions about books,
                memberships or library services?
                Fill out the form and our team
                will get back to you shortly.
              </p>

              <div className="contact-highlight">

                <div className="highlight-box">
                  <MdSupportAgent className="highlight-icon" />
                  &nbsp;&nbsp;Smart Library Support
                </div>

                <div className="highlight-box">
                  <FiZap className="highlight-icon" />
                  &nbsp;&nbsp;Fast Response
                </div>

                <div className="highlight-box">
                  <FiLock className="highlight-icon" />
                  &nbsp;&nbsp;Secure Communication
                </div>

              </div>

            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="contact-form"
            >

              <div className="form-group">
                <label>Full Name</label>

                <input
                  {...register("name", {
                    required: true,
                  })}
                  type="text"
                  placeholder="Enter your full name"
                />

                {errors.name && (
                  <span className="error">
                    Name is required
                  </span>
                )}
              </div>

              <div className="form-group">
                <label>Email Address</label>

                <input
                  {...register("email", {
                    required: true,
                    pattern:
                      /^\S+@\S+\.\S+$/,
                  })}
                  type="email"
                  placeholder="Enter your email"
                />

                {errors.email && (
                  <span className="error">
                    Valid email required
                  </span>
                )}
              </div>

              <div className="form-group">
                <label>Subject</label>

                <select
                  {...register("subject", {
                    required: true,
                  })}
                >
                  <option value="">
                    Select Subject
                  </option>

                  <option value="general">
                    General Inquiry
                  </option>

                  <option value="resources">
                    Resource Questions
                  </option>

                  <option value="membership">
                    Membership
                  </option>

                  <option value="events">
                    Events
                  </option>

                  <option value="feedback">
                    Feedback
                  </option>
                </select>

                {errors.subject && (
                  <span className="error">
                    Subject is required
                  </span>
                )}
              </div>

              <div className="form-group">
                <label>Message</label>

                <textarea
                  {...register("message", {
                    required: true,
                  })}
                  rows="6"
                  placeholder="Write your message..."
                />

                {errors.message && (
                  <span className="error">
                    Message is required
                  </span>
                )}
              </div>

              <button
                type="submit"
                className="contact-submit-btn"
              >
                <FiSend className="btn-icon" />
                Send Message
              </button>

            </form>

          </div>

        </div>

      </section>

    </div>
  );
};

export default ContactUs;
