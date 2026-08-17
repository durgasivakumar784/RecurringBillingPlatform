import { useEffect, useState } from "react";
import api from "../../services/api";

function Payments() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const response = await api.get("/payments/");
      console.log("Payments:", response.data);
      setPayments(response.data);
    } catch (error) {
      console.log("Payment Fetch Error:", error);
    }
  };

  const totalPayments = payments.length;

  const successfulPayments = payments.filter(
    (payment) =>
      payment.payment_status?.toLowerCase() === "paid" ||
      payment.payment_status?.toLowerCase() === "success" ||
      payment.payment_status?.toLowerCase() === "successful"
  ).length;

  const failedPayments = payments.filter(
    (payment) =>
      payment.payment_status?.toLowerCase() === "failed"
  ).length;

  return (
    <div style={page}>

      <div style={card}>

        {/* HEADER */}
        <div style={header}>
          <div>
            <h1 style={title}>
              💳 Payments
            </h1>

            <p style={subtitle}>
              Monitor payment transactions and status
            </p>
          </div>
        </div>

        {/* SUMMARY CARDS */}
        <div style={summaryBox}>

          <div style={summaryCard}>
            <div style={iconBlue}>💳</div>

            <div>
              <p style={label}>Total Payments</p>
              <h2 style={numberBlue}>
                {totalPayments}
              </h2>
            </div>
          </div>

          <div style={successCard}>
            <div style={iconGreen}>✓</div>

            <div>
              <p style={label}>Successful</p>
              <h2 style={numberGreen}>
                {successfulPayments}
              </h2>
            </div>
          </div>

          <div style={failedCard}>
            <div style={iconRed}>✕</div>

            <div>
              <p style={label}>Failed</p>
              <h2 style={numberRed}>
                {failedPayments}
              </h2>
            </div>
          </div>

        </div>

        {/* TRANSACTIONS */}
        <div style={tableContainer}>

          <h2 style={sectionTitle}>
            Payment Transactions
          </h2>

          {payments.length === 0 ? (

            <div style={empty}>

              <div style={emptyIcon}>
                💳
              </div>

              <h3 style={emptyTitle}>
                No Payments Found
              </h3>

              <p style={emptyText}>
                Payment transactions will appear here.
              </p>

            </div>

          ) : (

            <table style={table}>

              <thead>
                <tr style={tableHeader}>

                  <th style={headerCell}>
                    ID
                  </th>

                  <th style={headerCell}>
                    Invoice ID
                  </th>

                  <th style={headerCell}>
                    Payment Status
                  </th>

                  <th style={headerCell}>
                    Payment Date
                  </th>

                </tr>
              </thead>

              <tbody>

                {payments.map((payment) => {

                  const status =
                    payment.payment_status || "pending";

                  const lowerStatus =
                    status.toLowerCase();

                  const isPaid =
                    lowerStatus === "paid" ||
                    lowerStatus === "success" ||
                    lowerStatus === "successful";

                  const isFailed =
                    lowerStatus === "failed";

                  return (
                    <tr
                      key={payment.id}
                      style={row}
                    >

                      <td style={cell}>
                        <b>{payment.id}</b>
                      </td>

                      <td style={cell}>
                        {payment.invoice_id}
                      </td>

                      <td style={cell}>

                        <span
                          style={
                            isPaid
                              ? paidBadge
                              : isFailed
                              ? failedBadge
                              : pendingBadge
                          }
                        >

                          {isPaid && "✓ "}
                          {isFailed && "✕ "}
                          {!isPaid && !isFailed && "● "}

                          {status}

                        </span>

                      </td>

                      <td style={cell}>
                        {payment.created_at
                          ? new Date(
                              payment.created_at
                            ).toLocaleDateString(
                              "en-GB",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              }
                            )
                          : "-"}
                      </td>

                    </tr>
                  );
                })}

              </tbody>

            </table>

          )}

        </div>

      </div>

    </div>
  );
}


/* =========================
   PAGE - DARK BLUE
========================= */

const page = {
  padding: "35px",
  minHeight: "100vh",

  background:
    "linear-gradient(135deg, #020617 0%, #0f172a 45%, #172554 100%)",

  boxSizing: "border-box",
};


