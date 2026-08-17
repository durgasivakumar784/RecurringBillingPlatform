import { useEffect, useState } from "react";
import api from "../../services/api";

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // ================= FETCH CUSTOMERS =================

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await api.get("/customers/");

      console.log("Customers:", response.data);

      setCustomers(response.data);
    } catch (error) {
      console.log("Customer Fetch Error:", error);
    }
  };

  // ================= ADD CUSTOMER =================

  const addCustomer = async () => {
    if (!formData.name.trim()) {
      alert("Please enter customer name");
      return;
    }

    if (!formData.email.trim()) {
      alert("Please enter customer email");
      return;
    }

    try {
      console.log("Creating Customer:", formData);

      await api.post("/customers/", {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
      });

      alert("Customer Added Successfully");

      setFormData({
        name: "",
        email: "",
        phone: "",
      });

      setShowForm(false);

      fetchCustomers();
    } catch (error) {
      console.log("Create Customer Error:", error);
      console.log("Backend Error:", error.response?.data);

      alert(
        "Customer Creation Failed: " +
          JSON.stringify(error.response?.data || error.message)
      );
    }
  };

  return (
    <div style={page}>

      {/* ================= MAIN CARD ================= */}

      <div style={card}>

        {/* ================= HEADER ================= */}

        <div style={header}>

          <div>
            <h1 style={title}>
              👥 Customers
            </h1>

            <p style={subtitle}>
              Manage registered customers and their details
            </p>
          </div>

          <button
            onClick={() => setShowForm(!showForm)}
            style={createButton}
          >
            {showForm ? "✕ Close" : "+ Add Customer"}
          </button>

        </div>

        {/* ================= ADD CUSTOMER FORM ================= */}

        {showForm && (
          <div style={formBox}>

            <h2 style={formTitle}>
              ➕ Create New Customer
            </h2>

            <div style={formRow}>

              {/* NAME */}

              <div style={fieldBox}>
                <label style={label}>
                  Customer Name
                </label>

                <input
                  type="text"
                  placeholder="Enter customer name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      name: e.target.value,
                    })
                  }
                  style={input}
                />
              </div>

              {/* EMAIL */}

              <div style={fieldBox}>
                <label style={label}>
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      email: e.target.value,
                    })
                  }
                  style={input}
                />
              </div>

              {/* PHONE */}

              <div style={fieldBox}>
                <label style={label}>
                  Phone Number
                </label>

                <input
                  type="text"
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      phone: e.target.value,
                    })
                  }
                  style={input}
                />
              </div>

            </div>

            <button
              onClick={addCustomer}
              style={submitButton}
            >
              ✓ Add Customer
            </button>

          </div>
        )}

        {/* ================= SUMMARY CARDS ================= */}

        <div style={summaryBox}>

          {/* TOTAL CUSTOMERS */}

          <div style={summaryCard}>
            <div style={summaryIcon}>
              👥
            </div>

            <div>
              <p style={summaryLabel}>
                Total Customers
              </p>

              <h2 style={summaryNumber}>
                {customers.length}
              </h2>
            </div>
          </div>

          {/* REGISTERED */}

          <div style={summaryCard}>
            <div style={summaryIcon}>
              ✓
            </div>

            <div>
              <p style={summaryLabel}>
                Registered
              </p>

              <h2 style={summaryNumber}>
                {customers.length}
              </h2>
            </div>
          </div>

          {/* RECORDS */}

          <div style={summaryCard}>
            <div style={summaryIcon}>
              📊
            </div>

            <div>
              <p style={summaryLabel}>
                Customer Records
              </p>

              <h2 style={summaryNumber}>
                {customers.length}
              </h2>
            </div>
          </div>

        </div>

        {/* ================= CUSTOMER RECORDS ================= */}

        <div style={tableContainer}>

          <h2 style={sectionTitle}>
            Customer Records
          </h2>

          {customers.length === 0 ? (

            <div style={empty}>

              <div style={{ fontSize: "45px" }}>
                👥
              </div>

              <h3>
                No Customers Found
              </h3>

              <p>
                Click "Add Customer" to register a new customer.
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
                    Customer
                  </th>

                  <th style={headerCell}>
                    Email
                  </th>

                  <th style={headerCell}>
                    Phone
                  </th>

                  <th style={headerCell}>
                    Status
                  </th>

                  <th style={headerCell}>
                    Action
                  </th>

                </tr>

              </thead>

              <tbody>

                {customers.map((customer) => (

                  <tr
                    key={customer.id}
                    style={row}
                  >

                    {/* ID */}

                    <td style={cell}>
                      <b>
                        {customer.id}
                      </b>
                    </td>

                    {/* CUSTOMER */}

                    <td style={cell}>
                      <div style={customerName}>
                        👤 {customer.name}
                      </div>
                    </td>

                    {/* EMAIL */}

                    <td style={cell}>
                      {customer.email}
                    </td>

                    {/* PHONE */}

                    <td style={cell}>
                      {customer.phone || "No phone"}
                    </td>

                    {/* STATUS */}

                    <td style={cell}>

                      <span style={statusBadge}>
                        ● Registered
                      </span>

                    </td>

                    {/* ACTION */}

                    <td style={cell}>

                      <button
                        style={viewButton}
                        onClick={() =>
                          alert(
                            `Customer ID: ${customer.id}\nName: ${customer.name}\nEmail: ${customer.email}`
                          )
                        }
                      >
                        View
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          )}

        </div>

      </div>

    </div>
  );
}


// =====================================================
// STYLES
// =====================================================

// BLUE BACKGROUND

const page = {
  padding: "30px",
  minHeight: "100vh",
  background:
    "linear-gradient(135deg, #dbeafe, #bfdbfe, #eff6ff)",
};


// WHITE MAIN CARD

const card = {
  background: "white",
  padding: "30px",
  borderRadius: "20px",
  boxShadow:
    "0 10px 30px rgba(30, 64, 175, 0.15)",
};


// HEADER

const header = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "25px",
};


