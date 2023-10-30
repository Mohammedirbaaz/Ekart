import React,{ useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Nav from '../staticComp/Nav';
import Footer from '../staticComp/Footer';
import '../../Styles/EachProduct.css'
import { useNavigate } from "react-router-dom";
import '../../Styles/CustomerOrder.css'


function CustomerOrder()
{
    const [myProduct,setmyProduct]= useState({});
    const { id } = useParams();
    const [myData,setMyData]=useState({});
    const [myOrder, setMyOrder]= useState({
        quantity:0,
        prodid:'',
        time:'',
        date:'',
    });

    const [name,setname]=useState();
    const [doorno,setdoorno]=useState();
    const [street,setstreet]=useState();
    const [area,setarea]=useState();
    const [pincode,setpincode]=useState();
    const [townorcity,settownorcity]=useState();
    const [state,setstate]=useState();




    const navigator=new useNavigate();
    useEffect(() => {
      axios.get("http://localhost:5000/seller/eachproduct/"+id,{withCredentials:true}).then(res=>{
        setmyProduct(res.data[0]);
      }).catch(err=>{alert(err)});

      axios.get("http://localhost:5000/aboutme",{withCredentials:true}).then(res=>{
        setMyData(res.data[0]);
        console.log(res.data[0]);
      }).catch(err=>{alert(err)});

    }, []);


    function add_address()
    {
        
    }

    
    return(
        <div className="eachProduct-parent">
            <div>{<Nav first={"product"} second={"order"} third={"carts"}/>}</div>
            <table className='create-address' id="create-address-id">
                <tr>
                    <td>Name</td>
                    <td><input type='text' className='input1' onChange={(e)=>{setname(e.target.value)}}/></td>
                </tr>

                <tr>
                    <td>Door no and Building name</td>
                    <td><input type='text' className='input1' onChange={(e)=>{setdoorno(e.target.value)}}/></td>
                </tr>

                <tr>
                    <td>Street Name</td>
                    <td><input type='text' className='input1' onChange={(e)=>{setstreet(e.target.value)}}/></td>
                </tr>

                <tr>
                    <td>Area</td>
                    <td><input type='text' className='input1' onChange={(e)=>{setarea(e.target.value)}}/></td>
                </tr>

                <tr>
                    <td>Pincode</td>
                    <td><input type='Number' className='input1' onChange={(e)=>{setpincode(e.target.value)}}/></td>
                </tr>

                <tr>
                    <td>town/city</td>
                    <td><input type='text' className='input1' onChange={(e)=>{settownorcity(e.target.value)}}/></td>
                </tr>

                <tr>
                    <td>State</td>
                    <td><input type='text' className='input1' onChange={(e)=>{setstate(e.target.value)}}/></td>
                </tr>

                <div className='btns-flex'>
                    <button className='btns-inside' onClick={()=>{document.getElementById("create-address-id").style.display="none"}}>Cancel</button>
                    <button className='btns-inside'>Add</button>
                </div>
            </table>
            <div className='address-section'>
                <p className='address-header'>Delivery Address</p>
                <div className='address-content' id='address-element'>
                    {(!myData.address) ? <p className='add-address' onClick={()=>{document.getElementById("create-address-id").style.display="block"}}> Add Address</p> : 
                    <p>yes data available</p>}
                </div>
            </div>
            <div className='payment-section'>

            </div>
            {/* <div className='each-footer'>{<Footer/>}</div> */}
        </div>
    );
}
export default CustomerOrder;
