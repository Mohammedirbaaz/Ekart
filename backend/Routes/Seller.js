const router=require('express').Router();
const ProductSchema=require('../Models/product.model');
const auth =require('../Middleware/auth');

router.post("/addproduct",auth,(req,res)=>{
    var newobj=new ProductSchema({image:req.body.image,brand:req.body.brand,about:req.body.about,colour:req.body.colour,price:req.body.price,totalleft:req.body.totalleft,category:req.body.category,sellerid:req.userid});
    newobj.save().then(ress=>{
        res.send(ress);
    }).catch(err=>{
        res.send(err);
    })
    var tem=JSON.stringify(req.body.image[0]);

    console.log(tem)
});

router.route("/getproduct").get(auth,async(req,res)=>{
    var data=await ProductSchema.find({sellerid:req.userid});
    res.send(data);
});

router.route("/eachproduct/:id").get(auth,async(req,res)=>{
    console.log(req.params.id)
    var data=await ProductSchema.find({_id:req.params.id});
    res.send(data);
});

module.exports =router;