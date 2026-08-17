import { useEffect, useState } from "react";
import api from "../../services/api";

function Plans() {
  const [plans, setPlans] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [billingCycle, setBillingCycle] = useState("monthly");

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await api.get("/plans/");
      setPlans(response.data);
    } catch (error) {
      console.log("Plans Error:", error);
    }
  };

  const addPlan = async (e) => {
    e.preventDefault();

    try {
      await api.post(
        `/plans/?name=${name}&price=${price}&billing_cycle=${billingCycle}`
      );

      alert("Plan Added Successfully");

      setName("");
      setPrice("");
      setBillingCycle("monthly");

      fetchPlans();
    } catch (error) {
      console.log("Add Plan Error:", error);
      alert("Failed to add plan");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        padding: "30px",
        color: "white",
      }}
    >
      {/* HEADER */}

      <div
        style={{
          background: "#1e293b",
          padding: "25px",
          borderRadius: "15px",
          marginBottom: "25px",
        }}
      >
        <h1 style={{ margin: 0 }}>💳 Subscription Plans</h1>

        <p style={{ color: "#94a3b8" }}>
          Manage your subscription plans
        </p>
      </div>

      {/* ADD PLAN */}

      <div
        style={{
          background: "#1e293b",
          padding: "25px",
          borderRadius: "15px",
          marginBottom: "30px",
        }}
      >
        <h2>➕ Add New Plan</h2>

        <form
          onSubmit={addPlan}
          style={{
            display: "flex",
            gap: "15px",
            flexWrap: "wrap",
            marginTop: "20px",
          }}
        >
          <input
            type="text"
            placeholder="Plan Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={inputStyle}
          />

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            style={inputStyle}
          />

          <select
            value={billingCycle}
            onChange={(e) => setBillingCycle(e.target.value)}
            style={inputStyle}
          >
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>

          <button type="submit" style={buttonStyle}>
            + Add Plan
          </button>
        </form>
      </div>

      {/* PLANS */}

      <h2>Available Plans</h2>

      {plans.length === 0 ? (
        <div
          style={{
            background: "#1e293b",
            padding: "40px",
            borderRadius: "15px",
            textAlign: "center",
            color: "#94a3b8",
          }}
        >
          No Plans Found
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          {plans.map((plan) => (
            <div
              key={plan.id}
              style={{
                background:
                  "linear-gradient(145deg, #1e293b, #111827)",
                padding: "25px",
                borderRadius: "18px",
                border: "1px solid #334155",
                boxShadow:
                  "0 8px 20px rgba(0,0,0,0.3)",
              }}
            >
              <div style={{ fontSize: "35px" }}>
                💎
              </div>

              <h2>{plan.name}</h2>

              <h1 style={{ color: "#38bdf8" }}>
                ₹{plan.price}
              </h1>

              <p style={{ color: "#94a3b8" }}>
                Billing: {plan.billing_cycle}
              </p>

              <p>
                Status:{" "}
                <span
                  style={{
                    color: plan.is_active
                      ? "#4ade80"
                      : "#f87171",
                    fontWeight: "bold",
                  }}
                >
                  {plan.is_active
                    ? "Active"
                    : "Inactive"}
                </span>
              </p>

              <hr
                style={{
                  border: "none",
                  borderTop: "1px solid #334155",
                }}
              />

              <p style={{ color: "#cbd5e1" }}>
                ✓ Unlimited Streaming
              </p>

              <p style={{ color: "#cbd5e1" }}>
                ✓ HD Video Quality
              </p>

              <p style={{ color: "#cbd5e1" }}>
                ✓ Movies & Web Series
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const inputStyle = {
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #475569",
  background: "#0f172a",
  color: "white",
  outline: "none",
};

const buttonStyle = {
  padding: "12px 22px",
  border: "none",
  borderRadius: "8px",
  background: "#2563eb",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
};

export default Plans;