import React from "react";
// import CardView from '../staticComp/CardView';
import Footer from '../../staticComp/Footer';
import Nav from '../../staticComp/Nav';
import { useNavigate } from "react-router-dom";
// import '../../Styles/AdminHome.css'

function AdminCustomer(params) {
    
    return(
        <div className="AdminHome">
            <div>{<Nav/>}</div>
            <div className="card-view-parent" >
                
            </div>
            <div>{<Footer/>}</div>
        </div>
    )
}
export default AdminCustomer;