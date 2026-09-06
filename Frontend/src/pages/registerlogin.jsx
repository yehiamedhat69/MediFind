import { useState } from "react";

const API_URL = "http://localhost:5000/api";

function App() {
  const [page, setPage] = useState(
    localStorage.getItem("token") ? "dashboard" : "login"
  );

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user") || "null")
  );

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const [registerForm, setRegisterForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  async function apiRequest(endpoint, method, body = null) {
    const token = localStorage.getItem("token");

    const headers = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong");
    }

    return data;
  }

  function validateLogin() {
    const newErrors = {};

    if (!loginForm.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(loginForm.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!loginForm.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  function validateRegister() {
    const newErrors = {};

    if (!registerForm.username.trim()) {
      newErrors.username = "Username is required";
    } else if (registerForm.username.length < 3) {
      newErrors.username =
        "Username must be at least 3 characters";
    }

    if (!registerForm.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(registerForm.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!registerForm.password) {
      newErrors.password = "Password is required";
    } else if (registerForm.password.length < 6) {
      newErrors.password =
        "Password must be at least 6 characters";
    }

    if (!registerForm.confirmPassword) {
      newErrors.confirmPassword =
        "Please confirm your password";
    } else if (
      registerForm.password !== registerForm.confirmPassword
    ) {
      newErrors.confirmPassword =
        "Passwords do not match";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  async function handleLogin(e) {
    e.preventDefault();

    setErrors({});
    setServerError("");

    if (!validateLogin()) {
      return;
    }

    try {
      setLoading(true);

      const data = await apiRequest(
        "/auth/login",
        "POST",
        {
          email: loginForm.email,
          password: loginForm.password,
        }
      );

      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      setUser(data.user);

      setLoginForm({
        email: "",
        password: "",
      });

      setPage("dashboard");
    } catch (error) {
      setServerError(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleRegister(e) {
    e.preventDefault();

    setErrors({});
    setServerError("");

    if (!validateRegister()) {
      return;
    }

    try {
      setLoading(true);

      await apiRequest(
        "/auth/register",
        "POST",
        {
          username: registerForm.username,
          email: registerForm.email,
          password: registerForm.password,
        }
      );

      setRegisterForm({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      setPage("login");
    } catch (error) {
      setServerError(error.message);
    } finally {
      setLoading(false);
    }
  }

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
    setPage("login");
  }

  function LoginPage() {
    return (
      <div className="page">
        <div className="card">

          <h1 className="logo">MediFind</h1>

          <h2>Login</h2>

          <p className="subtitle">
            Login to your MediFind account
          </p>

          {serverError && (
            <div className="error-box">
              {serverError}
            </div>
          )}

          <form onSubmit={handleLogin}>

            <label>Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={loginForm.email}
              onChange={(e) =>
                setLoginForm({
                  ...loginForm,
                  email: e.target.value,
                })
              }
            />

            {errors.email && (
              <p className="error">
                {errors.email}
              </p>
            )}

            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              value={loginForm.password}
              onChange={(e) =>
                setLoginForm({
                  ...loginForm,
                  password: e.target.value,
                })
              }
            />

            {errors.password && (
              <p className="error">
                {errors.password}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

          </form>

          <p className="switch">
            Don't have an account?

            <button
              className="link"
              onClick={() => {
                setErrors({});
                setServerError("");
                setPage("register");
              }}
            >
              Register
            </button>
          </p>

        </div>
      </div>
    );
  }

  function RegisterPage() {
    return (
      <div className="page">
        <div className="card">

          <h1 className="logo">MediFind</h1>

          <h2>Create Account</h2>

          <p className="subtitle">
            Create your MediFind account
          </p>

          {serverError && (
            <div className="error-box">
              {serverError}
            </div>
          )}

          <form onSubmit={handleRegister}>

            <label>Username</label>

            <input
              type="text"
              placeholder="Enter your username"
              value={registerForm.username}
              onChange={(e) =>
                setRegisterForm({
                  ...registerForm,
                  username: e.target.value,
                })
              }
            />

            {errors.username && (
              <p className="error">
                {errors.username}
              </p>
            )}

            <label>Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={registerForm.email}
              onChange={(e) =>
                setRegisterForm({
                  ...registerForm,
                  email: e.target.value,
                })
              }
            />

            {errors.email && (
              <p className="error">
                {errors.email}
              </p>
            )}

            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              value={registerForm.password}
              onChange={(e) =>
                setRegisterForm({
                  ...registerForm,
                  password: e.target.value,
                })
              }
            />

            {errors.password && (
              <p className="error">
                {errors.password}
              </p>
            )}

            <label>Confirm Password</label>

            <input
              type="password"
              placeholder="Confirm your password"
              value={registerForm.confirmPassword}
              onChange={(e) =>
                setRegisterForm({
                  ...registerForm,
                  confirmPassword: e.target.value,
                })
              }
            />

            {errors.confirmPassword && (
              <p className="error">
                {errors.confirmPassword}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Creating account..."
                : "Register"}
            </button>

          </form>

          <p className="switch">
            Already have an account?

            <button
              className="link"
              onClick={() => {
                setErrors({});
                setServerError("");
                setPage("login");
              }}
            >
              Login
            </button>
          </p>

        </div>
      </div>
    );
  }

  function Dashboard() {
    return (
      <div className="dashboard">

        <nav className="navbar">

          <h1>MediFind</h1>

          <button
            className="logout"
            onClick={handleLogout}
          >
            Logout
          </button>

        </nav>

        <main className="dashboard-content">

          <h2>
            Welcome to MediFind
          </h2>

          {user && (
            <div className="user-box">

              <p>
                <strong>Username:</strong>{" "}
                {user.username}
              </p>

              <p>
                <strong>Email:</strong>{" "}
                {user.email}
              </p>

              <p>
                <strong>Role:</strong>{" "}
                {user.role}
              </p>

            </div>
          )}

        </main>

      </div>
    );
  }

  if (page === "dashboard") {
    return (
      <>
        <style>{styles}</style>
        <Dashboard />
      </>
    );
  }

  return (
    <>
      <style>{styles}</style>

      {page === "login" && <LoginPage />}

      {page === "register" && <RegisterPage />}
    </>
  );
}

const styles = `
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Arial, sans-serif;
  background: #f4f7f9;
}

button,
input {
  font-family: inherit;
}

.page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.card {
  width: 100%;
  max-width: 420px;
  background: white;
  padding: 35px;
  border-radius: 12px;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.08);
}

.logo {
  text-align: center;
  color: #168aad;
  margin-bottom: 25px;
}

.card h2 {
  text-align: center;
  margin-bottom: 8px;
}

.subtitle {
  text-align: center;
  color: #777;
  margin-bottom: 25px;
}

label {
  display: block;
  margin-top: 15px;
  margin-bottom: 7px;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 7px;
  font-size: 15px;
}

input:focus {
  outline: none;
  border-color: #168aad;
}

.card form button {
  width: 100%;
  padding: 13px;
  margin-top: 22px;
  border: none;
  border-radius: 7px;
  background: #168aad;
  color: white;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
}

.card form button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error {
  color: #d62828;
  font-size: 13px;
  margin: 5px 0;
}

.error-box {
  background: #ffe5e5;
  color: #b00020;
  padding: 12px;
  border-radius: 7px;
  margin-bottom: 15px;
  font-size: 14px;
}

.switch {
  text-align: center;
  margin-top: 20px;
  color: #555;
}

.link {
  border: none;
  background: none;
  color: #168aad;
  font-weight: bold;
  cursor: pointer;
  margin-left: 5px;
}

.dashboard {
  min-height: 100vh;
}

.navbar {
  height: 65px;
  background: white;
  padding: 0 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}

.navbar h1 {
  color: #168aad;
  margin: 0;
}

.logout {
  border: none;
  background: #168aad;
  color: white;
  padding: 10px 20px;
  border-radius: 7px;
  cursor: pointer;
}

.dashboard-content {
  padding: 50px 20px;
  text-align: center;
}

.user-box {
  max-width: 400px;
  margin: 25px auto;
  padding: 20px;
  background: white;
  border-radius: 10px;
  text-align: left;
  box-shadow: 0 3px 15px rgba(0,0,0,0.06);
}

@media (max-width: 500px) {
  .card {
    padding: 25px 20px;
  }

  .navbar {
    padding: 0 15px;
  }

  .navbar h1 {
    font-size: 22px;
  }
}
`;

export default App;