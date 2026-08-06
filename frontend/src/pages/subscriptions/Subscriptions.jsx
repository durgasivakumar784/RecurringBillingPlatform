import { useEffect, useState } from "react";
import api from "../../services/api";


function Subscriptions() {


  const [subscriptions,setSubscriptions] = useState([]);

  const [showForm,setShowForm] = useState(false);


  const [formData,setFormData] = useState({

    customer_id:"",
    plan_id:""

  });



  useEffect(()=>{

    fetchSubscriptions();

  },[]);




  const fetchSubscriptions = async()=>{

    try{

      const response = await api.get("/subscriptions/");

      setSubscriptions(response.data);


    }catch(error){

      console.log(error);

    }

  };





  const createSubscription = async()=>{


    try{


      await api.post("/subscriptions/",{

        customer_id:Number(formData.customer_id),

        plan_id:Number(formData.plan_id)

      });



      alert("Subscription Created Successfully");


      setFormData({

        customer_id:"",
        plan_id:""

      });



      setShowForm(false);


      fetchSubscriptions();



    }catch(error){


      console.log(error);

      alert("Subscription Creation Failed");


    }


  };






  const cancelSubscription = async(id)=>{


    try{


      await api.put(`/subscriptions/${id}/status`,{

        status:"cancelled"

      });



      alert("Subscription Cancelled");


      fetchSubscriptions();



    }catch(error){


      console.log(error);


    }


  };






  const statusStyle=(status)=>{


    if(status?.toLowerCase()==="active"){

      return {

        background:"#dcfce7",
        color:"#166534"

      };

    }



    if(status?.toLowerCase()==="trial"){

      return {

        background:"#dbeafe",
        color:"#1e40af"

      };

    }




    if(status?.toLowerCase()==="past_due"){

      return {

        background:"#fef3c7",
        color:"#92400e"

      };

    }




    return {

      background:"#fee2e2",
      color:"#991b1b"

    };


  };






  const formatDate=(date)=>{


    if(!date)

      return "-";



    return new Date(date).toLocaleDateString(

      "en-GB",

      {

        day:"2-digit",

        month:"short",

        year:"numeric"

      }

    );


  };






return (

<div style={page}>


<div style={card}>


<div style={header}>


<div>


<h1 style={{margin:0}}>

📄 Subscriptions

</h1>



<p style={{color:"#64748b"}}>

Manage customer subscription lifecycle

</p>


</div>




<button

style={createButton}

onClick={()=>setShowForm(!showForm)}

>

+ Create Subscription

</button>



</div>





{

showForm &&


<div style={formBox}>


<h3>Create Subscription</h3>



<input

style={input}

type="number"

placeholder="Customer ID"

value={formData.customer_id}

onChange={(e)=>

setFormData({

...formData,

customer_id:e.target.value

})

}

/>




<input

style={input}

type="number"

placeholder="Plan ID"

value={formData.plan_id}

onChange={(e)=>

setFormData({

...formData,

plan_id:e.target.value

})

}

/>




<button

style={submitButton}

onClick={createSubscription}

>

Create

</button>



</div>


}







<table style={table}>


<thead>


<tr style={tableHeader}>


<th style={headerCell}>ID</th>

<th style={headerCell}>Customer</th>

<th style={headerCell}>Plan</th>

<th style={headerCell}>Status</th>

<th style={headerCell}>Start Date</th>

<th style={headerCell}>Action</th>



</tr>


</thead>






<tbody>


{

subscriptions.length===0 ?


<tr>

<td colSpan="6" style={empty}>

No Subscriptions Found

</td>

</tr>


:


subscriptions.map((sub)=>(



<tr key={sub.id} style={row}>


<td style={cell}>

{sub.id}

</td>




<td style={cell}>

{sub.customer?.name || sub.customer_id}

</td>




<td style={cell}>

{sub.plan?.name || sub.plan_id}

</td>





<td style={cell}>


<span

style={{

...statusStyle(sub.status),

padding:"6px 15px",

borderRadius:"20px",

fontWeight:"600"

}}

>


{sub.status}


</span>



</td>





<td style={cell}>

{formatDate(sub.start_date)}

</td>





<td style={cell}>


<button

style={viewButton}

>

View

</button>



{

sub.status!=="cancelled" &&

<button

style={cancelButton}

onClick={()=>cancelSubscription(sub.id)}

>

Cancel

</button>

}


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




// ---------- Styles ----------


const page={

padding:"30px",

background:"#f8fafc",

minHeight:"100vh"

};



const card={

background:"white",

padding:"30px",

borderRadius:"18px",

boxShadow:"0 8px 25px rgba(0,0,0,0.08)"

};



const header={

display:"flex",

justifyContent:"space-between",

alignItems:"center"

};



const createButton={

background:"#2563eb",

color:"white",

border:"none",

padding:"12px 22px",

borderRadius:"10px",

cursor:"pointer"

};



const formBox={

marginTop:"25px",

padding:"20px",

background:"#f1f5f9",

borderRadius:"12px"

};



const input={

padding:"12px",

marginRight:"10px",

border:"1px solid #cbd5e1",

borderRadius:"8px"

};



const submitButton={

background:"#16a34a",

color:"white",

border:"none",

padding:"12px 20px",

borderRadius:"8px",

cursor:"pointer"

};




const table={

width:"100%",

marginTop:"30px",

borderCollapse:"collapse",

background:"white"

};



const tableHeader={

background:"#1e293b",

color:"white"

};



const headerCell={

padding:"14px",

textAlign:"center",

color:"#ffffff",

fontWeight:"700",

fontSize:"15px",

background:"#1e293b"

};




const cell={

padding:"14px",

textAlign:"center",

color:"#1e293b"

};




const row={

borderBottom:"1px solid #e2e8f0"

};




const viewButton={

background:"#2563eb",

color:"white",

border:"none",

padding:"8px 14px",

borderRadius:"6px",

marginRight:"8px",

cursor:"pointer"

};




const cancelButton={

background:"#ef4444",

color:"white",

border:"none",

padding:"8px 14px",

borderRadius:"6px",

cursor:"pointer"

};




const empty={

padding:"20px",

textAlign:"center",

color:"#64748b"

};



export default Subscriptions;