import React,{useState,useEffect} from "react";
import Footer from '../../staticComp/Footer';
import Nav from '../../staticComp/Nav';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import CardView from "../../staticComp/CardView";
import '../../../Styles/SystemHome.css'

function AdminSystem(params) {
    var navigate=useNavigate();
    const [data, setdata] = useState([{}]);
    const [newtype,setnewtype]=useState("");
    useEffect(() => {
        axios.get('http://localhost:5000/admin/getdetails')
        .then(ress=>{setdata(ress.data);console.log(ress.data)})
        .catch(err=>console.log(err));
    },[]);

    function addtype()
    {
        var divs=document.getElementById("addtypeid");
        divs.style.display=(divs.style.display=="flex")? "none":"flex";
    }

    function finaladdtype(){
        var inputs=document.getElementById("newtypename");
        if(inputs.value=="" || inputs.value==" ")
        {
            alert("please fill up the inputs :)")
        }else{
            var obj={
                CategoryName:newtype,
                CategoryImageLink:"xyzxyzxyz"
            }
            console.log(obj);
            axios.post('http://localhost:5000/admin/create',obj).then(res=>{
                addtype();
                window.location.href=window.location.href;
            }).catch(err=>alert(err));
            
        }
    }
    
    return(
        <div className="AdminHome">
            <div>{<Nav/>}</div>
            <div className="addtypes" id="addtypeid">
                <input className="inps" id="newtypename" type="text" placeholder={"New Type name"} onChange={(e)=>setnewtype(e.target.value)}/>
                <input className="inps" type="file" accept="image/*" placeholder="upload image"/>
                <div className="inps">
                    <button className="inps2" id="cancelbtn" onClick={()=>{addtype()}}>Cancel</button>
                    <button className="inps2" id="addbtn" onClick={()=>{finaladdtype()}}>Add</button>
                </div>

            </div>
            <div className="typecat">
                {data.map((types,index)=>
                    <CardView id={types._id} name={types.CategoryName} links={'/types/'+index} />
                )}
            </div>
            <div className="plus" onClick={()=>addtype()}>+</div>
            <div>{<Footer/>}</div>
        </div>
    )
}
export default AdminSystem;