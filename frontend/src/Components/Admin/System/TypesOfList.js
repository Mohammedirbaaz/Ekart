import React,{useState,useEffect} from "react";
import Footer from '../../staticComp/Footer';
import Nav from '../../staticComp/Nav';
import axios from "axios";
import '../../../Styles/SystemHome.css';
import { useParams } from 'react-router-dom';
import CardView from "../../staticComp/CardView";

function TypesOfList() {
    const [data,setdata]=useState();
    const [temp,settemp]=useState();
    const [arr,setarr]=useState([]);
    const [str,setstr]=useState("");
    var arrs=window.location.href;
    var arr2=arrs.split("/");
    var arr3=arr2.splice(4,arr2.length);
    console.log(arr3);

    useEffect(() => {
        axios.get('http://localhost:5000/admin/getdetails')
        .then(ress=>{setdata(ress.data);console.log(ress.data)})
        .catch(err=>console.log(err));
        
        setarr(arr3);

        // arr3.length+=1;
        // arr3[arr3.length-1]=2;
        // arr3.length+=1;
        // arr3[arr3.length-1]=6;
        setstr(arr3.join("/").toString());
        console.log(str)
        
    },[])

    useEffect(()=>{
        if(data) call();
        
    })
    

    function call(){
        var tem;
        for(var i=0;i<arr3.length;i++)
        {
            if(i==0) {
                console.log(data)

                tem=data[arr3[i]].Sub;
            }
            else{
                console.log(tem)

                tem=tem[arr3[i]].Sub;

            }
        }
        console.log(tem);
        settemp(tem);
    }
        
    
    return(
        <div className="AdminHome">
            <div>{<Nav/>}</div>
            <div className="typecat" >
                {(!data) ? <div>Loading</div>:
                    <>
                    {(!temp) ? <div>No Data Found {":("} </div> : 
                        <>
                        {temp.map((types,index)=><CardView id={types._id} name={types.CategoryName} links={'/types/'+str+'/'+index} />)}
                        </>
                    } 
                    </>
                }
            </div>
            <div>{<Footer/>}</div>
        </div>
    )
}
export default TypesOfList;