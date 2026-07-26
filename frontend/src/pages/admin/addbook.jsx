import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { FaBookMedical } from "react-icons/fa";
import { FaPlusCircle } from "react-icons/fa";
import { Server_URL } from "../../utils/config";
import {
  showErrorToast,
  showSuccessToast,
} from "../../utils/toasthelper";

const AddBookForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      Object.keys(data).forEach((key) => {
        if (key !== "coverImage") {
          formData.append(key, data[key]);
        }
      });

      if (data.coverImage && data.coverImage[0]) {
        formData.append("coverImage", data.coverImage[0]);
      }

      const authToken = localStorage.getItem("authToken");

      const response = await axios.post(
        Server_URL + "books/add",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      const { error, message } = response.data;

      if (error) {
        showErrorToast(message);
      } else {
        showSuccessToast(message);
        reset();
      }
    } catch (error) {
      // console.log(error);
      showErrorToast("Failed to Add Book!");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "60px 0",
        background: `
          radial-gradient(circle at top left, rgba(124,58,237,.22), transparent 35%),
          radial-gradient(circle at bottom right, rgba(37,99,235,.18), transparent 40%),
          #020617
        `,
      }}
    >
      <style>{`
        .premium-input,
        .premium-select,
        .premium-textarea{
          background:rgba(255,255,255,.06)!important;
          border:1px solid rgba(255,255,255,.12)!important;
          color:#fff!important;
          border-radius:16px!important;
          transition:.3s;
        }

        .premium-input{
          height:58px;
        }

        .premium-select{
          height:58px;
        }

        .premium-textarea{
          padding:15px;
        }

        .premium-input::placeholder,
        .premium-textarea::placeholder{
          color:rgba(255,255,255,.65)!important;
          opacity:1;
        }

        .premium-input:focus,
        .premium-select:focus,
        .premium-textarea:focus{
          background:rgba(255,255,255,.08)!important;
          color:#fff!important;
          border-color:#9333ea!important;
          box-shadow:0 0 18px rgba(147,51,234,.35)!important;
        }

        .premium-select option{
          background:#0f172a;
          color:#fff;
        }

        .premium-file{
          background:rgba(255,255,255,.06)!important;
          border:1px solid rgba(255,255,255,.12)!important;
          color:#fff!important;
          border-radius:16px!important;
        }

        .premium-file::file-selector-button{
          border:none;
          padding:10px 18px;
          border-radius:10px;
          margin-right:15px;
          color:#fff;
          background:linear-gradient(90deg,#9333ea,#2563eb);
        }
      `}</style>

      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div
              className="border-0 overflow-hidden"
              style={{
                background: "rgba(255,255,255,.05)",
                borderRadius: "28px",
                border: "1px solid rgba(139,92,246,.25)",
                backdropFilter: "blur(20px)",
                boxShadow: "0 20px 45px rgba(139,92,246,.18)",
              }}
            >
              {/* Header */}

              <div
  className="text-center py-4"
  style={{
    background: "linear-gradient(90deg,#9333ea,#2563eb)",
  }}
>
  <h2
    className="text-white fw-bold d-flex justify-content-center align-items-center gap-2 mb-1"
    style={{ lineHeight: 1.2 }}
  >
    <FaBookMedical size={34} />
    <span>Add New Book</span>
  </h2>

  
