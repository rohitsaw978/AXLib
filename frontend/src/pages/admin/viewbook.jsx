import {
  FaBook,
  FaUser,
  FaTag,
  FaBarcode,
  FaRupeeSign,
  FaEdit,
  FaTrash,
  FaSave,
} from "react-icons/fa";
import { useState, useEffect } from "react";
import axios from "axios";
import { Server_URL } from "../../utils/config";
import {
  showErrorToast,
  showSuccessToast,
} from "../../utils/toasthelper";

import "./viewbook.css";

const ViewBooks = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    isbn: "",
    price: "",
    totalCopies: "",
  });

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get(
        Server_URL + "books",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "authToken"
            )}`,
          },
        }
      );

      setBooks(response.data.books || []);
    } catch {
      setBooks([]);
    }
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this book?"
      )
    )
      return;

    try {
      await axios.delete(
        `${Server_URL}books/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "authToken"
            )}`,
          },
        }
      );

      showSuccessToast("Book deleted successfully!");
      fetchBooks();
    } catch {
      showErrorToast("Failed to delete book!");
    }
  };

  const handleEdit = (book) => {
    setSelectedBook(book);

    setFormData({
      title: book.title,
      author: book.author,
      category: book.category,
      isbn: book.isbn,
      price: book.price,
      totalCopies: book.totalCopies,
    });

    setShowModal(true);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `${Server_URL}books/update/${selectedBook._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "authToken"
            )}`,
          },
        }
      );

      showSuccessToast("Book updated successfully!");
      setShowModal(false);
      fetchBooks();
    } catch {
      showErrorToast("Failed to update book!");
    }
  };

  return (
    <div className="viewbook-page">
      <div className="container py-4">

        {/* Heading */}

        <div className="mb-4">

          <h2 className="admin-book-heading d-flex justify-content-center align-items-center gap-2">
            <FaBook />
            <span>Manage Library Books</span>
          </h2>

          <p className="text-muted text-center">
            View, Edit and Delete Library Books
          </p>

        </div>

        {/* Cards */}

        <div className="row g-4">

          {Array.isArray(books) && books.length > 0 ? (

            books.map((book) => (

              <div
                key={book._id}
                className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-4"
              >

                <div className="card book-card">

                  <div className="book-image-wrapper">

                    <img
                      src={
                        book.coverImage ||
                        "https://via.placeholder.com/200"
                      }
                      className="book-image"
                      alt={book.title}
                    />

                  </div>

                  <div className="card-body">

                    <h5 className="card-title">
                      {book.title}
                    </h5>

                    <p className="book-author d-flex align-items-center gap-2">
                      <FaUser color="#8b5cf6" />
                      <span>{book.author}</span>
                    </p>

                    <p className="book-category d-flex align-items-center gap-2">
                      <FaTag color="#2563eb" />
                      <span>{book.category}</span>
                    </p>

                    <p className="book-isbn d-flex align-items-center gap-2">
                      <FaBarcode color="#6366f1" />
                      <span>ISBN : {book.isbn}</span>
                    </p>

                    <p className="book-price d-flex align-items-center gap-2">
                      <FaRupeeSign color="#16a34a" />
                      <span>{book.price}</span>
                    </p>

                  </div>

                  <div className="card-footer text-center">

                    <button
                      className="btn edit-btn me-2 d-inline-flex align-items-center gap-2"
                      onClick={() => handleEdit(book)}
                    >
                      <FaEdit />
                      Edit
                    </button>

                    <button
                      className="btn delete-btn d-inline-flex align-items-center gap-2"
                      onClick={() => handleDelete(book._id)}
                    >
                      <FaTrash />
                      Delete
                    </button>

                  </div>

                </div>

              </div>

            ))

          ) : (

            <div className="text-center py-5">

              <h5 className="text-muted">
                No Books Found
              </h5>

            </div>

          )}

        </div>

        {/* ===================== EDIT BOOK MODAL ===================== */}

        {showModal && selectedBook && (
          <div
            className="modal fade show d-block"
            tabIndex="-1"
            style={{ background: "rgba(0,0,0,.65)" }}
          >
            <div className="modal-dialog modal-dialog-centered modal-lg">

              <div className="modal-content border-0 shadow-lg rounded-4">

                <div className="modal-header bg-primary text-white">

                  <h5 className="modal-title fw-bold d-flex align-items-center gap-2">
  <FaEdit />
  <span>Edit Book</span>
</h5>

                  <button
                    type="button"
                    className="btn-close btn-close-white"
                    onClick={() => setShowModal(false)}
                  ></button>

                </div>

                <div className="modal-body p-4">

                  <form>

                    <div className="row">

                      <div className="col-md-6 mb-3">

                        <label className="form-label fw-semibold">
                          Book Title
                        </label>

                        <input
                          type="text"
                          className="form-control"
                          name="title"
                          value={formData.title}
                          onChange={handleChange}
                        />

                      </div>

                      <div className="col-md-6 mb-3">

                        <label className="form-label fw-semibold">
                          Author
                        </label>

                        <input
                          type="text"
                          className="form-control"
                          name="author"
                          value={formData.author}
                          onChange={handleChange}
                        />

                      </div>

                      <div className="col-md-6 mb-3">

                        <label className="form-label fw-semibold">
                          Category
                        </label>

                        <input
                          type="text"
                          className="form-control"
                          name="category"
                          value={formData.category}
                          onChange={handleChange}
                        />

                      </div>

                      <div className="col-md-6 mb-3">

                        <label className="form-label fw-semibold">
                          ISBN
                        </label>

                        <input
                          type="text"
                          className="form-control"
                          name="isbn"
                          value={formData.isbn}
                          onChange={handleChange}
                        />

                      </div>

                      <div className="col-md-6 mb-3">

                        <label className="form-label fw-semibold">
                          Price
                        </label>

                        <input
                          type="number"
                          className="form-control"
                          name="price"
                          value={formData.price}
                          onChange={handleChange}
                        />

                      </div>

                      <div className="col-md-6 mb-3">

                        <label className="form-label fw-semibold">
                          Total Copies
                        </label>

                        <input
                          type="number"
                          className="form-control"
                          name="totalCopies"
                          value={formData.totalCopies}
                          onChange={handleChange}
                        />

                      </div>

                    </div>

                  </form>

                </div>

                <div className="modal-footer">

                  <button
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>

                  <button
  className="btn btn-success d-inline-flex align-items-center gap-2"
  onClick={handleUpdate}
>
  <FaSave />
  Update Book
</button>

                </div>

              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ViewBooks;