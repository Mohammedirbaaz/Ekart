import React from "react";
import CardView from '../staticComp/CardView';
import Footer from '../staticComp/Footer';
import Nav from '../staticComp/Nav';
import { useNavigate } from "react-router-dom";
import '../../Styles/AdminHome.css'

function SellerHome(params) {
    
    return(
        <div className="AdminHome">
            <div>{<Nav first={"Home"} second={"My Product"} third={"Monitization"} fourth={"Statistics"} usertype={"seller"}/>}</div>
            <div className="card-view-parent" >
                <CardView name={'My Product'} links={'seller/MyProduct'}/>
                <CardView name={'Monitization'} links={'seller/Monitization'}/>
                <CardView name={'Statistics'} links={'seller/Statistics'}/>
            </div>
            <div>{<Footer/>}</div>
        </div>
    )
}
export default SellerHome;