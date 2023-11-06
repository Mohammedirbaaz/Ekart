import React,{ useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Nav from '../staticComp/Nav';
import Footer from '../staticComp/Footer';
import '../../Styles/EachProduct.css'
import { useNavigate } from "react-router-dom";
import '../../Styles/CustomerOrderDetail.css'

function CustomerOrderDetail()
{
    const [myOrder,setMyOrder]=useState();

    


    const navigator=new useNavigate();
    useEffect(() => {
        axios.get("http://localhost:5000/customer/order",{withCredentials:true}).then(res=>{
            setMyOrder(res.data);
        }).catch(err=>{alert("something went wrong")})
    }, []);


    
    return(
        <div className="eachProduct-parent">
            <div>{<Nav first={"product"} second={"order"} third={"carts"}/>}</div>
            
            {(myOrder!==undefined) ?
                <div className='order-list-section'>
                    {console.log(myOrder)}
                    {myOrder.map((data,ind)=>
                        <div className='each-order' key={ind}>
                            <img src='' className='order-child'/>
                            <div className='order-child'>
                                <p>{data.product.about}</p>
                                <p>Brand - {data.product.brand}</p>
                                <p>Delivery - {data.address.name},{data.address.pincode}</p>
                                <p>Quantity-{data.quantity}</p>

                                
                            </div>
                        </div>
                        
                    )}
                </div> 
                : <div className="noordersfound">No Orders Found </div>}
                
            {/* <div className='each-footer'>{<Footer/>}</div> */}
        </div>
    );
}
export default CustomerOrderDetail;
