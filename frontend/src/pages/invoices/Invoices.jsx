import { useEffect, useState } from "react";
import api from "../../services/api";


function Invoices() {

  const [invoices, setInvoices] = useState([]);


  useEffect(() => {
    fetchInvoices();
  }, []);



  const fetchInvoices = async()=>{

    try {

      const response = await api.get("/invoices/");
      setInvoices(response.data);

    } catch(error){

      console.log(error);

    }

  };



  return (

    <div style={{
      padding:"30px",
      background:"#f8fafc",
      minHeight:"100vh"
    }}>


      <div style={{
        background:"white",
        padding:"25px",
        borderRadius:"15px",
        boxShadow:"0 4px 15px rgba(0,0,0,0.1)"
      }}>


        <h1>
          Invoices
        </h1>


        <p style={{
          color:"#64748b"
        }}>
          Manage generated invoices and payment status
        </p>



        <button style={{
          background:"#2563eb",
          color:"white",
          border:"none",
          padding:"12px 20px",
          borderRadius:"8px",
          marginBottom:"20px",
          cursor:"pointer"
        }}>
          + Generate Invoice
        </button>



        <table style={{
          width:"100%",
          borderCollapse:"collapse"
        }}>


          <thead>

            <tr style={{
              background:"#1e293b",
              color:"white"
            }}>


              <th style={cell}>
                ID
              </th>


              <th style={cell}>
                Subscription ID
              </th>


              <th style={cell}>
                Amount
              </th>


              <th style={cell}>
                Status
              </th>


              <th style={cell}>
                Created Date
              </th>


            </tr>

          </thead>



          <tbody>


          {
            invoices.map((invoice)=>(

              <tr key={invoice.id}
                style={{
                  borderBottom:"1px solid #e2e8f0"
                }}
              >


                <td style={cell}>
                  {invoice.id}
                </td>


                <td style={cell}>
                  {invoice.subscription_id}
                </td>


                <td style={cell}>
                  ₹ {invoice.amount}
                </td>



                <td style={cell}>

                  <span style={{
                    background:
                    invoice.status==="paid"
                    ? "#dcfce7"
                    : "#fee2e2",

                    color:
                    invoice.status==="paid"
                    ? "#166534"
                    : "#991b1b",

                    padding:"6px 14px",
                    borderRadius:"20px",
                    fontWeight:"bold"
                  }}>

                    {invoice.status}

                  </span>

                </td>



                <td style={cell}>
                  {invoice.created_at}
                </td>


              </tr>

            ))
          }


          </tbody>


        </table>


      </div>


    </div>

  );

}



const cell = {

  padding:"14px",
  textAlign:"center"

};


export default Invoices;