const router=require('express').Router();
const UserSchema=require("../models/useraccount.model");
const jwt=require('jsonwebtoken');
const auth=require('../Middleware/auth');

router.route('/logout').get((req,res)=>{
    res.cookie("token","",{
        httpOnly:true,
        expires:new Date(0)
   }).send("logged out");
});

router.route("/register").post((req,res)=>{
    var name=req.body.name;
    var username=req.body.username;
    var phno=req.body.phno;
    var password=req.body.password;
    var companyAddress;
    var companyName;
    var newuser;
    var usertype=req.body.usertype;

    if(req.body.usertype=="seller")
    {
        companyAddress=req.body.companyAddress;
        companyName=req.body.companyName;
        newuser=new UserSchema({name,username,phno,password,usertype,companyAddress,companyName});
    }else
    {
        newuser=new UserSchema({name,username,phno,password,usertype});
    }
    newuser.save().then(ress=>{
        res.send("successfully registered!");
    }).catch(err=>{
        res.send("Unable to register :(");
        console.log(err);
    });
});

router.route("/login").post(async(req,res)=>{

    var username=req.body.username;
    var password=req.body.password;
    const result= await UserSchema.findOne({username:username,password:password});
    if(result)
    {
        console.log(result);
        var ids2=result._id;
        const tokenf=jwt.sign({id:ids2},process.env.SECRET_KEY);
        console.log(JSON.stringify(ids2));
        res.cookie("token",tokenf,{
            httpOnly:true,
            sameSite:'none',
            secure:true
        }).send(result);
    }
    else res.send(false);
});

router.route('/aboutme').get(auth,async(req,res)=>{
    var result=await UserSchema.find({_id:req.userid});
    if(result)
    {
        res.send(result);
    }else{
        res.send("error");
    }
})








module.exports=router;