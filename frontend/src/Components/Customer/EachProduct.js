import React,{ useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Nav from '../staticComp/Nav';
import Footer from '../staticComp/Footer';
import '../../Styles/EachProduct.css'
import { useNavigate } from "react-router-dom";


function EachProduct()
{
    const [myProduct,setmyProduct]= useState({});
    const [category,setcategory]= useState([]);
    const { id } = useParams();
    const navigator=new useNavigate();
    useEffect(() => {
        
        console.log(id)
      axios.get("http://localhost:5000/seller/eachproduct/"+id,{withCredentials:true}).then(res=>{
        setmyProduct(res.data[0]);
        setcategory(res.data[0].category)
      }).catch(err=>{alert(err)});
    }, []);


    function onaddtocart(id){
        var obj={
          id:id  
        };  
        axios.post("http://localhost:5000/customer/addtocart",obj,{withCredentials:true}).then(res=>{
            if(res=="added to cart") alert("added to cart");
            else alert(res.data)
        }).catch(err=>{alert("error while adding to cart")});
    }


    function onbuyhandler(id)
    {
        navigator('/customer/order/'+id);
    }
    
    
    
    return(
        <div className="eachProduct-parent">
            <div>{<Nav first={"product"} second={"order"} third={"carts"}/>}</div>
            <div className="myproduct-item1" >
                <div className="item-images"></div>
                {/* {(myProduct!={}) ?<></> :  */}
                <table className="table">
                    <tbody>
                    <tr className='row'>
                        <td>About</td>
                        <td>{myProduct.about}</td>
                    </tr>
                    <tr className='row'>
                        <td>Brand </td>
                        <td>{myProduct.brand}</td>
                    </tr>
                    <tr className='row'>
                        <td>Colour </td>
                        <td>{myProduct.colour}</td>
                    </tr>
                    <tr className='row'>
                        <td>Price </td>
                        <td>{myProduct.price}</td>
                    </tr>
                    <tr className='row'>
                        <td>Total left </td>
                        
                        <td>{myProduct.totalleft}</td>
                    </tr>
                    <tr className='row'>
                        <td>Gender </td>
                        {console.log(myProduct)}
                        <td>{category[1]}</td>
                    </tr>
                    <tr className='row'>
                        <td>Category </td>
                        <td>{category[category.length-1]}</td>
                    </tr>
                    </tbody>
                </table>
                <div className="item-body">
                    <button className="btnincardview inps2" onClick={()=>{onaddtocart(myProduct._id)}}>Add to Cart</button>
                    <button className="btnincardview inps2" onClick={()=>{onbuyhandler(myProduct._id)}}>Buy Now</button>
                </div>
            </div>
            {/* <div className='each-footer'>{<Footer/>}</div> */}
        </div>
    );
}
export default EachProduct;
