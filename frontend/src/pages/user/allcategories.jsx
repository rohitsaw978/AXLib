import { useState, useEffect } from "react";
import { Server_URL } from "../../utils/config";
import axios from "axios";
import "./books.css";
import { Link } from "react-router-dom";
import Loader from "../../components/Preloader";
import { FaBook } from "react-icons/fa";
import { showErrorToast } from "../../utils/toasthelper";

export default function ViewAllCategories() {
  const [books, setBooks] = useState([]);
  const [filterBooks, setFilteredBooks] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [categoryCounts, setCategoryCounts] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      const url = Server_URL + "books";
      const response = await axios.get(url);
      const { error, message, books } = response.data;

      if (error) {
        showErrorToast(message);
      } else {
        setBooks(books);
        setFilteredBooks(books);

        const categoryCountMap = {};
        books.forEach((book) => {
          const cat = book.category;
          categoryCountMap[cat] = (categoryCountMap[cat] || 0) + 1;
        });

        setCategoryCounts(categoryCountMap);
      }
    } catch {
      showErrorToast("Failed to load categories.");
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = (selectedCategory) => {
    setActiveCategory(selectedCategory);
    if (selectedCategory === "All") {
      setFilteredBooks(books);
    } else {
      const filtered = books.filter(
        (book) => book.category === selectedCategory
      );
      setFilteredBooks(filtered);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="container-fluid books-container">
      <div className="row">

        {/* Sidebar */}
        <div className="col-md-3 p-4 sidebar">
          <div className="text-center mb-4"><h2>
            <FaBook style={{ marginRight: "8px", color: "#4F46E5" }} />
            Categories
          </h2></div>

          <div className="category-scroll">
            <div
              className={`category-item ${activeCategory === "All" ? "active" : ""
                }`}
              onClick={() => handleCategoryClick("All")}
            >
              All
            </div>

            {[...new Set(books.map((book) => book.category))].map(
              (category, index) => (
                <div
                  key={index}
                  className={`category-item ${activeCategory === category ? "active" : ""
                    }`}
                  onClick={() => handleCategoryClick(category)}
                >
                  {category}
                </div>
              )
            )}
          </div>
        </div>

        {/* Main */}
        <div className="col-md-9 main-content">

          <div className="search-header p-3">
            <h2 className="page-title">
              Explore Categories
            </h2>
          </div>

          {loading ? (
            <Loader />
          ) : filterBooks.length > 0 ? (

            <div className="books-grid">

              {[...new Set(filterBooks.map(book => book.category))].map(
                (category, index) => {

                  const book = filterBooks.find(
                    b => b.category === category
                  );

                  return (

                    <div
                      key={index}
                      className="book-card"
                    >

                      <div className="card-image-container">

                        <img
                          src={book.coverImage}
                          className="card-image"
                          alt={category}
                          onError={(e) => {
                            e.target.src =
                              "https://via.placeholder.com/150x200?text=No+Cover";
                          }}
                        />

                        <div className="book-badge">
                          {category}
                        </div>

                      </div>

                      <div className="card-body">

                        <h5 className="card-title">
                          {category}
                        </h5>

                        <p className="card-author">
                          {categoryCounts[category]} Books
                        </p>

                        <div className="card-footer">

                          <Link
                            to={`/books?category=${category}`}
                            className="btn btn-primary btn-sm"
                          >
                            Explore
                          </Link>

                        </div>

                      </div>

                    </div>

                  );
                }
              )}

            </div>

          ) : (

            <div className="no-books-found">
              <i className="bi bi-book"></i>
              <h4>No Categories Found</h4>
            </div>

          )}

        </div>

      </div>
    </div>
  );
}
