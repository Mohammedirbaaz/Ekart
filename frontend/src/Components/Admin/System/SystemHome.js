import React,{useState,useEffect} from "react";
import Footer from '../../staticComp/Footer';
import Nav from '../../staticComp/Nav';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import CardView from "../../staticComp/CardView";

function AdminSystem(params) {
    const [data, setdata] = useState([{}])
    useEffect(() => {
        axios.get('http://localhost:5000/admin/getdetails')
        .then(ress=>{setdata(ress.data);console.log(ress.data)})
        .catch(err=>console.log(err));
    },[]);
    
    return(
        <div className="AdminHome">
            <div>{<Nav/>}</div>
            <div className="card-view-parent" >
                <CardView name={data[0].CategoryName} links={'/admin/system/'+data[0].CategoryName}/>
            </div>
            <div>{<Footer/>}</div>
        </div>
    )
}
export default AdminSystem;