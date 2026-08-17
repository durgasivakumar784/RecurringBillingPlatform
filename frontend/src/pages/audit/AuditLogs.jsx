import { useEffect, useState } from "react";
import api from "../../services/api";

function AuditLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLogs();
  }, []);

  const loadLogs = async () => {
    try {
      const response = await api.get("/audit-logs/");
      console.log("Audit Logs:", response.data);
      setLogs(response.data);
    } catch (error) {
      console.error("Failed to load audit logs:", error);
    } finally {
      setLoading(false);
    }
  };

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
          }}
        >
          Audit Logs
        </h1>

        <p
          style={{
            color: "#9fb1cc",
            marginTop: "10px",
          }}
        >
          Track system activities and user actions
        </p>
      </div>

      {/* Audit Details */}

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
            marginBottom: "20px",
          }}
        >
          Audit Log Details
        </h2>

        {loading ? (
          <div
            style={{
              textAlign: "center",
              padding: "50px",
              color: "#9fb1cc",
            }}
          >
            Loading audit logs...
          </div>
        ) : logs.length === 0 ? (
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
              📋
            </div>

            <h3 style={{ color: "white" }}>
              No Audit Logs Found
            </h3>

            <p>System activities will appear here.</p>
          </div>
        ) : (
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr>
                <th style={head}>ID</th>
                <th style={head}>Entity</th>
                <th style={head}>Action</th>
                <th style={head}>Description</th>
                <th style={head}>Date</th>
              </tr>
            </thead>

            <tbody>
              {logs.map((log) => (
                <tr key={log.id}>
                  <td style={cell}>
                    {log.id}
                  </td>

                  <td style={cell}>
                    <span
                      style={{
                        color: "#e2e8f0",
                        fontWeight: "600",
                      }}
                    >
                      {log.entity}
                    </span>
                  </td>

                  <td style={cell}>
                    <span
                      style={{
                        background: "#173f72",
                        color: "#60a5fa",
                        padding: "6px 14px",
                        borderRadius: "20px",
                        fontSize: "13px",
                        fontWeight: "600",
                      }}
                    >
                      {log.action}
                    </span>
                  </td>

                  <td style={cell}>
                    {log.description}
                  </td>

                  <td style={cell}>
                    {log.created_at
                      ? new Date(log.created_at).toLocaleString()
                      : "-"}
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

const head = {
  padding: "15px",
  textAlign: "left",
  background: "#092143",
  color: "#9fb1cc",
  borderBottom: "1px solid #193d6d",
};

const cell = {
  padding: "15px",
  borderBottom: "1px solid #193d6d",
  color: "#cbd5e1",
};

export default AuditLogs;