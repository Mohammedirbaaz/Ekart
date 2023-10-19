import React,{useEffect,useState} from "react";
// import CardView from '../staticComp/CardView';
import Footer from '../../staticComp/Footer';
import Nav from '../../staticComp/Nav';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../../../Styles/CustomerList.css'

// import '../../Styles/AdminHome.css'

function AdminSeller(params) {
    const [data,setdata]=useState([{}]);
    useEffect(() => {
      axios.get("http://localhost:5000/admin/sellerdetails").then(res=>{
        setdata(res.data);
        console.log(res.data)
      }).catch(err=>{console.log(err)});
    }, []);

    function arrowclicked(id)
    {
        var user=document.getElementById(id);
        (user.children[0].children[0].src=="https://img.icons8.com/material-outlined/24/expand-arrow--v1.png") 
        ? user.children[0].children[0].src="https://img.icons8.com/material-rounded/24/000000/forward.png" 
        : user.children[0].children[0].src="https://img.icons8.com/material-outlined/24/expand-arrow--v1.png";

        (document.getElementById("detailed"+id).style.display=="block")? document.getElementById("detailed"+id).style.display="none" : document.getElementById("detailed"+id).style.display="block";

    }
     
    return(
        <div className="AdminCustomerListHome">
            <div>{<Nav/>}</div>
            <div className="card-view-parent1" >
                {data.map((user)=>
                    <div className="item-cust" key={user._id} id={user._id} onClick={()=>arrowclicked(user._id)}>
                        
                        <div>
                            <img width="24" height="24" id="arrow" src="https://img.icons8.com/material-rounded/24/000000/forward.png" alt="forward"/>
                        </div>
                        <div>
                            <div>
                                <p className="item-each">{user.name}</p>
                                <p className="item-each">{user.phno}</p>
                            </div>
                            <div className="detailed" id={"detailed"+user._id}>
                                <table className="table">
                                    <tr>
                                        <td>Name</td>
                                        <td>{user.name}</td>
                                    </tr>
                                    <tr>
                                        <td>Phno</td>
                                        <td>{user.phno}</td>
                                    </tr>
                                    <tr>
                                        <td>Username</td>
                                        <td>{user.username}</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className='each-footer' >{<Footer/>}</div>
        </div>
    )
}
export default AdminSeller;