```jsx
import { useEffect, useState } from "react";
import api from "../../services/api";

function Refunds() {
  const [refunds, setRefunds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRefunds();
  }, []);

  const fetchRefunds = async () => {
    try {
      const response = await api.get("/refunds/");
      console.log("Refunds:", response.data);
      setRefunds(response.data);
    } catch (error) {
      console.log("Failed to fetch refunds:", error);
    } finally {
      setLoading(false);
    }
  };

  // Summary counts
  const totalRefunds = refunds.length;

  const successfulRefunds = refunds.filter(
    (refund) =>
      refund.status?.toLowerCase() === "successful" ||
      refund.status?.toLowerCase() === "success" ||
      refund.status?.toLowerCase() === "completed"
  ).length;

  const pendingRefunds = refunds.filter(
    (refund) => refund.status?.toLowerCase() === "pending"
  ).length;

  const failedRefunds = refunds.filter(
    (refund) => refund.status?.toLowerCase() === "failed"
  ).length;

  return (
    <div
      style={{
        padding: "30px",
        background: "#061b3a",
        minHeight: "100vh",
      }}
    >
      {/* Header */}

      <div
        style={{
          background: "#0b2852",
          padding: "25px",
          borderRadius: "15px",
          marginBottom: "25px",
          border: "1px solid #193d6d",
        }}
      >
        <h1
          style={{
            margin: 0,
            color: "white",
            fontSize: "30px",
          }}
        >
          Refunds
        </h1>

        <p
          style={{
            color: "#9fb1cc",
            marginTop: "10px",
            marginBottom: 0,
          }}
        >
          Manage refund transactions and monitor refund status
        </p>
      </div>

      {/* Summary Cards */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "20px",
          marginBottom: "25px",
        }}
      >
        {/* Total */}

        <div style={cardStyle}>
          <div style={iconStyle}>↩</div>

          <div>
            <p style={labelStyle}>Total Refunds</p>

            <h2 style={numberStyle}>
              {totalRefunds}
            </h2>
          </div>
        </div>

        {/* Successful */}

        <div style={cardStyle}>
          <div style={iconStyle}>✓</div>

          <div>
            <p style={labelStyle}>Successful</p>

            <h2 style={numberStyle}>
              {successfulRefunds}
            </h2>
          </div>
        </div>

        {/* Pending */}

        <div style={cardStyle}>
          <div style={iconStyle}>⏳</div>

          <div>
            <p style={labelStyle}>Pending</p>

            <h2 style={numberStyle}>
              {pendingRefunds}
            </h2>
          </div>
        </div>

        {/* Failed */}

        <div style={cardStyle}>
          <div style={iconStyle}>✕</div>

          <div>
            <p style={labelStyle}>Failed</p>

            <h2 style={numberStyle}>
              {failedRefunds}
            </h2>
          </div>
        </div>
      </div>

      {/* Refund History */}

      <div
        style={{
          background: "#0b2852",
          padding: "25px",
          borderRadius: "15px",
          border: "1px solid #193d6d",
          overflowX: "auto",
        }}
      >
        <h2
          style={{
            color: "white",
            marginTop: 0,
            marginBottom: "20px",
          }}
        >
          Refund Transactions
        </h2>

        {loading ? (
          <div
            style={{
              textAlign: "center",
              padding: "60px",
              color: "#9fb1cc",
            }}
          >
            Loading refunds...
          </div>
        ) : refunds.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "60px 20px",
              color: "#9fb1cc",
            }}
          >
            <div
              style={{
                fontSize: "45px",
                marginBottom: "15px",
              }}
            >
              ↩️
            </div>

            <h3
              style={{
                color: "white",
                marginBottom: "10px",
              }}
            >
              No Refunds Found
            </h3>

            <p>
              Refund transactions will appear here.
            </p>
          </div>
        ) : (
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              minWidth: "750px",
            }}
          >
            <thead>
              <tr>
                <th style={headStyle}>ID</th>
                <th style={headStyle}>Invoice ID</th>
                <th style={headStyle}>Amount</th>
                <th style={headStyle}>Reason</th>
                <th style={headStyle}>Status</th>
              </tr>
            </thead>

            <tbody>
              {refunds.map((refund) => (
                <tr key={refund.id}>
                  <td style={cellStyle}>
                    {refund.id}
                  </td>

                  <td style={cellStyle}>
                    {refund.invoice_id}
                  </td>

                  <td
                    style={{
                      ...cellStyle,
                      fontWeight: "600",
                      color: "white",
                    }}
                  >
                    ₹ {refund.amount}
                  </td>

                  <td style={cellStyle}>
                    {refund.reason || "-"}
                  </td>

                  <td style={cellStyle}>
                    <span
                      style={getStatusStyle(
                        refund.status
                      )}
                    >
                      {refund.status || "Pending"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

const cardStyle = {
  background: "#0b2852",
  border: "1px solid #193d6d",
  borderRadius: "15px",
  padding: "22px",
  display: "flex",
  alignItems: "center",
  gap: "15px",
};

const iconStyle = {
  width: "45px",
  height: "45px",
  borderRadius: "12px",
  background: "#173f72",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "22px",
  color: "#60a5fa",
};

const labelStyle = {
  margin: 0,
  color: "#9fb1cc",
  fontSize: "14px",
};

const numberStyle = {
  margin: "5px 0 0",
  color: "white",
  fontSize: "26px",
};

const headStyle = {
  padding: "15px",
  textAlign: "left",
  background: "#092143",
  color: "#9fb1cc",
  borderBottom: "1px solid #193d6d",
};

const cellStyle = {
  padding: "15px",
  borderBottom: "1px solid #193d6d",
  color: "#cbd5e1",
  textAlign: "left",
};

const getStatusStyle = (status) => {
  const value = status?.toLowerCase();

  if (
    value === "successful" ||
    value === "success" ||
    value === "completed"
  ) {
    return {
      background: "#123f32",
      color: "#4ade80",
      padding: "6px 14px",
      borderRadius: "20px",
      fontSize: "13px",
      fontWeight: "600",
    };
  }

  if (value === "failed") {
    return {
      background: "#4a1f2b",
      color: "#f87171",
      padding: "6px 14px",
      borderRadius: "20px",
      fontSize: "13px",
      fontWeight: "600",
    };
  }

  return {
    background: "#493b16",
    color: "#facc15",
    padding: "6px 14px",
    borderRadius: "20px",
    fontSize: "13px",
    fontWeight: "600",
  };
};

export default Refunds;
```
