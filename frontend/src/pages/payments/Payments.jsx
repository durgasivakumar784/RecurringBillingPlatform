import { useEffect, useState } from "react";
import api from "../../services/api";


function Payments() {

  const [payments, setPayments] = useState([]);


  useEffect(() => {
    fetchPayments();
  }, []);



  const fetchPayments = async()=>{

    try{

      const response = await api.get("/payments/");

      setPayments(response.data);

    }
    catch(error){

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
          Payments
        </h1>


        <p style={{
          color:"#64748b"
        }}>
          Monitor payment transactions and status
        </p>



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
                Invoice ID
              </th>


              <th style={cell}>
                Payment Status
              </th>


              <th style={cell}>
                Payment Date
              </th>


            </tr>


          </thead>



          <tbody>


          {
            payments.map((payment)=>(

              <tr key={payment.id}
              style={{
                borderBottom:"1px solid #e2e8f0"
              }}>


                <td style={cell}>
                  {payment.id}
                </td>


                <td style={cell}>
                  {payment.invoice_id}
                </td>



                <td style={cell}>

                  <span style={{

                    background:
                    payment.payment_status === "paid"
                    ? "#dcfce7"
                    : "#fee2e2",

                    color:
                    payment.payment_status === "paid"
                    ? "#166534"
                    : "#991b1b",

                    padding:"6px 14px",
                    borderRadius:"20px",
                    fontWeight:"bold"

                  }}>

                    {payment.payment_status}

                  </span>

                </td>



                <td style={cell}>
                  {payment.created_at}
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


export default Payments;