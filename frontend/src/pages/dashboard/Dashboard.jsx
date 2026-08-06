import { useEffect, useState } from "react";
import api from "../../services/api";

function Dashboard() {
  const [summary, setSummary] = useState({
    customers: 0,
    plans: 0,
    subscriptions: 0,
    invoices: 0,
    payments: 0,
  });

  useEffect(() => {
    fetchSummary();
  }, []);

  const fetchSummary = async () => {
    try {
      const response = await api.get("/dashboard/summary");
      setSummary(response.data);
    } catch (error) {
      console.error("Dashboard API Error:", error);
    }
  };

  const cards = [
    { title: "Customers", value: summary.customers },
    { title: "Plans", value: summary.plans },
    { title: "Subscriptions", value: summary.subscriptions },
    { title: "Invoices", value: summary.invoices },
    { title: "Payments", value: summary.payments },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white shadow rounded-xl p-6"
          >
            <h2 className="text-gray-500">
              {card.title}
            </h2>

            <p className="text-3xl font-bold mt-3">
              {card.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;