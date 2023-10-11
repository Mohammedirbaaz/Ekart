import React, { useState,useEffect } from "react";
import '../../Styles/Nav.css'
import { useNavigate } from "react-router-dom";
import axios from 'axios'


function Nav(props) {
        
    var navigate=useNavigate();
    function logout()
    {
        axios.get('http://localhost:5000/logout',{withCredentials:true}).then((res)=>{
            window.location="/login";
        }).catch((err)=>{console.log(err)});
    }
    return(
        <div className="Nav-div">
           <div className="navlogo">Logo</div>
           <div className="navtype">
                <a href={"/"+props.usertype+"/"+props.first}>{props.first}</a>
                <a href={"/"+props.usertype+"/"+props.second}>{props.second}</a>
                <a href={"/"+props.usertype+"/"+props.third}>{props.third}</a>
                <a href={"/"+props.usertype+"/"+props.fourth}>{props.fourth}</a>
           </div>
           <div onClick={()=>{logout()}}>Logout</div>
        </div>
    )
}
  
  
export default Nav;