import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

function Login() {
  const navigate = useNavigate();

  const [role, setRole] = useState("admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      // ================= ADMIN LOGIN =================
      if (role === "admin") {
        if (
          email === "admin@gmail.com" &&
          password === "Admin@123"
        ) {
          localStorage.setItem("userRole", "admin");
          localStorage.setItem("token", "admin-demo-token");

          navigate("/dashboard");
          return;
        }

        alert("Invalid Admin email or password");
        return;
      }

      // ================= CUSTOMER LOGIN =================
      if (role === "customer") {
        if (
          email === "customer@gmail.com" &&
          password === "Customer@123"
        ) {
          localStorage.setItem("userRole", "customer");
          localStorage.setItem("token", "customer-demo-token");

          navigate("/customer-home");
          return;
        }

        alert("Invalid Customer email or password");
        return;
      }

    } catch (error) {
      console.error("Login Error:", error);

      alert(
        error.response?.data?.detail ||
        error.response?.data?.message ||
        error.message ||
        "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(135deg, #020617, #0f172a, #14532d)",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "390px",
          padding: "40px",
          background: "#111827",
          borderRadius: "20px",
          boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
          border: "1px solid #1f2937",
        }}
      >
        {/* LOGO */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "25px",
          }}
        >
          <h1
            style={{
              margin: 0,
              color: "#22c55e",
              fontSize: "36px",
            }}
          >
            MyStream
          </h1>

          <p
            style={{
              color: "#9ca3af",
              marginTop: "8px",
            }}
          >
            Recurring Billing Platform
          </p>
        </div>

        {/* ROLE BUTTONS */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "25px",
          }}
        >
          <button
            type="button"
            onClick={() => setRole("admin")}
            style={{
              flex: 1,
              padding: "12px",
              border: "none",
              borderRadius: "10px",
              background:
                role === "admin" ? "#22c55e" : "#27272a",
              color:
                role === "admin" ? "#000" : "#fff",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            👨‍💼 Admin
          </button>

          <button
            type="button"
            onClick={() => setRole("customer")}
            style={{
              flex: 1,
              padding: "12px",
              border: "none",
              borderRadius: "10px",
              background:
                role === "customer"
                  ? "#22c55e"
                  : "#27272a",
              color:
                role === "customer" ? "#000" : "#fff",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            👤 Customer
          </button>
        </div>

        {/* TITLE */}
        <h2
          style={{
            color: "white",
            textAlign: "center",
            marginBottom: "25px",
          }}
        >
          {role === "admin"
            ? "Admin Login"
            : "Customer Login"}
        </h2>

        {/* LOGIN FORM */}
        <form onSubmit={handleLogin}>

          {/* EMAIL */}
          <label
            style={{
              color: "#d1d5db",
              fontSize: "14px",
            }}
          >
            Email
          </label>

          <input
            type="email"
            placeholder={
              role === "admin"
                ? "admin@gmail.com"
                : "customer@gmail.com"
            }
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "13px",
              marginTop: "7px",
              marginBottom: "18px",
              borderRadius: "9px",
              border: "1px solid #374151",
              background: "#1f2937",
              color: "white",
              fontSize: "15px",
              boxSizing: "border-box",
              outline: "none",
            }}
          />

          {/* PASSWORD */}
          <label
            style={{
              color: "#d1d5db",
              fontSize: "14px",
            }}
          >
            Password
          </label>

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "13px",
              marginTop: "7px",
              marginBottom: "22px",
              borderRadius: "9px",
              border: "1px solid #374151",
              background: "#1f2937",
              color: "white",
              fontSize: "15px",
              boxSizing: "border-box",
              outline: "none",
            }}
          />

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "13px",
              border: "none",
              borderRadius: "10px",
              background: "#22c55e",
              color: "#000",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* DEMO DETAILS */}
        <div
          style={{
            marginTop: "25px",
            padding: "15px",
            background: "#18181b",
            borderRadius: "10px",
            border: "1px solid #27272a",
          }}
        >
          <p
            style={{
              margin: "0 0 8px",
              color: "#22c55e",
              fontWeight: "bold",
              fontSize: "13px",
            }}
          >
            Demo Credentials
          </p>

          <p
            style={{
              margin: "5px 0",
              color: "#a1a1aa",
              fontSize: "12px",
            }}
          >
            Admin: admin@gmail.com / Admin@123
          </p>

          <p
            style={{
              margin: "5px 0",
              color: "#a1a1aa",
              fontSize: "12px",
            }}
          >
            Customer: customer@gmail.com / Customer@123
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;