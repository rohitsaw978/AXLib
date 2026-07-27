import { useEffect, useState } from "react";
import axios from "axios";
import { Server_URL } from "../../utils/config";
import "./profile.css";
import { getAuthToken } from "../../utils/auth";
import Loader from "../../components/Preloader";
import {
  showErrorToast,
  showSuccessToast,
} from "../../utils/toasthelper";

import {
  FaBook,
  FaClipboardList,
  FaUndoAlt,
} from "react-icons/fa";

function ProfilePage() {
  const [user, setUser] = useState(null);

  const [issuedBooks, setIssuedBooks] = useState([]);
  const [issuedRequests, setIssuedRequests] = useState([]);
  const [returnRequests, setReturnRequests] = useState([]);

  const [loading, setLoading] = useState(true);

  // =========================
  // FETCH ISSUED BOOKS
  // =========================

  const fetchIssuedBooks = async () => {
    try {
      const url = `${Server_URL}books/issued`;

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });

      const books = response.data.issuedBooks || [];

      /*
        Important:
        Some old borrow records may reference
        books that no longer exist.

        In that case populated bookId becomes null.
        Remove those records from UI rendering.
      */

      const validBooks = books.filter(
        (book) => book && book.bookId
      );

      setIssuedBooks(
        validBooks.filter(
          (book) => book.status === "Issued"
        )
      );

      setIssuedRequests(
        validBooks.filter(
          (book) => book.status === "Requested"
        )
      );

      setReturnRequests(
        validBooks.filter(
          (book) =>
            book.status === "Requested Return"
        )
      );
    } catch (error) {
      console.error(
        "Error fetching issued books:",
        error.response?.data || error
      );
    }
  };

  // =========================
  // FETCH PROFILE
  // =========================

  const fetchProfile = async () => {
    try {
      const response = await axios.get(
        `${Server_URL}users/profile`,
        {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
          },
        }
      );

      setUser(response.data.user);
    } catch (error) {
      console.error(
        "PROFILE ERROR:",
        error.response?.data || error
      );

      showErrorToast("Unable to load profile");
    }
  };

  // =========================
  // INITIAL LOAD
  // =========================

  useEffect(() => {
    const loadProfile = async () => {
      setLoading(true);

      await Promise.all([
        fetchProfile(),
        fetchIssuedBooks(),
      ]);

      setLoading(false);
    };

    loadProfile();
  }, []);

  // =========================
  // RETURN BOOK
  // =========================

  const returnBook = async (borrowId) => {
    try {
      const response = await axios.put(
        `${Server_URL}books/returnrequest/${borrowId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
          },
        }
      );

      showSuccessToast(response.data.message);

      await fetchIssuedBooks();
    } catch (error) {
      console.error(
        "Error returning book:",
        error
      );

      showErrorToast(
        error.response?.data?.message ||
          "Something went wrong!"
      );
    }
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    return (
      <p className="loading">
        Unable to load profile.
      </p>
    );
  }

  return (
    <div className="profile-page">

      <div className="profile-container">

        {/* PROFILE INFORMATION */}

        <div className="profile-info card">

          <h1>
            {user?.name || "User"}
          </h1>

          <p>
            <strong>Email:</strong>{" "}
            {user?.email || "N/A"}
          </p>

          <p>
            <strong>Role:</strong>{" "}
            {user?.role || "User"}
          </p>

        </div>

        <div className="profile-sections">

          {/* =====================
              ISSUED BOOKS
          ====================== */}

          <div className="section-card issued-books">

            <h2>
              <FaBook className="section-icon" />
              Issued Books
            </h2>

            {issuedBooks.length === 0 ? (

              <p>No books currently issued.</p>

            ) : (

              <table>

                <thead>
                  <tr>
                    <th>Book Title</th>
                    <th>Issue Date</th>
                    <th>Due Date</th>
                    <th>Status</th>
                    <th>Fine</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>

                  {issuedBooks.map((book) => (

                    <tr key={book._id}>

                      <td>
                        {book.bookId?.title ||
                          "Book Not Available"}
                      </td>

                      <td>
                        {book.issueDate
                          ? new Date(
                              book.issueDate
                            ).toLocaleDateString()
                          : "N/A"}
                      </td>

                      <td>
                        {book.dueDate
                          ? new Date(
                              book.dueDate
                            ).toLocaleDateString()
                          : "N/A"}
                      </td>

                      <td>
                        <span className="badge issued">
                          {book.status}
                        </span>
                      </td>

                      <td>
                        ₹{book.fine ?? 0}
                      </td>

                      <td>

                        <button
                          className="return-btn"
                          onClick={() =>
                            returnBook(book._id)
                          }
                        >
                          Request Return
                        </button>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            )}

          </div>

          {/* =====================
              ISSUE REQUESTS
          ====================== */}

          <div className="section-card issued-requests">

            <h2>
              <FaClipboardList className="section-icon" />
              Issued Requests
            </h2>

            {issuedRequests.length === 0 ? (

              <p>No pending issue requests.</p>

            ) : (

              <table>

                <thead>
                  <tr>
                    <th>Book Title</th>
                    <th>Request Date</th>
                    <th>Due Date</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>

                  {issuedRequests.map((book) => (

                    <tr key={book._id}>

                      <td>
                        {book.bookId?.title ||
                          "Book Not Available"}
                      </td>

                      <td>
                        {book.issueDate
                          ? new Date(
                              book.issueDate
                            ).toLocaleDateString()
                          : "N/A"}
                      </td>

                      <td>
                        {book.dueDate
                          ? new Date(
                              book.dueDate
                            ).toLocaleDateString()
                          : "N/A"}
                      </td>

                      <td>
                        <span className="badge requested">
                          {book.status}
                        </span>
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            )}

          </div>

          {/* =====================
              RETURN REQUESTS
          ====================== */}

          <div className="section-card return-requests">

            <h2>
              <FaUndoAlt className="section-icon" />
              Return Requests
            </h2>

            {returnRequests.length === 0 ? (

              <p>No pending return requests.</p>

            ) : (

              <table>

                <thead>
                  <tr>
                    <th>Book Title</th>
                    <th>Request Date</th>
                    <th>Due Date</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>

                  {returnRequests.map((book) => (

                    <tr key={book._id}>

                      <td>
                        {book.bookId?.title ||
                          "Book Not Available"}
                      </td>

                      <td>
                        {book.issueDate
                          ? new Date(
                              book.issueDate
                            ).toLocaleDateString()
                          : "N/A"}
                      </td>

                      <td>
                        {book.dueDate
                          ? new Date(
                              book.dueDate
                            ).toLocaleDateString()
                          : "N/A"}
                      </td>

                      <td>
                        <span className="badge return-requested">
                          {book.status}
                        </span>
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            )}

          </div>

        </div>

      </div>

    </div>
  );
}

export default ProfilePage;