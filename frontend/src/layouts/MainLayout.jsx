import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";


function MainLayout(){

  return(
    <div style={{display:"flex"}}>

      <Sidebar />

      <div style={{padding:"20px", flex:1}}>
        <Outlet />
      </div>

    </div>
  )

}

export default MainLayout;