/* =========================
   MAIN WHITE CARD
========================= */

const card = {
  background: "#ffffff",
  padding: "32px",
  borderRadius: "22px",

  boxShadow:
    "0 15px 40px rgba(0, 0, 0, 0.35)",

  minHeight: "calc(100vh - 70px)",
};


/* =========================
   HEADER
========================= */

const header = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "28px",
};


const title = {
  margin: 0,
  color: "#0f172a",
  fontSize: "30px",
  fontWeight: "700",
};


const subtitle = {
  color: "#64748b",
  marginTop: "8px",
  fontSize: "15px",
};


/* =========================
   SUMMARY
========================= */

const summaryBox = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "22px",
  marginBottom: "35px",
};


const summaryCard = {
  padding: "22px",
  borderRadius: "16px",

  background:
    "linear-gradient(135deg, #eff6ff, #dbeafe)",

  border: "1px solid #93c5fd",

  display: "flex",
  alignItems: "center",
  gap: "18px",

  boxShadow:
    "0 6px 18px rgba(37, 99, 235, 0.12)",
};


const successCard = {
  ...summaryCard,

  background:
    "linear-gradient(135deg, #f0fdf4, #dcfce7)",

  border: "1px solid #86efac",
};


const failedCard = {
  ...summaryCard,

  background:
    "linear-gradient(135deg, #fef2f2, #fee2e2)",

  border: "1px solid #fca5a5",
};


const iconBlue = {
  width: "52px",
  height: "52px",
  borderRadius: "14px",
  background: "#2563eb",
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "25px",
};


const iconGreen = {
  ...iconBlue,
  background: "#16a34a",
};


const iconRed = {
  ...iconBlue,
  background: "#dc2626",
};


const label = {
  margin: 0,
  color: "#64748b",
  fontSize: "14px",
};


const numberBlue = {
  margin: "5px 0 0",
  color: "#1d4ed8",
  fontSize: "28px",
};


const numberGreen = {
  margin: "5px 0 0",
  color: "#15803d",
  fontSize: "28px",
};


const numberRed = {
  margin: "5px 0 0",
  color: "#dc2626",
  fontSize: "28px",
};


/* =========================
   TABLE
========================= */

const tableContainer = {
  marginTop: "10px",
};


const sectionTitle = {
  color: "#0f172a",
  marginBottom: "20px",
  fontSize: "21px",
};


const table = {
  width: "100%",
  borderCollapse: "collapse",
  background: "white",
  borderRadius: "12px",
  overflow: "hidden",
};


const tableHeader = {
  background:
    "linear-gradient(135deg, #1e3a8a, #2563eb)",
};


const headerCell = {
  padding: "16px",
  textAlign: "center",
  color: "white",
  fontWeight: "700",
  fontSize: "14px",
};


const cell = {
  padding: "16px",
  textAlign: "center",
  color: "#334155",
  fontSize: "14px",
};


const row = {
  borderBottom: "1px solid #e2e8f0",
};


/* =========================
   STATUS BADGES
========================= */

const paidBadge = {
  background: "#dcfce7",
  color: "#166534",
  padding: "7px 15px",
  borderRadius: "20px",
  fontWeight: "600",
  fontSize: "12px",
};


const failedBadge = {
  background: "#fee2e2",
  color: "#991b1b",
  padding: "7px 15px",
  borderRadius: "20px",
  fontWeight: "600",
  fontSize: "12px",
};


const pendingBadge = {
  background: "#fef3c7",
  color: "#92400e",
  padding: "7px 15px",
  borderRadius: "20px",
  fontWeight: "600",
  fontSize: "12px",
};


/* =========================
   EMPTY STATE
========================= */

const empty = {
  padding: "65px 20px",
  textAlign: "center",

  background:
    "linear-gradient(135deg, #f8fafc, #eff6ff)",

  borderRadius: "16px",

  border: "1px dashed #93c5fd",
};


const emptyIcon = {
  fontSize: "55px",
  marginBottom: "10px",
};


const emptyTitle = {
  color: "#1e293b",
  fontSize: "20px",
  margin: "10px 0",
};


const emptyText = {
  color: "#64748b",
  margin: 0,
};


export default Payments;