import React,{ useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Nav from '../staticComp/Nav';
import Footer from '../staticComp/Footer';
import '../../Styles/EachProduct.css'


function EachProduct()
{
    const [myProduct,setmyProduct]=useState({});
    const [category,setcategory]=useState([]);
    const { id } = useParams()
    useEffect(() => {
        
        console.log(id)
      axios.get("http://localhost:5000/seller/eachproduct/"+id,{withCredentials:true}).then(res=>{
        setmyProduct(res.data[0]);
        setcategory(res.data[0].category)
      }).catch(err=>{alert(err)});
    }, [])
    
    
    
    return(
        <div className="eachProduct-parent">
            <div>{<Nav first={"Home"} second={"My Product"} third={"Monitization"} fourth={"Statistics"}/>}</div>
            <div className="myproduct-item" >
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
                {/* } */}
            </div>
            <div className='each-footer'>{<Footer/>}</div>
        </div>
    );
}
export default EachProduct;
