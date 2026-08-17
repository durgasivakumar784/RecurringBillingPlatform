import React from "react";
import { useNavigate } from "react-router-dom";

function CustomerPlans() {
  const navigate = useNavigate();

  const plans = [
    {
      id: 1,
      name: "Basic",
      price: 99,
      color: "#38bdf8",
      features: [
        "HD Streaming",
        "Unlimited Movies",
        "Unlimited Web Series",
      ],
    },
    {
      id: 2,
      name: "Standard",
      price: 199,
      color: "#22c55e",
      popular: true,
      features: [
        "Full HD Streaming",
        "Unlimited Movies",
        "Unlimited Web Series",
        "Multiple Devices",
      ],
    },
    {
      id: 3,
      name: "Premium",
      price: 299,
      color: "#a855f7",
      features: [
        "4K Streaming",
        "Unlimited Movies",
        "Unlimited Web Series",
        "Multiple Devices",
        "Premium Content",
      ],
    },
  ];

  const selectPlan = (plan) => {
    localStorage.setItem("selectedPlan", plan.name);
    localStorage.setItem("isPremium", "true");

    alert(`${plan.name} plan selected successfully!`);

    navigate("/customer-home");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        background:
          "linear-gradient(135deg, #020617, #0f172a, #111827)",
        color: "#ffffff",
        padding: "40px",
        boxSizing: "border-box",
      }}
    >
      {/* HEADER */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "60px",
        }}
      >
        <h1
          style={{
            margin: 0,
            color: "#22c55e",
            fontSize: "32px",
          }}
        >
          MyStream
        </h1>

        <button
          onClick={() => navigate("/customer-home")}
          style={{
            padding: "11px 22px",
            borderRadius: "25px",
            border: "1px solid #475569",
            background: "#1e293b",
            color: "#ffffff",
            cursor: "pointer",
            fontSize: "15px",
          }}
        >
          ← Back
        </button>
      </div>

      {/* TITLE */}

      <div
        style={{
          textAlign: "center",
          marginBottom: "50px",
        }}
      >
        <div
          style={{
            color: "#22c55e",
            fontWeight: "bold",
            letterSpacing: "3px",
            marginBottom: "10px",
          }}
        >
          MYSTREAM PREMIUM
        </div>

        <h2
          style={{
            fontSize: "42px",
            margin: "10px 0",
          }}
        >
          Choose Your Plan
        </h2>

        <p
          style={{
            color: "#94a3b8",
            fontSize: "17px",
          }}
        >
          Enjoy unlimited entertainment anytime, anywhere.
        </p>
      </div>

      {/* PLAN CARDS */}

      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "25px",
        }}
      >
        {plans.map((plan) => (
          <div
            key={plan.id}
            style={{
              position: "relative",
              background: "#111827",
              borderRadius: "20px",
              padding: "30px",
              border: `2px solid ${plan.color}`,
              boxShadow: `0 10px 40px ${plan.color}22`,
            }}
          >
            {/* POPULAR */}

            {plan.popular && (
              <div
                style={{
                  position: "absolute",
                  top: "-14px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "#22c55e",
                  color: "#000000",
                  padding: "6px 20px",
                  borderRadius: "20px",
                  fontSize: "12px",
                  fontWeight: "bold",
                }}
              >
                MOST POPULAR
              </div>
            )}

            {/* PLAN NAME */}

            <h2
              style={{
                color: plan.color,
                fontSize: "28px",
                marginBottom: "15px",
              }}
            >
              {plan.name}
            </h2>

            {/* PRICE */}

            <div style={{ marginBottom: "25px" }}>
              <span
                style={{
                  fontSize: "42px",
                  fontWeight: "bold",
                }}
              >
                ₹{plan.price}
              </span>

              <span
                style={{
                  color: "#94a3b8",
                }}
              >
                /month
              </span>
            </div>

            {/* FEATURES */}

            <div
              style={{
                borderTop: "1px solid #334155",
                paddingTop: "20px",
                marginBottom: "25px",
              }}
            >
              {plan.features.map((feature) => (
                <p
                  key={feature}
                  style={{
                    color: "#cbd5e1",
                    margin: "12px 0",
                  }}
                >
                  <span
                    style={{
                      color: plan.color,
                      fontWeight: "bold",
                    }}
                  >
                    ✓
                  </span>{" "}
                  {feature}
                </p>
              ))}
            </div>

            {/* BUTTON */}

            <button
              onClick={() => selectPlan(plan)}
              style={{
                width: "100%",
                padding: "14px",
                border: "none",
                borderRadius: "10px",
                background: plan.color,
                color: "#000000",
                fontWeight: "bold",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              Subscribe Now
            </button>
          </div>
        ))}
      </div>

      {/* FOOTER */}

      <div
        style={{
          textAlign: "center",
          marginTop: "70px",
          paddingTop: "25px",
          borderTop: "1px solid #334155",
          color: "#64748b",
        }}
      >
        © 2026 MyStream. All Rights Reserved.
      </div>
    </div>
  );
}

export default CustomerPlans;