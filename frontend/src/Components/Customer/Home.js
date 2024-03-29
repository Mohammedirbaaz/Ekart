import React from "react";
import CardView from '../staticComp/CardView';
import Footer from '../staticComp/Footer';
import Nav from '../staticComp/Nav';
import { useNavigate } from "react-router-dom";
import '../../Styles/AdminHome.css'

function CustomerHome(params) {
    
    return(
        <div className="AdminHome">
            <div>{<Nav first={"home"} second={"orders"} third={"carts"} usertype={"customer"}/>}</div>
            <div className="card-view-parent" >
                <CardView name={'product'} links={'customer/product'}/>
                <CardView name={'orders'} links={'customer/orders'}/>
                <CardView name={'carts'} links={'customer/carts'}/>
            </div>
            <div>{<Footer/>}</div>
        </div>
    )
}
export default CustomerHome;