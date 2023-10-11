import { useState,useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';
import AdminHome from './Components/Admin/AdminHome';
import SellerHome from './Components/Seller/Home';
import CustomerHome from './Components/Customer/Home';
import AdminCustomerList from './Components/Admin/Admin_Customer/CustomerList';
import AdminSystem from './Components/Admin/System/SystemHome';
import TypesOfList from './Components/Admin/System/TypesOfList';
import SellerMyProduct from './Components/Seller/MyProduct';
import Register from './Components/staticComp/Register';
import Login from './Components/staticComp/Login';
import SellerEachProduct from './Components/Seller/EachProduct';
import axios from 'axios'

function App() {
  // const [props, setprops] = useState("customer");
  const [data, setdata] = useState({})


  useEffect(()=>{
    axios.get('http://localhost:5000/aboutme',{withCredentials:true}).then(res=>{
          setdata(res.data[0]);
      }).catch(err=>{console.log(err)});
  },[])

  
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/' element={
        (data.usertype=="customer") ? <CustomerHome/>
        : (data.usertype=="seller") ? <SellerHome/>
        : <AdminHome/>
      } />

        <Route path='/register' element={<Register usertype={data.usertype}/>} />
        <Route path='/login' element={<Login usertype={data.usertype}/>} />


        <Route exact path='/seller/MyProduct' element={<SellerMyProduct/>}/>
        <Route exact path='/seller/MyProduct/:id' element={<SellerEachProduct/>}/>

         <Route exact path='/admin/customer' element={<AdminCustomerList/>}/>
         <Route exact path='/admin/system' element={<AdminSystem/>}/>
         <Route exact path='/:types/*' element={<TypesOfList/>}/>
        </Routes>
      </Router>
      
    </div>
  );
}


export default App;

