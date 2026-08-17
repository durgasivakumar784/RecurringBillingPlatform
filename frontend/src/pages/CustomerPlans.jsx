import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

function CustomerPlans() {
  const navigate = useNavigate();

  const [plans, setPlans] = useState([]);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await api.get("/plans/");
      setPlans(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#09090b",
        color: "white",
        padding: "40px 50px",
      }}
    >
      {/* HEADER */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "50px",
        }}
      >
        <h1
          style={{
            color: "#22c55e",
            margin: 0,
          }}
        >
          MyStream
        </h1>

        <button
          onClick={() => navigate("/customer")}
          style={{
            padding: "10px 20px",
            border: "1px solid #3f3f46",
            borderRadius: "20px",
            background: "#18181b",
            color: "white",
            cursor: "pointer",
          }}
        >
          ← Back
        </button>
      </div>

      {/* TITLE */}

      <div
        style={{
          textAlign: "center",
          marginBottom: "40px",
        }}
      >
        <h2
          style={{
            fontSize: "38px",
            marginBottom: "10px",
          }}
        >
          Choose Your Plan
        </h2>

        <p
          style={{
            color: "#a1a1aa",
            fontSize: "17px",
          }}
        >
          Enjoy unlimited movies and web series with MyStream Premium.
        </p>
      </div>

      {/* PLANS */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "25px",
          maxWidth: "1000px",
          margin: "auto",
        }}
      >
        {plans
          .filter((plan) => plan.is_active)
          .map((plan) => (
            <div
              key={plan.id}
              style={{
                background: "#18181b",
                border: "1px solid #27272a",
                borderRadius: "18px",
                padding: "30px",
                textAlign: "center",
              }}
            >
              <h2>{plan.name}</h2>

              <h1
                style={{
                  color: "#22c55e",
                  fontSize: "40px",
                }}
              >
                ₹ {plan.price}
              </h1>

              <p
                style={{
                  color: "#a1a1aa",
                }}
              >
                per {plan.billing_cycle}
              </p>

              <hr
                style={{
                  border: "none",
                  borderTop: "1px solid #27272a",
                  margin: "25px 0",
                }}
              />

              <p>✓ Unlimited Movies</p>

              <p>✓ Web Series</p>

              <p>✓ HD Streaming</p>

              <p>✓ Cancel Anytime</p>

              <button
                onClick={() => {
                  alert(`Selected ${plan.name} plan`);
                }}
                style={{
                  width: "100%",
                  padding: "13px",
                  marginTop: "20px",
                  border: "none",
                  borderRadius: "8px",
                  background: "#22c55e",
                  color: "#000",
                  fontWeight: "bold",
                  cursor: "pointer",
                  fontSize: "16px",
                }}
              >
                Subscribe Now
              </button>
            </div>
          ))}
      </div>

      {/* NO PLANS */}

      {plans.filter((plan) => plan.is_active).length === 0 && (
        <p
          style={{
            textAlign: "center",
            color: "#a1a1aa",
            marginTop: "40px",
          }}
        >
          No active plans available.
        </p>
      )}
    </div>
  );
}

export default CustomerPlans;