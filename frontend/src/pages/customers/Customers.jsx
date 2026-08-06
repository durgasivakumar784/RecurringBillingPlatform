import { useEffect, useState } from "react";
import api from "../../services/api";


function Customers() {

  const [customers,setCustomers] = useState([]);

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");



  useEffect(()=>{

    fetchCustomers();

  },[]);



  const fetchCustomers = async()=>{

    try{

      const response = await api.get("/customers/");

      setCustomers(response.data);

    }
    catch(error){

      console.log(error);

    }

  };



  const addCustomer = async(e)=>{

    e.preventDefault();


    try{


      await api.post("/customers/",{

        name:name,
        email:email

      });


      setName("");
      setEmail("");

      fetchCustomers();


    }
    catch(error){

      console.log(error);

    }

  };



  return (

    <div
      style={{
        padding:"30px"
      }}
    >


      <h1>
        Customers
      </h1>



      {/* Add Customer */}


      <div
        style={{
          background:"white",
          padding:"25px",
          borderRadius:"15px",
          boxShadow:"0 5px 15px rgba(0,0,0,0.1)",
          marginTop:"20px"
        }}
      >


        <h2>
          Add Customer
        </h2>


        <form onSubmit={addCustomer}>


          <input

            placeholder="Customer Name"

            value={name}

            onChange={(e)=>setName(e.target.value)}

            style={inputStyle}

          />



          <input

            placeholder="Email"

            value={email}

            onChange={(e)=>setEmail(e.target.value)}

            style={inputStyle}

          />



          <button
            style={buttonStyle}
          >

            Add Customer

          </button>


        </form>


      </div>





      {/* Customer List */}



      <div

        style={{

          background:"white",

          marginTop:"30px",

          padding:"25px",

          borderRadius:"15px",

          boxShadow:"0 5px 15px rgba(0,0,0,0.1)"

        }}

      >


        <h2>
          Customer List
        </h2>



        <table
          style={{
            width:"100%",
            borderCollapse:"collapse"
          }}
        >


          <thead>

            <tr>

              <th style={thStyle}>
                ID
              </th>

              <th style={thStyle}>
                Name
              </th>

              <th style={thStyle}>
                Email
              </th>

            </tr>

          </thead>



          <tbody>


          {
            customers.map((customer)=>(

              <tr key={customer.id}>

                <td style={tdStyle}>
                  {customer.id}
                </td>


                <td style={tdStyle}>
                  {customer.name}
                </td>


                <td style={tdStyle}>
                  {customer.email}
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



const inputStyle={

  padding:"12px",
  margin:"8px",
  borderRadius:"8px",
  border:"1px solid #cbd5e1",
  fontSize:"15px"

};



const buttonStyle={

  padding:"12px 25px",
  background:"#2563eb",
  color:"white",
  border:"none",
  borderRadius:"8px",
  cursor:"pointer"

};



const thStyle={

  padding:"12px",
  background:"#f1f5f9",
  textAlign:"left"

};



const tdStyle={

  padding:"12px",
  borderBottom:"1px solid #e2e8f0"

};



export default Customers;