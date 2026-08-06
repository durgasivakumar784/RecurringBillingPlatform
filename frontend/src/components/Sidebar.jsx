import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div
      style={{
        width: "240px",
        height: "100vh",
        background: "#1e293b",
        color: "white",
        padding: "25px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          background: "#334155",
          padding: "15px",
          borderRadius: "12px",
          textAlign: "center",
          marginBottom: "25px",
        }}
      >
        <h2
          style={{
            margin: 0,
            fontSize: "22px",
          }}
        >
          Billing Platform
        </h2>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        <Link to="/dashboard" style={linkStyle}>
          Dashboard
        </Link>

        <Link to="/plans" style={linkStyle}>
          Plans
        </Link>

        <Link to="/customers" style={linkStyle}>
          Customers
        </Link>

        <Link to="/subscriptions" style={linkStyle}>
          Subscriptions
        </Link>

        <Link to="/invoices" style={linkStyle}>
          Invoices
        </Link>

        <Link to="/payments" style={linkStyle}>
          Payments
        </Link>

        <Link to="/audit" style={linkStyle}>
          Audit Logs
        </Link>

        <Link to="/refunds" style={linkStyle}>
          Refunds
        </Link>

        <Link to="/admin-dashboard" style={linkStyle}>
          Admin Dashboard
        </Link>
      </div>

      <button
        style={{
          marginTop: "30px",
          width: "100%",
          padding: "10px",
          borderRadius: "8px",
          border: "none",
          background: "#ef4444",
          color: "white",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </div>
  );
}

const linkStyle = {
  color: "white",
  textDecoration: "none",
  padding: "12px",
  borderRadius: "8px",
  background: "#475569",
  fontSize: "15px",
  textAlign: "center",
};

export default Sidebar;