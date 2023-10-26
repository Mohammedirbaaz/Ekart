const router=require('express').Router();
const ProductSchema=require('../Models/product.model');
const CartSchema=require('../Models/cart.model');
const auth =require('../Middleware/auth');

router.route("/getproduct").get(async(req,res)=>{
    var data=await ProductSchema.find({});
    res.send(data);
});

router.route("/addtocart").post(auth,async(req,res)=>{
    var obj=
    {
       prodid:req.body.id,
       userid:req.userid,
    }
    var data=new CartSchema(obj);
    data.save().then(ress=>{
        res.send("added to cart");
        return;
    }).catch(err=>{
        res.send("error while adding to cart");
        return;
    })
});


module.exports =router;