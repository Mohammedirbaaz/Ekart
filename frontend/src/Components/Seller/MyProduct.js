import React,{useState,useEffect} from "react";
import CardView from '../staticComp/CardView';
import Footer from '../staticComp/Footer';
import Nav from '../staticComp/Nav';
import { useNavigate } from "react-router-dom";
import '../../Styles/MyProduct.css';
import axios from "axios";

function SellerMyProduct(params) {
    const navigator=new useNavigate();
    const [data, setdata] = useState([{}]);
    const [cat,setcat]=useState([]);
    const [realdata,setrealdata]=useState({});
    const [news1, setnews1] = useState(0);
    const [colour, setcolour] = useState('');
    const [price, setprice] = useState(0);
    const [totalleft, settotalleft] = useState(0);
    const [brand, setbrand] = useState('');
    const [about, setabout] = useState('');
    const [image, setimage] = useState([{},{},{},{}]);
    const [myProduct, setmyProduct]=useState([]);
    useEffect(() => {
        axios.get("http://localhost:5000/seller/getproduct",{withCredentials:true}).then(res=>{
            setmyProduct(res.data);
        }).catch(err=>{console.log(err)});

        axios.get('http://localhost:5000/admin/getdetails')
        .then(ress=>{
            setdata(ress.data);
            
            var size=ress.data.length;
            for(var i=0;i<size;i++)
            {
                var opt=document.createElement("option");
                opt.value=ress.data[i].CategoryName;
                opt.text=ress.data[i].CategoryName;
                document.getElementById("category1").appendChild(opt);
            }
            
        })
        .catch(err=>console.log(err));
    },[]);
    

    useEffect(() => {
        
        if(news1!=0)
        {
            if(realdata.Sub)
            {
                for(var i=-1;i<realdata.Sub.length;i++)
                {
                    var optx=document.createElement("option");
                    if(i==-1)
                    {
                        optx.value="Select";
                        optx.text="Select";
                    }else
                    {
                        optx.value=realdata.Sub[i].CategoryName;
                        optx.text=realdata.Sub[i].CategoryName;
                    }
                    document.getElementById(["category"+news1]).appendChild(optx);
                }
                document.getElementById(["category"+news1]).onchange=()=>{onChangeCategory(news1,news1+1)};
            }else{
                document.getElementById("tablebody").removeChild(document.getElementById("categorytr"+news1));
            }
            

        }        
    },[realdata,news1]);
    

    function onChangeCategory(from,news)
    {
        var ids=["category"+from];
        
        if(document.getElementById(ids).value!=="Select")
        {
            setcat(oldArray => [...oldArray, document.getElementById(ids).value]);
            if(from==1)//tells, first category
            {
                var size=data.length;
                for(var i=0;i<size;i++)
                {
                    if(data[i].CategoryName==document.getElementById(ids).value)
                    {
                        setrealdata(data[i]);
                        setnews1(news);
                    }
                }
            }
            else
            {
                var size=realdata.Sub.length;
                for(var i=0;i<size;i++)
                {
                    if(realdata.Sub[i].CategoryName==document.getElementById(ids).value)
                    {
                        setrealdata(realdata.Sub[i]);
                        setnews1(news);
                    }
                }
            }

            var tr=document.createElement("tr");
            tr.id="categorytr"+news;
            var td1=document.createElement("td");
            var td2=document.createElement("td");
            td1.textContent="category "+news;
            
            var select=document.createElement("select");
            select.id="category"+news;

            td2.appendChild(select);
            tr.appendChild(td1);
            tr.appendChild(td2);

            document.getElementById("tablebody").appendChild(tr);
        }
    }
    
    
    function create()
    {
        var divs=document.getElementById("addproductdiv");
        divs.style.display="block";
    }

    function onChangeImage(id,e)
    {
        var desimg=document.getElementById(["img"+id]);
        var newar=[...image];
        newar[id-1]=e.target.files[0];
        setimage([...newar]);
        desimg.src=URL.createObjectURL(e.target.files[0]);
    }

    function addproduct(){
        var obj=
        {
            image:image,
            brand:brand,
            about:about,
            colour:colour,
            price:price,
            totalleft:totalleft,
            category:cat
        } 
        console.log(image)

        axios.post("http://localhost:5000/seller/addproduct",obj,{withCredentials:true}).then(res=>{
            console.log(res);
        }).catch(err=>console.log(err));

        var divs=document.getElementById("addproductdiv");
        divs.style.display="none";
        window.location.href=window.location.href;
    }

    return(
        <div className="AdminHome">
            <div>{<Nav first={"Home"} second={"My Product"} third={"Monitization"} fourth={"Statistics"}/>}</div>

            <div className="myproduct">
                {myProduct.map((prod)=>
                    <div className="myproduct-item" key={prod._id} onClick={()=>{navigator('/seller/MyProduct/'+prod._id)}}>
                        <div className="item-images"></div>
                        <div className="item-body">
                            <p>{(prod.brand.length>30)? (prod.brand.substring(0, 30) + '...') : prod.brand }</p>
                            <p>{(prod.about.length>30)? (prod.about.substring(0, 30) + '...') : prod.about }</p>
                            <p>₹{prod.price}</p>
                        </div>
                    </div>
                )}
            </div>
            <div className="card-view-parent" >
                <div className="addproduct" id="addproductdiv">
                    <div className="images">
                        <img className="img" id="img1" />
                        <img className="img" id="img2"/>
                        <img className="img" id="img3" />
                        <img className="img" id="img4" />
                    </div>
                    <table className="table">
                        <tbody id="tablebody">
                        <tr>
                            <td>Image 1</td>
                            <td><input type="file"  accept="image/*" name="image" id="srcimg1" onChange={(e)=>{onChangeImage(1,e)}}/></td>
                        </tr>
                        <tr>
                            <td>Image 2</td>
                            <td><input type="file"  accept="image/*" name="image" id="srcimg2" onChange={(e)=>onChangeImage(2,e)}/></td>
                        </tr>
                        <tr>
                            <td>Image 3</td>
                            <td><input type="file"  accept="image/*" name="image" id="srcimg3" onChange={(e)=>onChangeImage(3,e)}/></td>
                        </tr>
                        <tr>
                            <td>Image 4</td>
                            <td><input type="file"  accept="image/*" name="image" id="srcimg4" onChange={(e)=>onChangeImage(4,e)}/></td>
                        </tr>

                        <tr>
                            <td>Brand</td>
                            <td><input type={'text'} name="brand" id="brand" onChange={(e)=>setbrand(e.target.value)}/></td>
                        </tr>
                        <tr>
                            <td>About</td>
                            <td><input type={'text'} name="about" id="about" onChange={(e)=>setabout(e.target.value)}/></td>
                        </tr>

                        <tr>
                            <td>Colour</td>
                            <td><input type={"text"} onChange={(e)=>setcolour(e.target.value)}/></td>
                        </tr>
                        <tr>
                            <td>Price</td>
                            <td><input type={"number"} onChange={(e)=>setprice(e.target.value)}/></td>
                        </tr>
                        <tr>
                            <td>Total left</td>
                            <td><input type={"number"} onChange={(e)=>settotalleft(e.target.value)}/></td>
                        </tr>

                        <tr>
                            <td>category1</td>
                            <td>
                                <select id="category1" onChange={()=>onChangeCategory(1,2)}>
                                <option>Select</option>
                                </select>
                            </td>
                        </tr>
                        
                        </tbody>
                    </table>
                    <button className="btn" onClick={addproduct}>Submit</button>
                </div>
                <div className="plus" onClick={()=>create()}>+</div>
            </div>
            <div className='each-footer'>{<Footer/>}</div>
        </div>
    )
}
export default SellerMyProduct;