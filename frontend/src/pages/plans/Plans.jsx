import { useEffect, useState } from "react";
import api from "../../services/api";


function Plans() {

  const [plans,setPlans] = useState([]);

  const [name,setName] = useState("");
  const [price,setPrice] = useState("");
  const [billingCycle,setBillingCycle] = useState("monthly");


  useEffect(()=>{

    fetchPlans();

  },[]);



  const fetchPlans = async()=>{

    try{

      const response = await api.get("/plans/");

      setPlans(response.data);

    }
    catch(error){

      console.log(error);

    }

  };



  const addPlan = async(e)=>{

    e.preventDefault();

    try{

      await api.post(
        `/plans/?name=${name}&price=${price}&billing_cycle=${billingCycle}`
      );


      setName("");
      setPrice("");

      fetchPlans();

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
        Plans
      </h1>



      {/* Add Plan Box */}

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
          Add New Plan
        </h2>


        <form onSubmit={addPlan}>


          <input
            placeholder="Plan Name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            style={inputStyle}
          />


          <input
            placeholder="Price"
            value={price}
            onChange={(e)=>setPrice(e.target.value)}
            style={inputStyle}
          />


          <select
            value={billingCycle}
            onChange={(e)=>setBillingCycle(e.target.value)}
            style={inputStyle}
          >

            <option value="monthly">
              Monthly
            </option>

            <option value="yearly">
              Yearly
            </option>

          </select>



          <button
            style={buttonStyle}
          >
            Add Plan
          </button>


        </form>


      </div>




      {/* Plans Cards */}


      <div
        style={{
          display:"grid",
          gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",
          gap:"20px",
          marginTop:"30px"
        }}
      >


      {
        plans.map((plan)=>(


          <div
            key={plan.id}
            style={{
              background:"white",
              padding:"25px",
              borderRadius:"15px",
              boxShadow:"0 5px 15px rgba(0,0,0,0.1)"
            }}
          >

            <h2>
              {plan.name}
            </h2>


            <h1>
              ₹ {plan.price}
            </h1>


            <p>
              Billing: {plan.billing_cycle}
            </p>


            <p>
              Status:
              {
                plan.is_active
                ? " Active"
                : " Inactive"
              }
            </p>


          </div>


        ))
      }


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


export default Plans;