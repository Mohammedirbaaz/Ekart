import React,{useState,useEffect} from "react";
import CardView from '../staticComp/CardView';
import Footer from '../staticComp/Footer';
import Nav from '../staticComp/Nav';
import { useNavigate } from "react-router-dom";
import '../../Styles/MyProduct.css';
import axios from "axios";

function CustomerProduct(params) {
    const navigator=new useNavigate();
    const [data, setdata] = useState([{}]);
    const [Product, setProduct]=useState([]);
    useEffect(() => {
        axios.get("http://localhost:5000/customer/getproduct",{withCredentials:true}).then(res=>{
            setProduct(res.data);
        }).catch(err=>{console.log(err)});

    },[]);

    function onaddtocart(id){
        var obj={
          id:id  
        };  
        axios.post("http://localhost:5000/customer/addtocart",obj,{withCredentials:true}).then(res=>{
            alert("added to cart")
        }).catch(err=>{alert("error while adding to cart")});
    }
    
    

    return(
        <div className="AdminHome">
            <div>{<Nav first={"product"} second={"order"} third={"carts"}/>}</div>

            <div className="myproduct">
                {Product.map((prod)=>
                    <div className="myproduct-item" key={prod._id} >
                        <div className="item-images" onClick={()=>{navigator('/customer/product/'+prod._id)}}></div>
                        <div className="item-body" onClick={()=>{navigator('/customer/product/'+prod._id)}}>
                            <p>{(prod.brand.length>30)? (prod.brand.substring(0, 30) + '...') : prod.brand }</p>
                            <p>{(prod.about.length>30)? (prod.about.substring(0, 30) + '...') : prod.about }</p>
                            <p>₹{prod.price}</p>
                            
                        </div>
                        <div className="item-body">
                            <button className="btnincardview inps2" onClick={()=>{onaddtocart(prod._id)}}>Add to Cart</button>
                            <button className="btnincardview inps2">Buy Now</button>
                        </div>
                    </div>
                )}
            </div>
            
            <div className='each-footer'>{<Footer/>}</div>
        </div>
    )
}
export default CustomerProduct;