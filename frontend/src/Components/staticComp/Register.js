import React,{ useState,useEffect } from 'react';
import axios from 'axios';
import '../../Styles/Register.css';

function Register()
{
    const [name,setName]=useState("");
    const [username,setUserName]=useState("");
    const [phno,setPhno]=useState("");
    const [password,setPassword]=useState("");
    const [CompanyName, setCompanyName] = useState("")
    const [CompanyAddress, setCompanyAddress] = useState("")
    const [usertype, setUsertype] = useState("")

    useEffect(() => {
      if(usertype!=""){
        document.getElementById("orig").style.display="block";
        document.getElementById("orig-new").style.display="none";
      }
    },[usertype])
    

    function submit()
    {
        if(username=="" || password=="" || name=="" || phno=="")
        {
            alert("please fill all the following");
            return;
        }
        const obj={
            name: name,
            username:username,
            phno:phno,
            password:password,
            companyName:CompanyName,
            companyAddress:CompanyAddress,
            usertype:usertype
        }
        const obj1={
            name: name,
            username:username,
            phno:phno,
            password:password,
            usertype:usertype
        }
        var ob=(usertype=="seller") ? obj : obj1;
        axios.post("http://localhost:5000/register",ob).then(res=>{
            alert(res.data);
            setName("");
            setUserName("");
            setPhno("");
            setPassword("");
            setCompanyAddress("");
            setCompanyName("");
            setUsertype("");

            document.getElementById("name").value="";
            document.getElementById("username").value="";
            document.getElementById("phno").value="";
            document.getElementById("password").value="";
            document.getElementById("companyaddress").value="";
            document.getElementById("companyname").value="";
    
        }).catch(err=>{
            console.log(err);
        });
    }
    
    return(
            <div>
            <div className="register-bg-card-new" id="orig-new">
                <button className='register-settype' onClick={()=>{setUsertype('customer')}}>Customer</button>
                <button className='register-settype' onClick={()=>{setUsertype('seller')}}>Seller</button>

            </div>
            <div className="register-bg-card" id="orig">
                <div className="register-bg-card-head">
                    <span className="register-bg-card-head-text">Register</span>
                </div>
                <form className="register-bg-card-body" >
                    <input type="text" className='register-bg-card-input' placeholder='Name' id='name' onChange={e => {setName(e.target.value);}}/>
                    <input type="mail" className='register-bg-card-input' placeholder='UserName' id='username' onChange={e => {setUserName(e.target.value);}}/>
                    {(usertype=="seller") ? <><input type="text" className='register-bg-card-input' placeholder='CompanyName' id='companyname' onChange={e => {setCompanyName(e.target.value);}}/>
                    <input type="text" className='register-bg-card-input' placeholder='Company Address' id='companyaddress' onChange={e => {setCompanyAddress(e.target.value);}}/></> : <></> }
                    <input type="Number" className='register-bg-card-input' placeholder='Phno' id='phno' onChange={e => {setPhno(e.target.value);}}/>
                    <input type="password" className='register-bg-card-input' id='password' onChange={e => {setPassword(e.target.value);}}/>
                    <input type="submit" className='register-bg-card-input submitbtn' onClick={()=>submit()}/>
                </form>
                <a href="http://localhost:3000/login" className='login-bg-card-register'>have an account?</a>
            </div>
            </div>
    );
}
export default Register;