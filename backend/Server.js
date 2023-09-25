const express=require('express');
const cors=require('cors');
const cookieParser=require('cookie-parser');
require('dotenv').config();
const bodyParser = require('body-parser');
const Mongoose = require("mongoose");
const AdminHandler = require("./Routes/Admin");
// const SellerHandler = require('./Routes/Seller');
// const CustomerHandler = require('./Routes/Customer');

const app=express();
const port=process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());


Mongoose.connect(process.env.URL).then(()=>{
    console.log("Database Established");
}).catch(err=>{
    console.log(err);
});

app.use("/admin",AdminHandler);
// app.use("/seller",SellerHandler);
// app.use("/customer",CustomerHandler);

app.listen(5000, ()=>{
    console.log("listening in "+port)
});
