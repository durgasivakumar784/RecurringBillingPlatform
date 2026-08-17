import { useEffect, useState } from "react";
import api from "../../services/api";

function Subscriptions() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [plans, setPlans] = useState([]);

  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    customer_id: "",
    plan_id: "",
  });

  // =========================
  // LOAD DATA
  // =========================

  useEffect(() => {
    fetchSubscriptions();
    fetchCustomers();
    fetchPlans();
  }, []);

  // =========================
  // FETCH SUBSCRIPTIONS
  // =========================

  const fetchSubscriptions = async () => {
    try {
      const response = await api.get("/subscriptions/");

      console.log("Subscriptions:", response.data);

      setSubscriptions(response.data);
    } catch (error) {
      console.log(
        "Subscriptions Error:",
        error.response?.data || error
      );
    }
  };

  // =========================
  // FETCH CUSTOMERS
  // =========================

  const fetchCustomers = async () => {
    try {
      const response = await api.get("/customers/");

      console.log("Customers:", response.data);

      setCustomers(response.data);
    } catch (error) {
      console.log(
        "Customers Error:",
        error.response?.data || error
      );
    }
  };

  // =========================
  // FETCH PLANS
  // =========================

  const fetchPlans = async () => {
    try {
      const response = await api.get("/plans/");

      console.log("Plans:", response.data);

      setPlans(response.data);
    } catch (error) {
      console.log(
        "Plans Error:",
        error.response?.data || error
      );
    }
  };

  // =========================
  // CREATE SUBSCRIPTION
  // =========================

  const createSubscription = async () => {
    if (!formData.customer_id || !formData.plan_id) {
      alert("Please select Customer and Plan");
      return;
    }

    try {
      console.log(
        "Creating subscription:",
        formData.customer_id,
        formData.plan_id
      );

      const response = await api.post(
        `/subscriptions/?customer_id=${formData.customer_id}&plan_id=${formData.plan_id}`
      );

      console.log(
        "Created Subscription:",
        response.data
      );

      alert("Subscription Created Successfully!");

      setFormData({
        customer_id: "",
        plan_id: "",
      });

      setShowForm(false);

      fetchSubscriptions();

    } catch (error) {
      console.log(
        "Create Subscription Error:",
        error.response?.data || error
      );

      alert(
        "Subscription failed: " +
          JSON.stringify(error.response?.data || {})
      );
    }
  };

  // =========================
  // CANCEL SUBSCRIPTION
  // =========================

  const cancelSubscription = async (id) => {
    try {
      await api.put(
        `/subscriptions/${id}/status`,
        {
          status: "cancelled",
        }
      );

      alert("Subscription Cancelled");

      fetchSubscriptions();

    } catch (error) {
      console.log(
        "Cancel Error:",
        error.response?.data || error
      );

      alert("Failed to cancel subscription");
    }
  };

  // =========================
  // STATUS STYLE
  // =========================

  const statusStyle = (status) => {
    if (status?.toLowerCase() === "active") {
      return {
        background: "#dcfce7",
        color: "#166534",
      };
    }

    if (status?.toLowerCase() === "trial") {
      return {
        background: "#dbeafe",
        color: "#1e40af",
      };
    }

    if (status?.toLowerCase() === "past_due") {
      return {
        background: "#fef3c7",
        color: "#92400e",
      };
    }

    return {
      background: "#fee2e2",
      color: "#991b1b",
    };
  };

  // =========================
  // DATE FORMAT
  // =========================

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString(
      "en-GB",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  return (
    <div style={page}>

      <div style={card}>

        {/* HEADER */}

        <div style={header}>

          <div>
            <h1 style={title}>
              🔄 Subscriptions
            </h1>

            <p style={subtitle}>
              Manage customer subscription lifecycle
            </p>
          </div>

          <button
            style={createButton}
            onClick={() => setShowForm(!showForm)}
          >
            {showForm
              ? "✕ Close"
              : "+ Create Subscription"}
          </button>

        </div>

        {/* =========================
            CREATE FORM
        ========================= */}

        {showForm && (
          <div style={formBox}>

            <h2 style={formTitle}>
              Create New Subscription
            </h2>

            <div style={formRow}>

              {/* CUSTOMER */}

              <div style={fieldBox}>

                <label style={label}>
                  Select Customer
                </label>

                <select
                  style={select}
                  value={formData.customer_id}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      customer_id: e.target.value,
                    })
                  }
                >

                  <option value="">
                    Select Customer
                  </option>

                  {customers.map((customer) => (
                    <option
                      key={customer.id}
                      value={customer.id}
                    >
                      {customer.name}
                    </option>
                  ))}

                </select>

              </div>

              {/* PLAN */}

              <div style={fieldBox}>

                <label style={label}>
                  Select Plan
                </label>

                <select
                  style={select}
                  value={formData.plan_id}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      plan_id: e.target.value,
                    })
                  }
                >

                  <option value="">
                    Select Plan
                  </option>

                  {plans.map((plan) => (
                    <option
                      key={plan.id}
                      value={plan.id}
                    >
                      {plan.name} - ₹{plan.price}
                    </option>
                  ))}

                </select>

              </div>

            </div>

            <button
              style={submitButton}
              onClick={createSubscription}
            >
              Create Subscription
            </button>

          </div>
        )}

        {/* =========================
            SUMMARY
        ========================= */}

        <div style={summaryBox}>

          <h2 style={summaryNumber}>
            {subscriptions.length}
          </h2>

          <p style={summaryText}>
            Total Subscriptions
          </p>

        </div>

        {/* =========================
            SUBSCRIPTIONS
        ========================= */}

        {subscriptions.length === 0 ? (

          <div style={empty}>

            <div style={emptyIcon}>
              🔄
            </div>

            <h2>
              No Subscriptions Found
            </h2>

            <p>
              Click "Create Subscription" to create one.
            </p>

          </div>

        ) : (

          <div style={tableContainer}>

            <table style={table}>

              <thead>

                <tr style={tableHeader}>

                  <th style={headerCell}>
                    ID
                  </th>

                  <th style={headerCell}>
                    Customer
                  </th>

                  <th style={headerCell}>
                    Plan
                  </th>

                  <th style={headerCell}>
                    Status
                  </th>

                  <th style={headerCell}>
                    Start Date
                  </th>

                  <th style={headerCell}>
                    Action
                  </th>

                </tr>

              </thead>

              <tbody>

                {subscriptions.map((sub) => (

                  <tr
                    key={sub.id}
                    style={row}
                  >

                    <td style={cell}>
                      {sub.id}
                    </td>

                    <td style={cell}>
                      {sub.customer?.name ||
                        sub.customer_id}
                    </td>

                    <td style={cell}>
                      {sub.plan?.name ||
                        sub.plan_id}
                    </td>

                    <td style={cell}>

                      <span
                        style={{
                          ...statusStyle(sub.status),
                          padding: "6px 15px",
                          borderRadius: "20px",
                          fontWeight: "600",
                        }}
                      >
                        {sub.status}
                      </span>

                    </td>

                    <td style={cell}>
                      {formatDate(sub.start_date)}
                    </td>

                    <td style={cell}>

                      {sub.status !== "cancelled" && (

                        <button
                          style={cancelButton}
                          onClick={() =>
                            cancelSubscription(sub.id)
                          }
                        >
                          Cancel
                        </button>

                      )}

                      {sub.status === "cancelled" && (

                        <span style={cancelledText}>
                          Cancelled
                        </span>

                      )}

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>
  );
}

// =========================
// STYLES
// =========================

const page = {
  minHeight: "100vh",
  padding: "30px",
  background:
    "linear-gradient(135deg, #eef2ff, #f8fafc)",
};

const card = {
  background: "white",
  padding: "30px",
  borderRadius: "20px",
  boxShadow:
    "0 10px 30px rgba(0,0,0,0.08)",
};

const header = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const title = {
  margin: 0,
  color: "#1e293b",
};

const subtitle = {
  color: "#64748b",
  marginTop: "8px",
};

const createButton = {
  background:
    "linear-gradient(135deg,#2563eb,#4f46e5)",
  color: "white",
  border: "none",
  padding: "12px 22px",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "600",
};

const formBox = {
  marginTop: "25px",
  padding: "25px",
  background: "#f1f5f9",
  borderRadius: "15px",
};

const formTitle = {
  marginTop: 0,
  color: "#1e293b",
};

const formRow = {
  display: "flex",
  gap: "20px",
  marginBottom: "20px",
};

const fieldBox = {
  flex: 1,
};

const label = {
  display: "block",
  marginBottom: "8px",
  color: "#334155",
  fontWeight: "600",
};

const select = {
  width: "100%",
  padding: "12px",
  border: "1px solid #cbd5e1",
  borderRadius: "8px",
  background: "white",
  color: "#1e293b",
  fontSize: "15px",
};

const submitButton = {
  background: "#16a34a",
  color: "white",
  border: "none",
  padding: "12px 25px",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "600",
};

const summaryBox = {
  marginTop: "30px",
  padding: "20px",
  borderRadius: "15px",
  background:
    "linear-gradient(135deg,#eff6ff,#eef2ff)",
  border: "1px solid #dbeafe",
  width: "220px",
};

const summaryNumber = {
  margin: 0,
  color: "#2563eb",
  fontSize: "32px",
};

const summaryText = {
  margin: "5px 0 0",
  color: "#64748b",
};

const tableContainer = {
  overflowX: "auto",
  marginTop: "30px",
};

const table = {
  width: "100%",
  borderCollapse: "collapse",
};

const tableHeader = {
  background: "#1e293b",
};

const headerCell = {
  padding: "14px",
  color: "white",
  textAlign: "center",
  fontWeight: "600",
};

const cell = {
  padding: "14px",
  textAlign: "center",
  color: "#334155",
};

const row = {
  borderBottom: "1px solid #e2e8f0",
};

const cancelButton = {
  background: "#ef4444",
  color: "white",
  border: "none",
  padding: "8px 15px",
  borderRadius: "7px",
  cursor: "pointer",
};

const cancelledText = {
  color: "#991b1b",
  fontWeight: "600",
};

const empty = {
  marginTop: "30px",
  padding: "60px 20px",
  textAlign: "center",
  background: "#f8fafc",
  borderRadius: "15px",
  color: "#64748b",
};

const emptyIcon = {
  fontSize: "50px",
  marginBottom: "10px",
};

export default Subscriptions;