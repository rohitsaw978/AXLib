import {
  FaTachometerAlt,
  FaUsers,
  FaBook,
  FaComments,
  FaClipboardList,
  FaUserTie,
  FaInfoCircle,
  FaHistory,
  FaEye,
  FaUser,
  FaDownload,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import { Server_URL } from "../../utils/config";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [selectedSection, setSelectedSection] = useState("dashboard");
  const [user, setUser] = useState([]);
  const [lib, setLib] = useState([]);
  const [books, setBooks] = useState([]);
  const [latestBooks, setLatestBooks] = useState([]);
  const [totalUser, setTotalUser] = useState(0);
  const [totalLib, setTotalLib] = useState(0);
  const [totalBooks, setTotalBooks] = useState(0);
  const [borrowedBooks, setBorrowedBooks] = useState(0);
  const [occupancyPercent, setOccupancyPercent] = useState(0);
  const [feedback, setFeedback] = useState([]);
  const [selectedUserForModal, setSelectedUserForModal] = useState(null);
  const [userHistoryLoading, setUserHistoryLoading] = useState(false);
  const [userHistoryData, setUserHistoryData] = useState(null);
  const [categoryData, setCategoryData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [
          "#3498db",
          "#f39c12",
          "#9b59b6",
          "#e74c3c",
          "#2ecc71",
        ],
      },
    ],
  });

  const token = localStorage.getItem("authToken");
  const role = localStorage.getItem("role");
  const authHeader = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const formatYear = (yr) => {
    if (!yr && yr !== 0) return null;
    const num = Number(yr);
    if (num === 1) return "1st Year";
    if (num === 2) return "2nd Year";
    if (num === 3) return "3rd Year";
    if (num === 4) return "4th Year";
    if (num > 0 && num <= 6) return `${num}th Year`;
    return null;
  };

  const downloadUsersCSV = (dataList, filenamePrefix = "Users_List") => {
    if (!dataList || dataList.length === 0) {
      alert("No user records available to download.");
      return;
    }

    const headers = [
      "S.No",
      "Full Name",
      "Email Address",
      "Role",
      "Stream / Department",
      "Academic Year",
      "Issued Books",
      "Account Type",
      "Registered Date",
    ];

    const csvRows = [headers.join(",")];

    dataList.forEach((u, index) => {
      const yearText = formatYear(u.year) || "N/A";
      const issuedCount = u.issuedBooksCount !== undefined ? u.issuedBooksCount : 0;
      const authType = u.isGoogleUser ? "Google Auth" : "Standard Account";
      const regDate = u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "N/A";

      const row = [
        index + 1,
        `"${(u.name || "").replace(/"/g, '""')}"`,
        `"${(u.email || "").replace(/"/g, '""')}"`,
        `"${(u.role || "").replace(/"/g, '""')}"`,
        `"${(u.stream || "N/A").replace(/"/g, '""')}"`,
        `"${yearText.replace(/"/g, '""')}"`,
        issuedCount,
        `"${authType}"`,
        `"${regDate}"`,
      ];
      csvRows.push(row.join(","));
    });

    const csvContent = "data:text/csv;charset=utf-8," + encodeURIComponent(csvRows.join("\n"));
    const link = document.createElement("a");
    link.setAttribute("href", csvContent);
    link.setAttribute("download", `${filenamePrefix}_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const openUserModal = async (userData) => {
    setSelectedUserForModal(userData);
    setUserHistoryLoading(true);
    try {
      const response = await axios.get(
        `${Server_URL}users/history/${userData._id}`,
        authHeader
      );
      setUserHistoryData(response.data);
    } catch {
      setUserHistoryData(null);
    } finally {
      setUserHistoryLoading(false);
    }
  };

  const getFeedback = async () => {
    try {
      const res = await axios.get(Server_URL + "contact");
      setFeedback(res.data.feedback);
    } catch {
      // ignore
    }
  };


  async function getUsers() {
    try {
      const url = Server_URL + "users";
      const result = await axios.get(url);
      const { error, message } = result.data;
      if (error) {
        alert(message);
      } else {
        const { user: userList } = result.data;
        const students = userList.filter((u) => u.role === "user");
        const librarians = userList.filter((u) => u.role === "librarian");
        setUser(students);
        setLib(librarians);
        setTotalUser(students.length);
        setTotalLib(librarians.length);
      }
    } catch {
      // ignore
    }
  }

  const deleteUser = async (id) => {
    try {
      await axios.delete(`${Server_URL}users/${id}`, authHeader);
      getUsers();
      alert("User Removed Successfully");
    } catch {
      alert("Failed to remove user");
    }
  };

  const deleteLibrarian = async (id) => {
    try {
      await axios.delete(`${Server_URL}users/${id}`, authHeader);
      getUsers();
      alert("Librarian Removed Successfully");
    } catch {
      alert("Failed to remove librarian");
    }
  };

  async function getBooks() {
    try {
      const url = Server_URL + "books";
      const result = await axios.get(url);
      const { error, message } = result.data;
      if (error) {
        alert(message);
      } else {
        const { books: bookList, totalBooks: totalB } = result.data;
        setBooks(bookList);
        setTotalBooks(totalB);

        const categoryCount = bookList.reduce((acc, book) => {
          acc[book.category] = (acc[book.category] || 0) + 1;
          return acc;
        }, {});

        const labels = Object.keys(categoryCount);
        const data = Object.values(categoryCount);
        setCategoryData({
          labels,
          datasets: [
            {
              data,
              backgroundColor: [
                "#3498db",
                "#f39c12",
                "#9b59b6",
                "#e74c3c",
                "#2ecc71",
              ],
            },
          ],
        });

        const borrowed = bookList.reduce((acc, book) => {
          const avail = Math.min(book.availableCopies, book.totalCopies);
          return acc + Math.max(0, book.totalCopies - avail);
        }, 0);
        setBorrowedBooks(borrowed);

        const total = bookList.reduce((acc, book) => acc + book.totalCopies, 0);
        const occupancy = total ? Math.max(0, Math.round((borrowed / total) * 100)) : 0;
        setOccupancyPercent(occupancy);
      }
    } catch {
      // ignore
    }
  }

  async function getLatestBooks() {
    try {
      const url = Server_URL + 'books';
      const result = await axios.get(url);
      const { error, message } = result.data;
      if (error) {
        alert(message);
      } else {
        const { books: bookList } = result.data;
        setLatestBooks(bookList);
      }
    } catch {
      // ignore
    }
  }

  const handleSectionChange = (section) => {
    setSelectedSection(section);
  };

  useEffect(() => {
    getUsers();
    getBooks();
    getLatestBooks();
    getFeedback();
  }, []);

  return (
    <div className="admin-dashboard">
      <div className="row g-0">
        <nav className="col-md-3 col-lg-2 admin-sidebar">
          {role == "admin" ? (
            <h4 className="admin-sidebar-title">
              <FaClipboardList /> Admin Panel
            </h4>
          ) : (
            <h4 className="admin-sidebar-title">
  <FaClipboardList /> Librarian Panel
</h4>
          )}
          <ul className="admin-nav">
            <li className="admin-nav-item">
              <button
                className={`admin-nav-btn ${selectedSection === "dashboard" ? "active" : ""
                  }`}
                onClick={() => handleSectionChange("dashboard")}
              >
                <FaTachometerAlt /> Dashboard
              </button>
            </li>
            <li className="admin-nav-item">
              <button
                className={`admin-nav-btn ${selectedSection === "users" ? "active" : ""
                  }`}
                onClick={() => handleSectionChange("users")}
              >
                <FaUsers /> Users
              </button>
            </li>
            {role === "admin" && (
              <li className="admin-nav-item">
                <button
                  className={`admin-nav-btn ${selectedSection === "librarians" ? "active" : ""
                    }`}
                  onClick={() => handleSectionChange("librarians")}
                >
                  <FaUserTie /> Librarians
                </button>
              </li>
            )}
            <li className="admin-nav-item">
              <button
                className={`admin-nav-btn ${selectedSection === "books" ? "active" : ""
                  }`}
                onClick={() => handleSectionChange("books")}
              >
                <FaBook /> Books
              </button>
            </li>
            <li className="admin-nav-item">
              <button
                className={`admin-nav-btn ${selectedSection === "feedback" ? "active" : ""
                  }`}
                onClick={() => handleSectionChange("feedback")}
              >
                <FaComments /> Feedback
              </button>
            </li>
          </ul>
        </nav>

        <main className="col-md-9 col-lg-10 admin-main">
          {selectedSection === "dashboard" && (
            <>
              <h2 className="admin-section-title"><FaTachometerAlt /> Dashboard Overview</h2>

              <div className="stats-grid">
                <div className="stat-card books">
                  <h3>Total Books</h3>
                  <p>{totalBooks}</p>
                </div>
                <div className="stat-card users">
                  <h3>Total Users</h3>
                  <p>{totalUser}</p>
                </div>
                {role === "admin" && (
                  <div className="stat-card librarians">
                    <h3>Total Librarians</h3>
                    <p>{totalLib}</p>
                  </div>
                )}
                <div className="stat-card borrowed">
                  <h3>Books Borrowed</h3>
                  <p>{borrowedBooks}</p>
                </div>
              </div>

              <div className="progress-grid">
                <div className="progress-card">
                  <h3>Books Issued</h3>
                  <div className="progress-container">
                    <div
                      className="progress-bar"
                      style={{ width: `${occupancyPercent}%` }}
                    >
                      {occupancyPercent}%
                    </div>
                  </div>
                </div>
              </div>

              <div className="chart-activity-grid">
                <div className="chart-card">
                  <h3>Category Distribution</h3>
                  <div style={{ height: "250px" }}>
                    <Pie
                      data={categoryData}
                      options={{
                        plugins: {
                          legend: {
                            position: "bottom",
                            labels: {
                              padding: 20,
                              usePointStyle: true,
                            },
                          },
                        },
                        maintainAspectRatio: false,
                      }}
                    />
                  </div>
                </div>

                <div className="activity-card">
                  <h3>Recent Addition</h3>
                  <div className="activity-list">
                    {latestBooks.slice(0, 4).map((book, index) => (
                      <div key={index} className="activity-item">
                        <div className="activity-icon"><FaBook /></div>
                        <div className="activity-text">
                          <strong>{book.title}</strong> added by {book.addedBy?.name}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {selectedSection === "users" && (
            <>
              <div className="d-flex align-items-center justify-content-between mb-3 flex-wrap gap-2">
                <h2 className="admin-section-title mb-0"><FaUsers /> Users Management</h2>
                <button
                  className="admin-btn"
                  style={{ background: "#10b981", color: "#fff", display: "inline-flex", alignItems: "center", gap: "8px" }}
                  onClick={() => downloadUsersCSV(user, "Students_List")}
                >
                  <FaDownload /> Download Users CSV / Excel
                </button>
              </div>
              <div className="admin-table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Stream</th>
                      <th>Issued Books</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {user.map((data, index) => (
                      <tr key={index} className="clickable-row" onClick={() => openUserModal(data)}>
                        <td>{index + 1}</td>
                        <td className="fw-semibold">{data.name}</td>
                        <td>{data.email}</td>
                        <td>{data.stream || "-"}</td>
                        <td>
                          <span className="status-badge status-issued">
                            {data.issuedBooksCount ?? 0} Issued
                          </span>
                        </td>
                        <td>
                          <button
                            className="admin-btn admin-btn-sm me-2"
                            style={{ background: "#3b82f6", color: "#fff", marginRight: "8px" }}
                            onClick={(e) => {
                              e.stopPropagation();
                              openUserModal(data);
                            }}
                          >
                            <FaEye /> Details
                          </button>
                          <button
                            className="admin-btn admin-btn-danger admin-btn-sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteUser(data._id);
                            }}
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {selectedSection === "librarians" && (
            <>
              <div className="d-flex align-items-center justify-content-between mb-3 flex-wrap gap-2">
                <h2 className="admin-section-title mb-0"><FaUserTie /> Librarians Management</h2>
                <button
                  className="admin-btn"
                  style={{ background: "#10b981", color: "#fff", display: "inline-flex", alignItems: "center", gap: "8px" }}
                  onClick={() => downloadUsersCSV(lib, "Librarians_List")}
                >
                  <FaDownload /> Download Librarians CSV / Excel
                </button>
              </div>
              <div className="admin-table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lib.map((data, index) => (
                      <tr key={index} className="clickable-row" onClick={() => openUserModal(data)}>
                        <td>{index + 1}</td>
                        <td className="fw-semibold">{data.name}</td>
                        <td>{data.email}</td>
                        <td>{data.role}</td>
                        <td>
                          <button
                            className="admin-btn admin-btn-sm me-2"
                            style={{ background: "#3b82f6", color: "#fff", marginRight: "8px" }}
                            onClick={(e) => {
                              e.stopPropagation();
                              openUserModal(data);
                            }}
                          >
                            <FaEye /> Details
                          </button>
                          <button
                            className="admin-btn admin-btn-danger admin-btn-sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteLibrarian(data._id);
                            }}
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {selectedSection === "books" && (
            <>
              <h2 className="admin-section-title"><FaBook /> Books Inventory</h2>
              <div className="admin-table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Title</th>
                      <th>Author</th>
                      <th>Category</th>
                      <th>Total Copies</th>
                      <th>Available</th>
                    </tr>
                  </thead>
                  <tbody>
                    {books.map((data, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{data.title}</td>
                        <td>{data.author}</td>
                        <td>{data.category}</td>
                        <td>{data.totalCopies}</td>
                        <td>{data.availableCopies}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
          {selectedSection === "feedback" && (
            <>
              <h2 className="admin-section-title">
                <FaComments /> Feedback Messages
              </h2>
              <div className="admin-table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Subject</th>
                      <th>Message</th>
                    </tr>
                  </thead>
                  <tbody>
                    {feedback.map((item, index) => (
                      <tr key={item._id}>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.subject}</td>
                        <td>{item.message}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </main>
      </div>

      {selectedUserForModal && (
        <div className="user-detail-modal-overlay" onClick={() => setSelectedUserForModal(null)}>
          <div className="user-detail-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="user-modal-header">
              <div className="d-flex align-items-center gap-3">
                <div className="user-avatar-circle">
                  <FaUser size={22} />
                </div>
                <div>
                  <h3 className="m-0 text-white fw-bold">{selectedUserForModal.name}</h3>
                  <span className={`status-badge mt-1 ${selectedUserForModal.role === 'admin' ? 'status-rejected' : selectedUserForModal.role === 'librarian' ? 'status-requested' : 'status-issued'}`}>
                    {selectedUserForModal.role?.toUpperCase()}
                  </span>
                </div>
              </div>
              <button className="user-modal-close-btn" onClick={() => setSelectedUserForModal(null)}>&times;</button>
            </div>

            <div className="user-modal-body">
              {/* User Registration Details */}
              <div className="user-details-card mb-4">
                <h4 className="text-purple mb-3 d-flex align-items-center gap-2">
                  <FaInfoCircle /> Registration Details
                </h4>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="text-muted small d-block">Full Name</label>
                    <span className="fw-semibold text-white">{selectedUserForModal.name}</span>
                  </div>
                  <div className="col-md-6">
                    <label className="text-muted small d-block">Email Address</label>
                    <span className="fw-semibold text-white">{selectedUserForModal.email}</span>
                  </div>
                  {selectedUserForModal.stream && (
                    <div className="col-md-6">
                      <label className="text-muted small d-block">Stream / Department</label>
                      <span className="fw-semibold text-white">{selectedUserForModal.stream}</span>
                    </div>
                  )}
                  {formatYear(selectedUserForModal.year) && (
                    <div className="col-md-6">
                      <label className="text-muted small d-block">Academic Year</label>
                      <span className="fw-semibold text-white">{formatYear(selectedUserForModal.year)}</span>
                    </div>
                  )}
                  <div className="col-md-6">
                    <label className="text-muted small d-block">Currently Issued Books</label>
                    <span className="fw-semibold text-white">
                      {selectedUserForModal.issuedBooksCount ?? 0} Books
                    </span>
                  </div>
                  <div className="col-md-6">
                    <label className="text-muted small d-block">Account Type</label>
                    <span className="fw-semibold text-white">
                      {selectedUserForModal.isGoogleUser ? "Google Auth" : "Standard Account"}
                    </span>
                  </div>
                  {selectedUserForModal.createdAt && (
                    <div className="col-md-6">
                      <label className="text-muted small d-block">Joined Date</label>
                      <span className="fw-semibold text-white">
                        {new Date(selectedUserForModal.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Book Issued & Request History */}
              <div className="user-history-card">
                <h4 className="text-purple mb-3 d-flex align-items-center gap-2">
                  <FaHistory /> Book Issued & Borrowing History
                </h4>

                {userHistoryLoading ? (
                  <div className="text-center py-4">
                    <div className="spinner-border text-primary" role="status"></div>
                    <p className="mt-2 text-muted">Loading user history...</p>
                  </div>
                ) : userHistoryData?.history && userHistoryData.history.length > 0 ? (
                  <div className="table-responsive">
                    <table className="admin-table text-left">
                      <thead>
                        <tr>
                          <th>Book Title</th>
                          <th>Category</th>
                          <th>Issue Date</th>
                          <th>Due Date</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {userHistoryData.history.map((item, idx) => (
                          <tr key={idx}>
                            <td className="fw-semibold">{item.bookId?.title || "N/A"}</td>
                            <td>{item.bookId?.category || "N/A"}</td>
                            <td>{item.issueDate ? new Date(item.issueDate).toLocaleDateString() : "-"}</td>
                            <td>{item.dueDate ? new Date(item.dueDate).toLocaleDateString() : "-"}</td>
                            <td>
                              <span className={`status-badge status-${item.status?.toLowerCase().replace(/\s+/g, '-')}`}>
                                {item.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-muted italic py-3 text-center mb-0">No borrowing history found for this user.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;