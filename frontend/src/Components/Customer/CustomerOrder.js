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
    const { id,quant } = useParams();
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
    const [isaddhere,setisaddhere]=useState(false);
    const [addclicked,setaddclicked]=useState();


    const navigator=new useNavigate();
    useEffect(() => {
      axios.get("http://localhost:5000/seller/eachproduct/"+id,{withCredentials:true}).then(res=>{
        setmyProduct(res.data[0]);
      }).catch(err=>{alert(err)});

      axios.get("http://localhost:5000/aboutme",{withCredentials:true}).then(res=>{
        setMyData(res.data[0]);
        console.log(res.data[0]);
        setisaddhere((res.data[0].address.length>0)? true:false);
      }).catch(err=>{alert(err)});

    }, []);


    function onaddaddress()
    {
        var obj={
            name:name,
            doorno:doorno,
            street:street,
            area:area,
            pincode:pincode,
            townorcity:townorcity,
            state:state
        }


        axios.post("http://localhost:5000/customer/addaddress",obj,{withCredentials:true}).then(res=>{
            alert("added new address");
            window.location.reload();

        }).catch(err=>{alert("can't add address")})
    }

    function onorder()
    {
        var obj={
            prodid:id,
            quantity:quant,
            addressindex:addclicked
        };
        axios.post("http://localhost:5000/customer/addorder",obj,{withCredentials:true}).then(res=>{
            alert("your order is now complete!");
        }).catch(err=>{alert("something went wrong")})
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

                <tr className='btns-flex'>
                    <button className='btns-inside' onClick={()=>{document.getElementById("create-address-id").style.display="none"}}>Cancel</button>
                    <button className='btns-inside' onClick={()=>{onaddaddress();}}>Add</button>
                </tr>
            </table>
            <div className='address-section'>
                <p className='address-header'>Delivery Address</p>
                <div className='address-content' id='address-element'>
                    {(isaddhere) && 
                     <>
                        {myData.address.map((ad,index)=>
                            <div key={index}>
                                <input type={"radio"} name={"address"} value={index} onChange={(e)=>{setaddclicked(e.target.value); document.getElementById("orderbtnid").style.display="block" }}/>{ad.name}
                                <p>{ad.doorno},{ad.street},{ad.area},{ad.pincode},{ad.townorcity},{ad.state}</p>
                            </div>
                        )}
                    </> }
                    <div className='add-address' onClick={()=>{document.getElementById("create-address-id").style.display="block";}}> Add New Address</div> 
                </div>
            </div>
            <div className='payment-section'>
                
            </div>
            <button className='btns-side1 add-address' id='orderbtnid' onClick={()=>{onorder()}}>Order</button>
            {/* <div className='each-footer'>{<Footer/>}</div> */}
        </div>
    );
}
export default CustomerOrder;
