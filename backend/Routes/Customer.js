const router=require('express').Router();
const ProductSchema=require('../Models/product.model');
const auth =require('../Middleware/auth');

router.route("/getproduct").get(async(req,res)=>{
    var data=await ProductSchema.find({});
    res.send(data);
});


module.exports =router;