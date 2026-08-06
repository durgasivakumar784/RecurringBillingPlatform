import { useEffect, useState } from "react";
import api from "../../services/api";


function AuditLogs(){

    const [logs,setLogs] = useState([]);


    useEffect(()=>{

        loadLogs();

    },[]);



    const loadLogs = async()=>{

        try{

            const response = await api.get("/audit-logs/");
            setLogs(response.data);

        }
        catch(error){

            console.log(error);

        }

    }



    return(

        <div style={{
            padding:"30px",
            background:"#f8fafc",
            minHeight:"100vh"
        }}>


            {/* Header Box */}

            <div style={{
                background:"white",
                padding:"25px",
                borderRadius:"15px",
                marginBottom:"25px",
                boxShadow:"0 5px 15px rgba(0,0,0,0.08)"
            }}>

                <h1 style={{
                    margin:0,
                    color:"#1e293b"
                }}>
                    Audit Logs
                </h1>


                <p style={{
                    color:"#64748b",
                    marginTop:"10px"
                }}>
                    Track system activities and user actions
                </p>


            </div>



            {/* Table Box */}

            <div style={{
                background:"white",
                padding:"25px",
                borderRadius:"15px",
                boxShadow:"0 5px 20px rgba(0,0,0,0.1)"
            }}>


                <h2 style={{
                    color:"#334155",
                    marginBottom:"20px"
                }}>
                    Audit Log Details
                </h2>



                <table style={{
                    width:"100%",
                    borderCollapse:"collapse"
                }}>


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


                {
                    logs.map((log)=>(

                        <tr key={log.id}>

                            <td style={cell}>
                                {log.id}
                            </td>


                            <td style={cell}>
                                <b>{log.entity}</b>
                            </td>


                            <td style={cell}>

                                <span style={{
                                    background:"#dbeafe",
                                    color:"#1d4ed8",
                                    padding:"6px 14px",
                                    borderRadius:"20px",
                                    fontSize:"13px",
                                    fontWeight:"600"
                                }}>
                                    {log.action}
                                </span>

                            </td>


                            <td style={cell}>
                                {log.description}
                            </td>


                            <td style={cell}>
                                {log.created_at}
                            </td>


                        </tr>

                    ))
                }


                </tbody>


                </table>


            </div>


        </div>

    )

}



const head={

    padding:"15px",
    textAlign:"left",
    background:"#f1f5f9",
    color:"#334155"

};


const cell={

    padding:"15px",
    borderBottom:"1px solid #e2e8f0",
    color:"#475569"

};



export default AuditLogs;