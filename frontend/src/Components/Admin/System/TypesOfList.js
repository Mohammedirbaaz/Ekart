import React,{useState,useEffect} from "react";
import Footer from '../../staticComp/Footer';
import Nav from '../../staticComp/Nav';
import axios from "axios";
import '../../../Styles/SystemHome.css';
import CardView from "../../staticComp/CardView";

function TypesOfList() {
    const [data,setdata]=useState();
    const [temp,settemp]=useState();
    const [arr,setarr]=useState([]);
    const [str,setstr]=useState("");
    const [newtype,setnewtype]=useState("");
    var arrs=window.location.href;
    var arr2=arrs.split("/");
    var arr3=arr2.splice(4,arr2.length);
    console.log(arr3);

    useEffect(() => {
        axios.get('http://localhost:5000/admin/getdetails')
        .then(ress=>{setdata(ress.data);console.log(ress.data)})
        .catch(err=>console.log(err));
        
        setarr(arr3);
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
    
    function addtype()
    {
        var divs=document.getElementById("addtypeid");
        divs.style.display=(divs.style.display=="flex")? "none":"flex";
    }

    function finaladdtype(){
        var inputs=document.getElementById("newtypename");
        if(inputs.value=="" || inputs.value==" ")
        {
            alert("please fill up the inputs :)")
        }else{

            var idtypearr=new Array(arr3.length-1);
            var side=data[arr3[0]].Sub;
            var c=0;
            for(var i=1;i<arr3.length;i++)
            {
                side=side[arr3[i]];
                idtypearr[c++]=side.CategoryName;
                console.log(idtypearr)
                side=side.Sub;
            }


            var obj={
                type:data[arr3[0]].CategoryName,
                IdType:idtypearr,
                CategoryName:newtype,
                CategoryImageLink:"xyzxyzxyz"
            }
            console.log(obj);
            axios.post('http://localhost:5000/admin/add',obj).then(res=>{
                addtype();
                window.location.href=window.location.href;
            }).catch(err=>alert(err));
        }
    }
    
    return(
        <div className="AdminHome">
            <div>{<Nav/>}</div>
            <div className="addtypes" id="addtypeid">
                <input className="inps" id="newtypename" type="text" placeholder={"New Type name"} onChange={(e)=>setnewtype(e.target.value)}/>
                <input className="inps" type="file" accept="image/*" placeholder="upload image"/>
                <div className="inps">
                    <button className="inps2" id="cancelbtn" onClick={()=>{addtype()}}>Cancel</button>
                    <button className="inps2" id="addbtn" onClick={()=>{finaladdtype()}}>Add</button>
                </div>

            </div>
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
            <div className="plus" onClick={()=>addtype()}>+</div>
            <div>{<Footer/>}</div>
        </div>
    )
}
export default TypesOfList;