const title = {
  margin: 0,
  color: "#1e293b",
  fontSize: "30px",
};


const subtitle = {
  color: "#64748b",
  marginTop: "8px",
};


// ADD CUSTOMER BUTTON

const createButton = {
  background:
    "linear-gradient(135deg, #2563eb, #1d4ed8)",
  color: "white",
  border: "none",
  padding: "12px 22px",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: "14px",
  boxShadow:
    "0 5px 15px rgba(37,99,235,0.25)",
};


// FORM

const formBox = {
  marginBottom: "30px",
  padding: "25px",
  background:
    "linear-gradient(135deg, #eff6ff, #dbeafe)",
  borderRadius: "15px",
  border: "1px solid #93c5fd",
};


const formTitle = {
  marginTop: 0,
  color: "#1e3a8a",
};


const formRow = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "15px",
};


const fieldBox = {
  display: "flex",
  flexDirection: "column",
};


const label = {
  marginBottom: "7px",
  color: "#334155",
  fontWeight: "600",
  fontSize: "14px",
};


const input = {
  padding: "12px",
  border: "1px solid #93c5fd",
  borderRadius: "8px",
  outline: "none",
  fontSize: "14px",
  background: "white",
  color: "#1e293b",
};


const submitButton = {
  marginTop: "20px",
  background:
    "linear-gradient(135deg, #16a34a, #15803d)",
  color: "white",
  border: "none",
  padding: "12px 22px",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold",
};


// SUMMARY

const summaryBox = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "20px",
  marginBottom: "30px",
};


const summaryCard = {
  padding: "20px",
  background:
    "linear-gradient(135deg, #eff6ff, #dbeafe)",
  border: "1px solid #93c5fd",
  borderRadius: "14px",
  display: "flex",
  alignItems: "center",
  gap: "15px",
  boxShadow:
    "0 4px 12px rgba(37,99,235,0.08)",
};


const summaryIcon = {
  fontSize: "30px",
};


const summaryLabel = {
  margin: 0,
  color: "#64748b",
  fontSize: "14px",
};


const summaryNumber = {
  margin: "5px 0 0",
  color: "#1e3a8a",
  fontSize: "28px",
};


// TABLE

const tableContainer = {
  marginTop: "10px",
};


const sectionTitle = {
  color: "#1e293b",
  marginBottom: "20px",
};


const table = {
  width: "100%",
  borderCollapse: "collapse",
  background: "white",
};


const tableHeader = {
  background:
    "linear-gradient(135deg, #1e3a8a, #2563eb)",
  color: "white",
};


const headerCell = {
  padding: "14px",
  textAlign: "center",
  color: "white",
  fontWeight: "700",
  fontSize: "14px",
};


const cell = {
  padding: "15px",
  textAlign: "center",
  color: "#334155",
  fontSize: "14px",
};


const row = {
  borderBottom: "1px solid #e2e8f0",
};


const customerName = {
  fontWeight: "bold",
  color: "#1e293b",
};


const statusBadge = {
  background: "#dcfce7",
  color: "#166534",
  padding: "6px 12px",
  borderRadius: "20px",
  fontWeight: "600",
  fontSize: "12px",
};


const viewButton = {
  background: "#2563eb",
  color: "white",
  border: "none",
  padding: "8px 15px",
  borderRadius: "7px",
  cursor: "pointer",
  fontWeight: "600",
};


const empty = {
  padding: "50px",
  textAlign: "center",
  color: "#64748b",
};


export default Customers;