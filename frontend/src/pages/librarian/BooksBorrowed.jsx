import { useEffect, useState } from "react";
import axios from "axios";
import { Server_URL } from "../../utils/config";

import {
  FaBook,
  FaUser,
  FaClipboardList,
} from "react-icons/fa";

import { MdDateRange } from "react-icons/md";

export default function BooksBorrowed() {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    try {
      const url = Server_URL + "librarian/bookissued";

      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      const allRequests = res.data.requests || [];

    const validRequests = allRequests.filter(
      (item) => item.userId && item.bookId
    );

    setRequests(validRequests);

    } catch {
      setRequests([]);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px 0",
        background: `
          radial-gradient(circle at top left, rgba(124,58,237,.22), transparent 35%),
          radial-gradient(circle at bottom right, rgba(37,99,235,.18), transparent 40%),
          #020617
        `,
      }}
    >
      <div className="container">

        {/* Main Card */}

        <div
          className="card border-0 shadow-lg rounded-4"
          style={{
            overflow: "hidden",
            background: "rgba(15,23,42,.95)",
            border: "1px solid rgba(139,92,246,.22)",
            backdropFilter: "blur(15px)",
            WebkitBackdropFilter: "blur(15px)",
          }}
        >

          {/* Header */}

          <div
            className="card-header border-0 py-4"
            style={{
              background:
                "linear-gradient(90deg,#9333ea,#2563eb)",
            }}
          >
            <div className="d-flex justify-content-between align-items-center flex-wrap">

              <div>

                <h2 className="fw-bold text-white mb-1 d-flex align-items-center gap-3">
                  <FaClipboardList size={28} />
                  <span>Books Issued</span>
                </h2>

                <p
                  className="mb-0"
                  style={{
                    color: "rgba(255,255,255,.85)",
                    fontSize: "15px",
                  }}
                >
                  List of all issued books
                </p>

              </div>

              <div
                className="badge rounded-pill px-4 py-3"
                style={{
                  background: "rgba(255,255,255,.18)",
                  color: "#fff",
                  fontSize: "15px",
                  fontWeight: "600",
                }}
              >
                Total : {requests.length}
              </div>

            </div>
          </div>

          {/* Body */}

          <div className="card-body">

            {requests.length === 0 ? (

              <div
                className="text-center py-5"
                style={{
                  color: "#cbd5e1",
                }}
              >
                <FaBook
                  size={55}
                  style={{
                    color: "#8b5cf6",
                    marginBottom: "15px",
                  }}
                />

                <h5 className="text-white">
                  No Books Issued Yet
                </h5>

              </div>

            ) : (

              <div className="table-responsive">

                <table
                  className="table table-dark align-middle"
                  style={{
                    marginBottom: 0,
                    "--bs-table-bg": "transparent",
                    "--bs-table-color": "#f8fafc",
                    "--bs-table-border-color":
                      "rgba(255,255,255,.08)",
                  }}
                >

                  <thead>
                    <tr>

                      <th
                        className="text-white"
                        style={{
                          background: "#1e293b",
                          padding: "18px",
                          borderBottom: "2px solid #8b5cf6",
                          fontWeight: "700",
                        }}
                      >
                        User
                      </th>

                      <th
                        className="text-white"
                        style={{
                          background: "#1e293b",
                          padding: "18px",
                          borderBottom: "2px solid #8b5cf6",
                          fontWeight: "700",
                        }}
                      >
                        Book
                      </th>

                      <th
                        className="text-white"
                        style={{
                          background: "#1e293b",
                          padding: "18px",
                          borderBottom: "2px solid #8b5cf6",
                          fontWeight: "700",
                        }}
                      >
                        Issue Date
                      </th>

                      <th
                        className="text-white"
                        style={{
                          background: "#1e293b",
                          padding: "18px",
                          borderBottom: "2px solid #8b5cf6",
                          fontWeight: "700",
                        }}
                      >
                        Due Date
                      </th>

                      <th
                        className="text-center text-white"
                        style={{
                          background: "#1e293b",
                          padding: "18px",
                          borderBottom: "2px solid #8b5cf6",
                          fontWeight: "700",
                        }}
                      >
                        Status
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {requests.map((req) => (

                      <tr
                        key={req._id}
                        style={{
                          cursor: "pointer",
                          transition: ".3s",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background =
                            "rgba(255,255,255,.05)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background =
                            "transparent";
                        }}
                      >

                        {/* USER */}

                        <td>

                          <div
                            className="d-flex align-items-center gap-2 fw-semibold"
                            style={{
                              color: "#f8fafc",
                            }}
                          >
                            <FaUser
                              style={{
                                color: "#8b5cf6",
                              }}
                            />

                            <span>
                              {req.userId?.name || "N/A"}
                            </span>

                          </div>

                        </td>

                        {/* BOOK */}

                        <td>

                          <div
                            className="d-flex align-items-center gap-2 fw-semibold"
                            style={{
                              color: "#60a5fa",
                            }}
                          >
                            <FaBook />

                            <span>
                              {req.bookId?.title || "N/A"}
                            </span>

                          </div>

                        </td>

                        {/* ISSUE DATE */}

                        <td>

                          <div
                            className="d-flex align-items-center gap-2"
                            style={{
                              color: "#e2e8f0",
                            }}
                          >
                            <MdDateRange
                              style={{
                                color: "#8b5cf6",
                              }}
                            />

                            <span>
                              {new Date(
                                req.issueDate
                              ).toLocaleDateString()}
                            </span>

                          </div>

                        </td>

                        {/* DUE DATE */}

                        <td>

                          <div
                            className="d-flex align-items-center gap-2"
                            style={{
                              color: "#e2e8f0",
                            }}
                          >
                            <MdDateRange
                              style={{
                                color: "#ef4444",
                              }}
                            />

                            <span>
                              {new Date(
                                req.dueDate
                              ).toLocaleDateString()}
                            </span>

                          </div>

                        </td>

                        {/* STATUS */}

                        <td className="text-center">

                          <span
                            className="badge rounded-pill px-3 py-2"
                            style={{
                              fontSize: "13px",
                              fontWeight: "600",
                              minWidth: "100px",

                              background:
                                req.status.toLowerCase() === "issued"
                                  ? "rgba(34,197,94,.18)"
                                  : req.status.toLowerCase() === "pending"
                                    ? "rgba(245,158,11,.18)"
                                    : "rgba(148,163,184,.18)",

                              color:
                                req.status.toLowerCase() === "issued"
                                  ? "#4ade80"
                                  : req.status.toLowerCase() === "pending"
                                    ? "#fbbf24"
                                    : "#cbd5e1",

                              border:
                                req.status.toLowerCase() === "issued"
                                  ? "1px solid #22c55e"
                                  : req.status.toLowerCase() === "pending"
                                    ? "1px solid #f59e0b"
                                    : "1px solid #94a3b8",
                            }}
                          >
                            {req.status}
                          </span>

                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            )}

          </div>
        </div>

      </div>

    </div>

  );

}