import { useEffect, useState } from "react";
import api from "../../services/api";


function Refunds() {

  const [refunds, setRefunds] = useState([]);


  useEffect(() => {

    fetchRefunds();

  }, []);



  const fetchRefunds = async () => {

    try {

      const response = await api.get("/refunds/");
      setRefunds(response.data);

    } catch (error) {

      console.log(error);

    }

  };



  return (

    <div style={{
      padding: "30px",
      background: "#f8fafc",
      minHeight: "100vh"
    }}>


      <h1 style={{
        marginBottom: "10px"
      }}>
        Refunds
      </h1>


      <p style={{
        color: "#64748b",
        marginBottom: "25px"
      }}>
        Manage refund transactions and status
      </p>



      <div style={{

        background: "white",

        padding: "25px",

        borderRadius: "15px",

        boxShadow: "0 5px 15px rgba(0,0,0,0.1)"

      }}>


        <h2 style={{
          marginBottom: "20px"
        }}>
          Refund History
        </h2>



        <table style={{

          width: "100%",

          borderCollapse: "collapse"

        }}>


          <thead>

            <tr style={{
              background: "#f1f5f9"
            }}>

              <th style={cellStyle}>ID</th>

              <th style={cellStyle}>Invoice ID</th>

              <th style={cellStyle}>Amount</th>

              <th style={cellStyle}>Reason</th>

              <th style={cellStyle}>Status</th>

            </tr>

          </thead>



          <tbody>


            {
              refunds.map((refund)=>(

                <tr key={refund.id}>

                  <td style={cellStyle}>
                    {refund.id}
                  </td>


                  <td style={cellStyle}>
                    {refund.invoice_id}
                  </td>


                  <td style={cellStyle}>
                    ₹ {refund.amount}
                  </td>


                  <td style={cellStyle}>
                    {refund.reason}
                  </td>


                  <td style={cellStyle}>

                    <span style={{

                      background:"#dcfce7",

                      color:"#166534",

                      padding:"6px 14px",

                      borderRadius:"20px",

                      fontSize:"14px"

                    }}>

                      {refund.status}

                    </span>


                  </td>


                </tr>

              ))
            }


          </tbody>


        </table>



        {
          refunds.length === 0 && (

            <p style={{
              textAlign:"center",
              padding:"20px",
              color:"#64748b"
            }}>
              No refund records found
            </p>

          )
        }



      </div>


    </div>

  );

}



const cellStyle = {

  padding:"12px",

  borderBottom:"1px solid #e2e8f0",

  textAlign:"left"

};


export default Refunds;