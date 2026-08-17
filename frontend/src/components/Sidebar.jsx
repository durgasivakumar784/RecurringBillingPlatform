import { NavLink, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const menuItems = [
    { path: "/dashboard", icon: "📊", label: "Dashboard" },
    { path: "/plans", icon: "💳", label: "Plans" },
    { path: "/customers", icon: "👥", label: "Customers" },
    { path: "/subscriptions", icon: "🔄", label: "Subscriptions" },
    { path: "/invoices", icon: "🧾", label: "Invoices" },
    { path: "/payments", icon: "💰", label: "Payments" },
    { path: "/audit", icon: "📋", label: "Audit Logs" },
    { path: "/refunds", icon: "💸", label: "Refunds" },
    {
      path: "/admin-dashboard",
      icon: "📈",
      label: "Admin Dashboard",
    },
  ];

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div
      style={{
        width: "260px",
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, #0f172a 0%, #111827 50%, #020617 100%)",
        color: "white",
        padding: "20px 15px",
        boxSizing: "border-box",
        position: "sticky",
        top: 0,
        display: "flex",
        flexDirection: "column",
        boxShadow: "4px 0 20px rgba(0,0,0,0.25)",
      }}
    >
      {/* LOGO */}

      <div
        style={{
          padding: "20px 10px",
          marginBottom: "25px",
          textAlign: "center",
          borderRadius: "16px",
          background:
            "linear-gradient(135deg, #1e293b, #334155)",
          border: "1px solid #475569",
          boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
        }}
      >
        <div
          style={{
            fontSize: "32px",
            marginBottom: "5px",
          }}
        >
          💳
        </div>

        <h2
          style={{
            margin: 0,
            fontSize: "20px",
            fontWeight: "700",
          }}
        >
          Billing Platform
        </h2>

        <p
          style={{
            margin: "6px 0 0",
            color: "#94a3b8",
            fontSize: "12px",
          }}
        >
          Admin Panel
        </p>
      </div>

      {/* MENU TITLE */}

      <p
        style={{
          color: "#64748b",
          fontSize: "11px",
          fontWeight: "bold",
          paddingLeft: "10px",
          marginBottom: "10px",
          letterSpacing: "1px",
        }}
      >
        MAIN MENU
      </p>

      {/* MENU */}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            style={({ isActive }) => ({
              display: "flex",
              alignItems: "center",
              gap: "12px",
              textDecoration: "none",
              color: isActive ? "#ffffff" : "#cbd5e1",
              padding: "13px 14px",
              borderRadius: "12px",
              fontSize: "14px",
              fontWeight: isActive ? "600" : "500",
              background: isActive
                ? "linear-gradient(135deg, #2563eb, #4f46e5)"
                : "#1e293b",
              border: isActive
                ? "1px solid #60a5fa"
                : "1px solid #334155",
              boxShadow: isActive
                ? "0 6px 18px rgba(37,99,235,0.3)"
                : "none",
              transition: "all 0.2s ease",
            })}
          >
            <span
              style={{
                fontSize: "19px",
                width: "24px",
                textAlign: "center",
              }}
            >
              {item.icon}
            </span>

            <span>{item.label}</span>
          </NavLink>
        ))}
      </div>

      {/* SPACER */}

      <div style={{ flex: 1 }} />

      {/* STATUS BOX */}

      <div
        style={{
          background: "#172033",
          border: "1px solid #334155",
          borderRadius: "12px",
          padding: "12px",
          marginBottom: "12px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#22c55e",
              display: "inline-block",
            }}
          />

          <span
            style={{
              fontSize: "12px",
              color: "#cbd5e1",
            }}
          >
            System Online
          </span>
        </div>
      </div>

      {/* LOGOUT */}

      <button
        onClick={logout}
        style={{
          width: "100%",
          padding: "13px",
          borderRadius: "12px",
          border: "1px solid #7f1d1d",
          background:
            "linear-gradient(135deg, #991b1b, #dc2626)",
          color: "white",
          cursor: "pointer",
          fontSize: "14px",
          fontWeight: "600",
          boxShadow: "0 5px 15px rgba(220,38,38,0.2)",
        }}
      >
        🚪 Logout
      </button>
    </div>
  );
}

export default Sidebar;