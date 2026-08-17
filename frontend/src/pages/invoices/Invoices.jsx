import { useEffect, useState } from "react";
import api from "../../services/api";

function Invoices() {
  const [invoices, setInvoices] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [subscriptionId, setSubscriptionId] = useState("");

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const response = await api.get("/invoices/");
      setInvoices(response.data);
    } catch (error) {
      console.log("Fetch Invoice Error:", error);
    }
  };

  const generateInvoice = async () => {
    if (!subscriptionId) {
      alert("Please enter Subscription ID");
      return;
    }

    try {
      await api.post(`/invoices/generate/${subscriptionId}`);

      alert("Invoice Generated Successfully");

      setSubscriptionId("");
      setShowForm(false);

      fetchInvoices();
    } catch (error) {
      console.log("Generate Invoice Error:", error);

      alert(
        "Invoice Generation Failed: " +
          JSON.stringify(error.response?.data || error.message)
      );
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "35px",
        background:
          "linear-gradient(135deg, #0f172a 0%, #111827 45%, #1e1b4b 100%)",
        color: "white",
      }}
    >
      {/* HEADER */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <div>
          <h1
            style={{
              margin: 0,
              fontSize: "32px",
              fontWeight: "700",
            }}
          >
            🧾 Invoices
          </h1>

          <p
            style={{
              marginTop: "8px",
              color: "#94a3b8",
              fontSize: "15px",
            }}
          >
            Manage generated invoices and payment status
          </p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          style={{
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            color: "white",
            border: "none",
            padding: "13px 22px",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "600",
            boxShadow: "0 8px 20px rgba(99,102,241,0.3)",
          }}
        >
          {showForm ? "✕ Close" : "+ Generate Invoice"}
        </button>
      </div>

      {/* SUMMARY CARD */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        <div style={summaryCard}>
          <div style={iconBox}>🧾</div>

          <div>
            <p style={summaryTitle}>Total Invoices</p>

            <h2 style={summaryValue}>
              {invoices.length}
            </h2>
          </div>
        </div>

        <div style={summaryCard}>
          <div
            style={{
              ...iconBox,
              background: "rgba(245,158,11,0.15)",
            }}
          >
            ⏳
          </div>

          <div>
            <p style={summaryTitle}>Pending</p>

            <h2 style={summaryValue}>
              {
                invoices.filter(
                  (invoice) =>
                    invoice.status?.toLowerCase() === "pending"
                ).length
              }
            </h2>
          </div>
        </div>

        <div style={summaryCard}>
          <div
            style={{
              ...iconBox,
              background: "rgba(34,197,94,0.15)",
            }}
          >
            ✓
          </div>

          <div>
            <p style={summaryTitle}>Paid</p>

            <h2 style={summaryValue}>
              {
                invoices.filter(
                  (invoice) =>
                    invoice.status?.toLowerCase() === "paid"
                ).length
              }
            </h2>
          </div>
        </div>
      </div>

      {/* GENERATE FORM */}

      {showForm && (
        <div
          style={{
            background: "rgba(30,41,59,0.9)",
            border: "1px solid #334155",
            padding: "25px",
            borderRadius: "16px",
            marginBottom: "30px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
          }}
        >
          <h2
            style={{
              marginTop: 0,
              fontSize: "20px",
            }}
          >
            Generate New Invoice
          </h2>

          <p
            style={{
              color: "#94a3b8",
              fontSize: "14px",
            }}
          >
            Enter the subscription ID to generate an invoice.
          </p>

          <div
            style={{
              display: "flex",
              gap: "12px",
              marginTop: "20px",
            }}
          >
            <input
              type="number"
              placeholder="Subscription ID"
              value={subscriptionId}
              onChange={(e) =>
                setSubscriptionId(e.target.value)
              }
              style={{
                padding: "13px",
                width: "250px",
                borderRadius: "9px",
                border: "1px solid #475569",
                background: "#0f172a",
                color: "white",
                outline: "none",
              }}
            />

            <button
              onClick={generateInvoice}
              style={{
                background: "#22c55e",
                color: "#052e16",
                border: "none",
                padding: "13px 22px",
                borderRadius: "9px",
                cursor: "pointer",
                fontWeight: "700",
              }}
            >
              Generate
            </button>
          </div>
        </div>
      )}

      {/* INVOICE TABLE */}

      <div
        style={{
          background: "rgba(15,23,42,0.85)",
          border: "1px solid #334155",
          borderRadius: "18px",
          overflow: "hidden",
          boxShadow: "0 15px 40px rgba(0,0,0,0.3)",
        }}
      >
        <div
          style={{
            padding: "22px 25px",
            borderBottom: "1px solid #334155",
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: "20px",
            }}
          >
            Invoice Records
          </h2>
        </div>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr
              style={{
                background: "#1e293b",
              }}
            >
              <th style={headerCell}>ID</th>
              <th style={headerCell}>Subscription</th>
              <th style={headerCell}>Amount</th>
              <th style={headerCell}>Status</th>
              <th style={headerCell}>Created Date</th>
            </tr>
          </thead>

          <tbody>
            {invoices.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  style={{
                    padding: "50px",
                    textAlign: "center",
                    color: "#94a3b8",
                  }}
                >
                  🧾 No invoices found
                </td>
              </tr>
            ) : (
              invoices.map((invoice) => (
                <tr
                  key={invoice.id}
                  style={{
                    borderBottom: "1px solid #1e293b",
                  }}
                >
                  <td style={bodyCell}>
                    <span
                      style={{
                        background: "#312e81",
                        padding: "6px 10px",
                        borderRadius: "7px",
                      }}
                    >
                      #{invoice.id}
                    </span>
                  </td>

                  <td style={bodyCell}>
                    Subscription #{invoice.subscription_id}
                  </td>

                  <td
                    style={{
                      ...bodyCell,
                      fontWeight: "700",
                      color: "#22c55e",
                    }}
                  >
                    ₹ {invoice.amount}
                  </td>

                  <td style={bodyCell}>
                    <span
                      style={{
                        background:
                          invoice.status?.toLowerCase() === "paid"
                            ? "rgba(34,197,94,0.15)"
                            : "rgba(245,158,11,0.15)",

                        color:
                          invoice.status?.toLowerCase() === "paid"
                            ? "#4ade80"
                            : "#fbbf24",

                        padding: "7px 14px",
                        borderRadius: "20px",
                        fontWeight: "600",
                        fontSize: "13px",
                      }}
                    >
                      {invoice.status}
                    </span>
                  </td>

                  <td style={bodyCell}>
                    {invoice.created_at
                      ? new Date(
                          invoice.created_at
                        ).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })
                      : "-"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* SUMMARY CARD */

const summaryCard = {
  background: "rgba(30,41,59,0.8)",
  border: "1px solid #334155",
  borderRadius: "16px",
  padding: "22px",
  display: "flex",
  alignItems: "center",
  gap: "18px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
};

const iconBox = {
  width: "50px",
  height: "50px",
  borderRadius: "12px",
  background: "rgba(99,102,241,0.15)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "24px",
};

const summaryTitle = {
  margin: 0,
  color: "#94a3b8",
  fontSize: "14px",
};

const summaryValue = {
  margin: "5px 0 0",
  fontSize: "26px",
};

const headerCell = {
  padding: "16px",
  textAlign: "center",
  color: "#cbd5e1",
  fontWeight: "600",
  fontSize: "14px",
};

const bodyCell = {
  padding: "18px 14px",
  textAlign: "center",
  color: "#e2e8f0",
  fontSize: "14px",
};

export default Invoices;