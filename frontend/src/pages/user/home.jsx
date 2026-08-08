import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import "./home.css";
import { Server_URL } from "../../utils/config";


  const handleLinkClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

import {
  FiBook,
  FiClock,
  FiUser,
  FiCalendar,
  FiGrid,
} from "react-icons/fi";

import Preloader from "../../components/Preloader";
import heroBg from "../../assets/library-bg.jpg";

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);

  const [stats, setStats] = useState({
    totalCategories: 0,
    totalBooks: 0,
    totalActiveStudents: 0,
  });

  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);

      const { data } = await axios.get(`${Server_URL}home`);

      if (!data.error) {
        setStats(
          data.stats || {
            totalCategories: 0,
            totalBooks: 0,
            totalActiveStudents: 0,
          }
        );

        setCategories(data.categories || []);
        setNewArrivals(data.newArrivals || []);
      }
    } catch (error) {
      console.error("Home API Error:", error);

      setStats({
        totalCategories: 0,
        totalBooks: 0,
        totalActiveStudents: 0,
      });

      setCategories([]);
      setNewArrivals([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) return <Preloader />;

  return (
    <div className="library-homepage">
      <header
        className="hero-section"
        style={{
          backgroundImage: `linear-gradient(rgba(2,6,23,.75), rgba(2,6,23,.85)), url(${heroBg})`,
        }}
      >
        <div className="hero-content">
          <h1 className="hero-title">
            Welcome to A<span className="hero-brand">XLIB</span>
          </h1>

          <p className="hero-subtitle">
            Access textbooks, research materials, and digital learning tools in one place.
          </p>

          <div className="hero-buttons">
            <Link to="/books" className="btn btn-primary" onClick={handleLinkClick}>
              <FiBook />
              Browse Collections
            </Link>
          </div>
        </div>
      </header>

      {/* Statistics */}

      <section className="stats-section">
        <div className="container">
          <h2 className="section-title">Library Statistics</h2>

          <p className="section-subtitle">
            Discover the growth of our digital library ecosystem.
          </p>

          <div className="stats-grid">
            <div className="stat-cardhome">
              <FiGrid className="stat-icon" />
              <h3>{stats.totalCategories}+</h3>
              <p>Categories</p>
            </div>

            <div className="stat-cardhome">
              <FiBook className="stat-icon" />
              <h3>{stats.totalBooks}+</h3>
              <p>Books Available</p>
            </div>

            <div className="stat-cardhome">
              <FiUser className="stat-icon" />
              <h3>{stats.totalActiveStudents}+</h3>
              <p>Active Students</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}

      <section className="categories-section">
        <div className="container">
          <h2 className="section-title">Browse By Categories</h2>

          <p className="section-subtitle">
            Explore thousands of books across different subjects.
          </p>

          <div className="categories-grid">
            {categories.map((cat) => (
              <div
                key={cat._id || cat.category}
                className="category-card"
              >
                <div className="category-img-container">
                  <img
                    src={
                      cat?.coverImage || "/images/default-subject.jpg"
                    }
                    alt={cat?.category}
                    loading="lazy"
                  />
                </div>

                <div className="category-info">
                  <h3>{cat?.category}</h3>

                  <p>{cat?.count || 0} Books</p>

                  <Link
                    to={`/books?category=${cat?.category}`}
                    className="btn btn-outline"
                    onClick={handleLinkClick}
                  >
                    View Collection
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/category" className="btn btn-view-all"
             onClick={handleLinkClick}>
              View All Categories
            </Link>
          </div>
        </div>
      </section>

      {/* New Arrivals */}

      <section className="na-section">
        <div className="na-container">
          <h2 className="na-heading">New Arrivals</h2>

          <p className="na-subheading">
            Recently added books in our library collection.
          </p>

          <div className="na-grid-container">
            {newArrivals.map((book) => (
              <div
                key={book._id || book.title}
                className="na-book-item"
              >
                <div className="na-cover-wrapper">
                  <img
                    src={
                      book?.coverImage || "/images/default-book.jpg"
                    }
                    alt={book?.title}
                    className="na-cover-image"
                    loading="lazy"
                  />
                </div>

                <div className="na-book-info">
                  <h3 className="na-book-title">
                    {book?.title}
                  </h3>

                  <p className="na-book-author">
                    By {book?.author}
                  </p>

                  <span className="na-book-category">
                    {book?.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Library Hours */}

      <section className="hours-section">
        <div className="container">
          <h2 className="section-title">Library Hours</h2>

          <p className="section-subtitle">
            Visit the library during operating hours.
          </p>

          <div className="hours-grid">
            <div className="hours-card">
              <FiClock className="hours-icon" />

              <h3>Regular Hours</h3>

              <p>Monday - Friday</p>
              <p>8:00 AM - 8:00 PM</p>

              <p>Saturday</p>
              <p>10:00 AM - 5:00 PM</p>

              <p>Sunday Closed</p>
            </div>

            <div className="hours-card">
              <FiCalendar className="hours-icon" />

              <h3>Exam Period</h3>

              <p>Monday - Sunday</p>
              <p>7:00 AM - 11:00 PM</p>

              <p>Extended access for students during exams.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}