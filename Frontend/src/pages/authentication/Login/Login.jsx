import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Login.css";

import { loginUser } from "../../../services/authService";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
      general: "",
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const data = await loginUser(
        formData.email,
        formData.password
      );

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      const destination =
        location.state?.from?.pathname ||
        `/${data.user.role}/dashboard`;

      navigate(destination, { replace: true });
    } catch (error) {
      setErrors({
        general: error.message,
      });
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">

        <div className="auth-brand">
          <div className="auth-logo">
            <span>+</span>
          </div>

          <h1>
            Medi<span>Find</span>
          </h1>

          <p>
            Find the medicine you need,
            <br />
            when you need it.
          </p>
        </div>

        <div className="auth-card">

          <div className="auth-header">
            <h2>Welcome Back</h2>
            <p>Sign in to continue to MediFind</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">

            <div className="form-group">
              <label htmlFor="email">
                Email Address
              </label>

              <input
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? "input-error" : ""}
              />

              {errors.email && (
                <span className="error-message">
                  {errors.email}
                </span>
              )}
            </div>

            <div className="form-group">

              <div className="password-label-row">
                <label htmlFor="password">
                  Password
                </label>

                <button
                  type="button"
                  className="forgot-password"
                  onClick={() =>
                    alert("Forgot password will be added later.")
                  }
                >
                  Forgot Password?
                </button>
              </div>

              <div className="password-input-wrapper">

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  className={
                    errors.password ? "input-error" : ""
                  }
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>

              </div>

              {errors.password && (
                <span className="error-message">
                  {errors.password}
                </span>
              )}
            </div>

            {errors.general && (
              <span className="error-message">
                {errors.general}
              </span>
            )}

            <button
              type="submit"
              className="auth-submit"
            >
              Sign In
            </button>

          </form>

          <div className="auth-divider">
            <span>or</span>
          </div>

          <p className="auth-switch">
            Don't have an account?{" "}
            <Link to="/register">
              Create an account
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Login;