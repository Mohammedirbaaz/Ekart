import React from "react";
import CardView from '../staticComp/CardView';
import Footer from '../staticComp/Footer';
import Nav from '../staticComp/Nav';
import { useNavigate } from "react-router-dom";
import '../../Styles/AdminHome.css'

function AdminHome(props) {
    
    return(
        <div className="AdminHome">
            <div>{<Nav first={"customer"} second={"System"} third={"Seller"} usertype={"admin"}/>}</div>
            <div className="card-view-parent" >
                <CardView name={'customer'} links={'admin/customer'}/>
                <CardView name={'System'} links={'admin/system'}/>
                <CardView name={'Sellers'} links={'admin/seller'}/>
            </div>
            <div>{<Footer/>}</div>
        </div>
    )
}
export default AdminHome;