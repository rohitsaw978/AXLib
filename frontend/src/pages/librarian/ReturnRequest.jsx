import React, { useEffect, useState } from "react";
import axios from "axios";
import { Server_URL } from "../../utils/config";
import {
  showErrorToast,
  showSuccessToast,
} from "../../utils/toasthelper";

import {
  FaUndoAlt,
  FaBook,
  FaUser,
  FaClipboardList,
  FaMoneyBillWave,
  FaCheckCircle,
} from "react-icons/fa";

import { MdDateRange } from "react-icons/md";

export default function ReturnRequest() {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    try {
      const url =
        Server_URL + "librarian/returnrequest";

      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            "authToken"
          )}`,
        },
      });

      setRequests(res.data.requests || []);
    } catch (err) {
      // console.error("Error fetching requests", err);
      setRequests([]);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const approveRequest = async (id) => {
    try {
      const url =
        Server_URL +
        "librarian/approvereturnrequest/" +
        id;

      const response = await axios.put(
        url,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "authToken"
            )}`,
          },
        }
      );

      showSuccessToast(
        response.data.message ||
        "Book Returned Successfully!"
      );

      setRequests((prev) =>
        prev.filter((req) => req._id !== id)
      );
    } catch (err) {
      // console.error(err);
      showErrorToast(
        "Failed to approve request"
      );
    }
  };

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

        <div
          className="card border-0 shadow-lg rounded-4"
          style={{
            overflow: "hidden",
            background: "rgba(15,23,42,.95)",
            border:
              "1px solid rgba(139,92,246,.22)",
            backdropFilter: "blur(15px)",
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
                  <span>
                    Return Book Requests
                  </span>
                </h2>

                <p
                  className="mb-0"
                  style={{
                    color:
                      "rgba(255,255,255,.85)",
                  }}
                >
                  Pending return requests
                  from users
                </p>

              </div>

              <div
                className="badge rounded-pill px-4 py-3"
                style={{
                  background:
                    "rgba(255,255,255,.18)",
                  color: "#fff",
                  fontSize: "15px",
                  fontWeight: "600",
                }}
              >
                Total : {requests.length}
              </div>

            </div>
          </div>

          <div className="card-body">

            {requests.length === 0 ? (

              <div
                className="text-center py-5"
                style={{
                  color: "#cbd5e1",
                }}
              >
                <FaUndoAlt
                  size={55}
                  style={{
                    color: "#8b5cf6",
                    marginBottom: "15px",
                  }}
                />

                <h5 className="text-white">
                  No Pending Requests
                </h5>

              </div>

            ) : (

              <div className="table-responsive">

                <table
                  className="table table-dark align-middle"
                  style={{
                    marginBottom: 0,
                    "--bs-table-bg":
                      "transparent",
                    "--bs-table-color":
                      "#f8fafc",
                    "--bs-table-border-color":
                      "rgba(255,255,255,.08)",
                  }}
                >

                  <thead>

                    <tr>

                      <th
                        style={{
                          background: "#1e293b",
                          padding: "18px",
                          borderBottom:
                            "2px solid #8b5cf6",
                        }}
                      >
                        User
                      </th>

                      <th
                        style={{
                          background: "#1e293b",
                          padding: "18px",
                          borderBottom:
                            "2px solid #8b5cf6",
                        }}
                      >
                        Book
                      </th>

                      <th
                        style={{
                          background: "#1e293b",
                          padding: "18px",
                          borderBottom:
                            "2px solid #8b5cf6",
                        }}
                      >
                        Issue Date
                      </th>

                      <th
                        style={{
                          background: "#1e293b",
                          padding: "18px",
                          borderBottom:
                            "2px solid #8b5cf6",
                        }}
                      >
                        Due Date
                      </th>

                      <th
                        style={{
                          background: "#1e293b",
                          padding: "18px",
                          borderBottom:
                            "2px solid #8b5cf6",
                        }}
                      >
                        Fine
                      </th>

                      <th
                        style={{
                          background: "#1e293b",
                          padding: "18px",
                          borderBottom:
                            "2px solid #8b5cf6",
                        }}
                      >
                        Status
                      </th>

                      <th
                        className="text-center"
                        style={{
                          background: "#1e293b",
                          padding: "18px",
                          borderBottom:
                            "2px solid #8b5cf6",
                        }}
                      >
                        Action
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
                        {/* User */}

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

                        {/* Book */}

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

                        {/* Issue Date */}

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

                        {/* Due Date */}

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

                        {/* Fine */}

                        <td>
                          <span
                            className="badge rounded-pill px-3 py-2"
                            style={{
                              background:
                                "rgba(239,68,68,.18)",
                              color: "#f87171",
                              border:
                                "1px solid #ef4444",
                              fontSize: "13px",
                              fontWeight: "600",
                            }}
                          >
                            <FaMoneyBillWave className="me-1" />
                            ₹ {req.fine}
                          </span>
                        </td>

                        {/* Status */}

                        <td>
                          <span
                            className="badge rounded-pill px-3 py-2"
                            style={{
                              fontSize: "13px",
                              fontWeight: "600",

                              background:
                                req.status.toLowerCase() ===
                                  "pending"
                                  ? "rgba(245,158,11,.18)"
                                  : "rgba(34,197,94,.18)",

                              color:
                                req.status.toLowerCase() ===
                                  "pending"
                                  ? "#fbbf24"
                                  : "#4ade80",

                              border:
                                req.status.toLowerCase() ===
                                  "pending"
                                  ? "1px solid #f59e0b"
                                  : "1px solid #22c55e",
                            }}
                          >
                            {req.status}
                          </span>
                        </td>

                        {/* Action */}

                        <td className="text-center">
                          <button
                            className="btn btn-success rounded-pill px-4"
                            style={{
                              fontWeight: "600",
                            }}
                            onClick={() =>
                              approveRequest(req._id)
                            }
                          >
                            <FaCheckCircle className="me-2" />
                            Approve
                          </button>
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