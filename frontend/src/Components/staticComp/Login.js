import React,{ useState } from 'react';
import axios from 'axios';
import '../../Styles/Login.css'


function Login()
{
    
    const [username,setUserName]=useState("");
    const [password,setPassword]=useState("");

    async function submit(event)
    {
        event.preventDefault();
        if(username=="" || password=="")
        {
            alert("please fill all the following");
            return;
        }
        const obj={
            username:username,
            password:password
        }
        await axios.post("http://localhost:5000/login",obj,{withCredentials:true}).then(res=>{
            if(res.data!=false)
            {
                             
                window.location="/";
            }else{
                alert('please verify the password and username');
                setUserName("");
                setPassword("");

                document.getElementById("username").value="";
                document.getElementById("password").value="";
            }
            
    
        }).catch(err=>{
            console.log(err);
        });
    }
    
    return(
            <div className="login-bg-card">
                 <div className="login-bg-card-head">
                    <span className="login-bg-card-head-text">Login</span>
                </div>
                <form className="login-bg-card-body" >
                    <input type="text" className='login-bg-card-input' id='username' onChange={e => {setUserName(e.target.value);}}/>
                    <input type="password" className='login-bg-card-input' id='password' onChange={e => {setPassword(e.target.value);}}/>
                    <input type="submit" className='login-bg-card-input submitbtn' onClick={(event)=>submit(event)}/>
                </form>
                <a href="http://localhost:3000/register" className='login-bg-card-register'>Didn't have an account?</a>
            </div>
    );
}
export default Login;
