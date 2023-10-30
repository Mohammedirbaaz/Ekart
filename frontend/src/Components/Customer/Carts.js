import React,{useState,useEffect} from "react";
import CardView from '../staticComp/CardView';
import Footer from '../staticComp/Footer';
import Nav from '../staticComp/Nav';
import { useNavigate } from "react-router-dom";
import '../../Styles/MyProduct.css';
import axios from "axios";

function CustomerCart(params) {
    const navigator=new useNavigate();
    const [Product, setProduct]=useState([]);
    useEffect(() => {
        axios.get("http://localhost:5000/customer/getcart",{withCredentials:true}).then(res=>{
            setProduct(res.data);
            console.log(res.data);
        }).catch(err=>{console.log(err)});

        
    },[]);

    

    function onremovetocart(id){
        var obj={
          id:id  
        };  
        axios.post("http://localhost:5000/customer/removefromcart",obj,{withCredentials:true}).then(res=>{
            if(res=="removed from cart")
            {
                alert("Removed from cart");
                window.location.reload();
            }
            else alert(res.data)
        }).catch(err=>{alert("error while removing from cart")});
    }

    
    return(
        
        <div className="AdminHome">
            <div>{<Nav first={"product"} second={"order"} third={"carts"}/>}</div>

            <div className="myproduct">
                {Product.map((prod)=>
                    <div className="myproduct-item" key={prod[0]._id} >
                    <div className="item-images" onClick={()=>{navigator('/customer/product/'+prod[0]._id)}}></div>
                    <div className="item-body" onClick={()=>{navigator('/customer/product/'+prod[0]._id)}}>
                        <p>{prod[0].brand }</p>
                        <p>{prod[0].about }</p>
                        <p>₹{prod[0].price}</p>
                    </div>
                    <div className="item-body">
                        <button className="btnincardview inps2" onClick={()=>{onremovetocart(prod[0]._id)}}>Remove</button>
                        <button className="btnincardview inps2">Buy Now</button>
                    </div>
                </div> 
                )}
            </div>
            
            <div className='each-footer'>{<Footer/>}</div>
        </div>
    )
}
export default CustomerCart;