// import {createStore} from 'redux';
import { configureStore } from "@reduxjs/toolkit";
import reducer from '../Components/staticComp/Login';

var intialState={
    username:'',
    usertype:'',
    companyName:''
}
 const loggedin='LOGGED_IN';
 const loggedout='LOGGED_OUT';
 const loggedinf=()=>{
    return{
        type:loggedin
    }
}

const store=configureStore(reducer);
export default {loggedin,loggedout,store,intialState};

