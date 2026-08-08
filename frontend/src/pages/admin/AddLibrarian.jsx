import {
  FaUserTie,
  FaUserPlus,
} from "react-icons/fa";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Server_URL } from "../../utils/config";
import {
  showErrorToast,
  showSuccessToast,
} from "../../utils/toasthelper";

export default function AddLibrarian() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const formData = {
        ...data,
        role: "librarian",
      };

      const url =
        Server_URL + "admin/addlibrarian";

      const authToken =
        localStorage.getItem("authToken");

      const response = await axios.post(
        url,
        formData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.data.error) {
        showErrorToast(response.data.message || "Registration Failed!");
      } else {
        showSuccessToast(response.data.message || "Librarian Added Successfully!");
        reset();
      }
    } catch (error) {
      showErrorToast(
        error.response?.data?.message || "Registration Failed!"
      );
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "50px 0",
        background: `
        radial-gradient(circle at top left, rgba(124,58,237,.22), transparent 35%),
        radial-gradient(circle at bottom right, rgba(37,99,235,.18), transparent 40%),
        #020617
        `,
      }}
    >
      <style>{`

      .librarian-card{
    background: rgba(139, 92, 246, 0.12);
    backdrop-filter: blur(22px);
    -webkit-backdrop-filter: blur(22px);

    border: 1px solid rgba(255,255,255,.18);

    border-radius: 24px;

    overflow: hidden;

    box-shadow:
        0 8px 32px rgba(31,38,135,.35),
        0 0 30px rgba(139,92,246,.25);

    color: #fff;
}

      .premium-input{
    height:58px;

    background: rgba(255,255,255,.08);

    border:1px solid rgba(255,255,255,.15);

    color:#fff;

    border-radius:14px;

    transition:.3s;
}

.premium-input::placeholder{
    color:rgba(255,255,255,.55);
}

.premium-input:focus{
    background:rgba(255,255,255,.12);
    border-color:#a855f7;
    box-shadow:0 0 20px rgba(168,85,247,.35);
    color:#fff;
}

      `}</style>

      <div className="container">

        <div className="row justify-content-center">

          <div className="col-lg-8 col-xl-6">

            <div className="librarian-card">

              <div
                className="text-center py-4"
                style={{
                  background:
                    "linear-gradient(90deg,#9333ea,#2563eb)"
                }}
              >

                <h2 className="text-white fw-bold d-flex align-items-center justify-content-center gap-2">
                  <FaUserTie size={28} />
                  Add Librarian
                </h2>

              </div>

              <div className="card-body p-5">

                <form
                  onSubmit={handleSubmit(onSubmit)}
                >

                  {/* Name */}

                  <div className="mb-4">

                    <label
                      className="form-label fw-semibold mb-2"
                      style={{ color: "#E2E8F0" }}
                    >
                      Full Name
                    </label>

                    <input
                      type="text"
                      className="form-control premium-input"
                      placeholder="Enter Full Name"
                      {...register("name", {
                        required: "Name is required",
                      })}
                    />

                    {errors.name && (
                      <small className="text-danger">
                        {errors.name.message}
                      </small>
                    )}

                  </div>

                  {/* Email */}

                  <div className="mb-4">

                    <label
                      className="form-label fw-semibold mb-2"
                      style={{ color: "#E2E8F0" }}
                    >
                      Email Address
                    </label>

                    <input
                      type="email"
                      className="form-control premium-input"
                      placeholder="Enter Email Address"
                      {...register("email", {
                        required: "Email is required",
                      })}
                    />

                    {errors.email && (
                      <small className="text-danger">
                        {errors.email.message}
                      </small>
                    )}

                  </div>

                  {/* Password */}

                  <div className="mb-4">

                    <label
                      className="form-label fw-semibold mb-2"
                      style={{ color: "#E2E8F0" }}
                    >
                      Password
                    </label>

                    <input
                      type="password"
                      className="form-control premium-input"
                      placeholder="Enter Password"
                      {...register("password", {
                        required: "Password is required",
                      })}
                    />

                    {errors.password && (
                      <small className="text-danger">
                        {errors.password.message}
                      </small>
                    )}

                  </div>

                  {/* Submit Button */}

                  <button
                    type="submit"
                    className="btn w-100 text-white fw-bold d-flex align-items-center justify-content-center gap-2"
                    style={{
                      height: "58px",
                      border: "none",
                      borderRadius: "14px",
                      background: "linear-gradient(90deg,#9333ea,#2563eb)",
                      boxShadow: "0 10px 25px rgba(139,92,246,.35)",
                      transition: "all .3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-3px)";
                      e.currentTarget.style.boxShadow =
                        "0 16px 30px rgba(139,92,246,.45)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow =
                        "0 10px 25px rgba(139,92,246,.35)";
                    }}
                  >
                    <FaUserPlus size={18} />
                    Add Librarian
                  </button>

                </form>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}