</div>

              {/* Body */}

              <div className="p-5">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="row">
                    {/* Book Title */}

                    <div className="col-md-6 mb-4">
                      <label
                        className="fw-semibold mb-2 text-white d-flex align-items-center gap-2"
                      >
                        <i className="bi bi-book-fill text-info"></i>
                        Book Title
                      </label>

                      <input
                        type="text"
                        placeholder="Enter Book Title"
                        className="form-control premium-input"
                        {...register("title", {
                          required: "Title is required",
                        })}
                      />

                      {errors.title && (
                        <small className="text-danger">
                          {errors.title.message}
                        </small>
                      )}
                    </div>

                    {/* Author */}

                    <div className="col-md-6 mb-4">
                      <label
                        className="fw-semibold mb-2 text-white d-flex align-items-center gap-2"
                      >
                        <i className="bi bi-person-fill text-warning"></i>
                        Author
                      </label>

                      <input
                        type="text"
                        placeholder="Enter Author Name"
                        className="form-control premium-input"
                        {...register("author", {
                          required: "Author is required",
                        })}
                      />

                      {errors.author && (
                        <small className="text-danger">
                          {errors.author.message}
                        </small>
                      )}
                    </div>

                    {/* Category */}

                    <div className="col-md-6 mb-4">
                      <label
                        className="fw-semibold mb-2 text-white d-flex align-items-center gap-2"
                      >
                        <i className="bi bi-grid-fill text-success"></i>
                        Category
                      </label>

                      <select
                        className="form-select premium-select"
                        {...register("category", {
                          required: "Category is required",
                        })}
                      >
                        <option value="">Select Category</option>
                        <option value="Computer Science">Computer Science</option>
                        <option value="Management">Management</option>
                        <option value="Commerce">Commerce</option>
                        <option value="Arts & Humanities">Arts & Humanities</option>
                        <option value="Science">Science</option>
                        <option value="Mathematics">Mathematics</option>
                        <option value="Language & Literature">Language & Literature</option>
                        <option value="General Knowledge">General Knowledge</option>
                        <option value="Research & Journals">Research & Journals</option>
                        <option value="Novels & Fiction">Novels & Fiction</option>
                        <option value="Others">Others</option>
                      </select>

                      {errors.category && (
                        <small className="text-danger">
                          {errors.category.message}
                        </small>
                      )}
                    </div>

                    {/* ISBN */}

                    <div className="col-md-6 mb-4">
                      <label
                        className="fw-semibold mb-2 text-white d-flex align-items-center gap-2"
                      >
                        <i className="bi bi-upc-scan text-primary"></i>
                        ISBN
                      </label>

                      <input
                        type="text"
                        placeholder="Enter ISBN"
                        className="form-control premium-input"
                        {...register("isbn", {
                          required: "ISBN is required",
                        })}
                      />

                      {errors.isbn && (
                        <small className="text-danger">
                          {errors.isbn.message}
                        </small>
                      )}
                    </div>
                    {/* Book Cover Image */}

                    <div className="col-12 mb-4">
                      <label
                        className="fw-semibold mb-2 text-white d-flex align-items-center gap-2"
                      >
                        <i className="bi bi-image-fill text-info"></i>
                        Book Cover Image
                      </label>

                      <input
                        type="file"
                        className="form-control premium-file"
                        {...register("coverImage")}
                      />
                    </div>

                    {/* Total Copies */}

                    <div className="col-md-6 mb-4">
                      <label
                        className="fw-semibold mb-2 text-white d-flex align-items-center gap-2"
                      >
                        <i className="bi bi-stack text-success"></i>
                        Total Copies
                      </label>

                      <input
                        type="number"
                        placeholder="Enter Total Copies"
                        className="form-control premium-input"
                        {...register("totalCopies", {
                          required: true,
                          min: 1,
                        })}
                      />
                    </div>

                    {/* Price */}

                    <div className="col-md-6 mb-4">
                      <label
                        className="fw-semibold mb-2 text-white d-flex align-items-center gap-2"
                      >
                        <i className="bi bi-currency-rupee text-warning"></i>
                        Price
                      </label>

                      <input
                        type="number"
                        step="0.01"
                        placeholder="Enter Book Price"
                        className="form-control premium-input"
                        {...register("price", {
                          required: true,
                        })}
                      />
                    </div>

                    {/* Description */}

                    <div className="col-12 mb-4">
                      <label
                        className="fw-semibold mb-2 text-white d-flex align-items-center gap-2"
                      >
                        <i className="bi bi-card-text text-primary"></i>
                        Description
                      </label>

                      <textarea
                        rows="5"
                        placeholder="Enter Book Description"
                        className="form-control premium-textarea"
                        {...register("description", {
                          required: "Description is required",
                        })}
                      ></textarea>

                      {errors.description && (
                        <small className="text-danger">
                          {errors.description.message}
                        </small>
                      )}
                    </div>
                    {/* Submit Button */}

                    <div className="col-12 mt-3">
                      <button
                        type="submit"
                        className="btn w-100 fw-bold text-white d-flex justify-content-center align-items-center gap-2"
                        style={{
                          height: "60px",
                          border: "none",
                          borderRadius: "18px",
                          fontSize: "18px",
                          background: "linear-gradient(90deg,#9333ea,#2563eb)",
                          boxShadow: "0 10px 25px rgba(139,92,246,.35)",
                          transition: ".3s",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "translateY(-3px)";
                          e.currentTarget.style.boxShadow =
                            "0 18px 35px rgba(139,92,246,.45)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "translateY(0)";
                          e.currentTarget.style.boxShadow =
                            "0 10px 25px rgba(139,92,246,.35)";
                        }}
                      >
                        <i className="bi bi-plus-circle-fill fs-5"></i>
                        {/* <button
                          type="submit"
                          className="btn w-100 text-white fw-bold d-flex align-items-center justify-content-center gap-2"
                        > */}
                          <FaPlusCircle size={18} color="#ffffff" />
                          <span>Add Book</span>
                        {/* </button> */}
                      </button>
                    </div>

                  </div>
                </form>
              </div>

            </div>
          </div>
        </div>
      </div>

    </div>
  );

};

export default AddBookForm;