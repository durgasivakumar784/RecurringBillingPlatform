import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from "recharts";

import "./AdminDashboard.css";
import api from "../../services/api";


function AdminDashboard() {


  const navigate = useNavigate();


  const [summary, setSummary] = useState({
    customers: 0,
    plans: 0,
    subscriptions: 0,
    invoices: 0,
    payments: 0
  });


  const [revenue, setRevenue] = useState(0);


  const [paymentData, setPaymentData] = useState([]);

  const [invoiceData, setInvoiceData] = useState([]);


  const [subscription, setSubscription] = useState({
    active: 0,
    trial: 0,
    cancelled: 0
  });


  const [retryQueue, setRetryQueue] = useState([]);



  useEffect(() => {

    fetchDashboard();

  }, []);





  const fetchDashboard = async () => {


    try {


      // Summary

      const summaryRes =
        await api.get("/dashboard/summary");

      setSummary(summaryRes.data);




      // Revenue

      const revenueRes =
        await api.get("/dashboard/revenue");

      setRevenue(
        revenueRes.data.total_revenue || 0
      );





      // Payment Analytics

      const paymentRes =
        await api.get("/dashboard/payment-analytics");


      setPaymentData([

        {
          name: "Success",
          value: paymentRes.data.success || 0
        },

        {
          name: "Failed",
          value: paymentRes.data.failed || 0
        },

        {
          name: "Pending",
          value: paymentRes.data.pending || 0
        }

      ]);







      // Invoice Analytics

      const invoiceRes =
        await api.get("/dashboard/invoice-analytics");


      setInvoiceData([

        {
          name: "Paid",
          value: invoiceRes.data.paid || 0
        },

        {
          name: "Pending",
          value: invoiceRes.data.pending || 0
        },

        {
          name: "Failed",
          value: invoiceRes.data.failed || 0
        }

      ]);








      // Subscription Analytics

      const subRes =
        await api.get("/dashboard/subscription-analytics");


      setSubscription(subRes.data);








      // Retry Queue

      const retryRes =
        await api.get("/retry/");


      setRetryQueue(
        retryRes.data
      );



    }
    catch(error){

      console.log(
        "Dashboard Error:",
        error
      );

    }


  };





  return (

    <div className="admin-dashboard">



      <div className="dashboard-header">


        <div>

          <h1>
            📊 Admin Dashboard
          </h1>


          <p>
            Recurring Payment & Subscription Management Platform
          </p>


        </div>



        <button
          className="refresh-btn"
          onClick={fetchDashboard}
        >

          🔄 Refresh

        </button>


      </div>








      <div className="revenue-box">

        <h2>
          💰 Total Revenue
        </h2>


        <h1>
          ₹ {revenue}
        </h1>


      </div>








      <div className="stats-grid">



        <Card
          title="Customers"
          value={summary.customers}
          text="Registered Customers"
        />


        <Card
          title="Plans"
          value={summary.plans}
          text="Available Plans"
        />


        <Card
          title="Subscriptions"
          value={summary.subscriptions}
          text="Total Subscriptions"
        />


        <Card
          title="Invoices"
          value={summary.invoices}
          text="Generated Invoices"
        />


        <Card
          title="Payments"
          value={summary.payments}
          text="Payments Received"
        />



      </div>









      <div className="stats-grid">



        <Card
          title="Active"
          value={subscription.active}
          text="Active Subscriptions"
        />


        <Card
          title="Trial"
          value={subscription.trial}
          text="Trial Users"
        />


        <Card
          title="Cancelled"
          value={subscription.cancelled}
          text="Cancelled Plans"
        />



      </div>









      <div className="chart-grid">



        <div className="chart-card">


          <h3>
            💳 Payment Status
          </h3>



          <ResponsiveContainer
            width="100%"
            height={250}
          >


            <PieChart>


              <Pie
                data={paymentData}
                dataKey="value"
                nameKey="name"
                outerRadius={90}
                label
              >


                {
                  paymentData.map(
                    (item,index)=>(

                      <Cell key={index}/>

                    )
                  )
                }


              </Pie>


              <Tooltip/>


            </PieChart>


          </ResponsiveContainer>


        </div>








        <div className="chart-card">


          <h3>
            📄 Invoice Status
          </h3>



          <ResponsiveContainer
            width="100%"
            height={250}
          >


            <PieChart>


              <Pie
                data={invoiceData}
                dataKey="value"
                nameKey="name"
                outerRadius={90}
                label
              >


                {
                  invoiceData.map(
                    (item,index)=>(

                      <Cell key={index}/>

                    )
                  )
                }


              </Pie>


              <Tooltip/>


            </PieChart>


          </ResponsiveContainer>


        </div>



      </div>









      <div className="dashboard-row">





        <div className="activity-card">


          <h2>
            🔁 Failed Payment Retry Queue
          </h2>



          <table>


            <thead>

              <tr>

                <th>
                  Payment ID
                </th>

                <th>
                  Retry
                </th>

                <th>
                  Status
                </th>


              </tr>

            </thead>




            <tbody>


              {
                retryQueue.length === 0 ?

                (

                  <tr>

                    <td colSpan="3">
                      No Failed Payments
                    </td>

                  </tr>

                )

                :

                retryQueue.map(
                  item=>(

                    <tr key={item.id}>

                      <td>
                        {item.payment_id}
                      </td>


                      <td>
                        {item.retry_count}/{item.max_retries}
                      </td>


                      <td>
                        {item.status}
                      </td>


                    </tr>

                  )
                )

              }



            </tbody>


          </table>



        </div>










        <div className="quick-card">


          <h2>
            ⚡ Quick Actions
          </h2>



          <button onClick={()=>navigate("/customers")}>
            Add Customer
          </button>


          <button onClick={()=>navigate("/plans")}>
            Create Plan
          </button>


          <button onClick={()=>navigate("/subscriptions")}>
            Create Subscription
          </button>


          <button onClick={()=>navigate("/invoices")}>
            Generate Invoice
          </button>


          <button onClick={()=>navigate("/payments")}>
            Process Payment
          </button>


          <button onClick={()=>navigate("/audit")}>
            View Audit Logs
          </button>



        </div>



      </div>



    </div>


  );

}


// Reusable Card Component

function Card({title,value,text}){


  return (

    <div className="stat-card">

      <h3>
        {title}
      </h3>


      <h1>
        {value}
      </h1>


      <p>
        {text}
      </p>


    </div>

  );


}



export default AdminDashboard;