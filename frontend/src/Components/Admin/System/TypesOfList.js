import React,{useState,useEffect} from "react";
import Footer from '../../staticComp/Footer';
import Nav from '../../staticComp/Nav';

function TypesOfList(params) {
    return(
        <div className="AdminHome">
            <div>{<Nav/>}</div>
            <div className="card-view-parent" >
                
            </div>
            <div>{<Footer/>}</div>
        </div>
    )
}
export default TypesOfList;