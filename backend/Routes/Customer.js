const router=require('express').Router();
const ProductSchema=require('../Models/product.model');
const CartSchema=require('../Models/cart.model');
const auth =require('../Middleware/auth');

router.route("/getproduct").get(async(req,res)=>{
    var data=await ProductSchema.find({});
    res.send(data);
});

router.route("/addtocart").post(auth,async(req,res)=>{
    
    var data= await CartSchema.find({userid:req.userid});

    if(data.length>0)
    {
        console.log("not emptyy")
        var arrs=data[0].prodid;
        console.log(data);
        for(var i=0;i<arrs.length;i++)
        {
            if(arrs[i]==req.body.id) {
                res.send("this item is already in cart");
                return;
            }
        }
        arrs.length=arrs.length+1;
        arrs[arrs.length-1]=req.body.id;

        console.log(arrs);

        
        
        var newdata= await CartSchema.findOneAndUpdate({userid:req.userid},{$set:{prodid:arrs}});
        if(newdata!=null) res.send("added to cart");
        else res.send("error");
        return;

    }else
    {
        var arr=new Array(1);
        arr[0]=req.body.id;
        var obj=
        {
            prodid:arr,
            userid:req.userid
        }
        var data2=new CartSchema(obj);
        console.log("for new one")
        data2.save().then(ress=>{
        res.send("added to cart");
            return;
        }).catch(err=>{
            res.send("error while adding to cart");
            return;
        })
    }
});

router.route("/removefromcart").post(auth,async(req,res)=>{
    var obj=req.body.id;
    var data=await CartSchema.find({userid:req.userid});

    if(data[0].prodid.length==1)
    {
        var newdata= await CartSchema.findOneAndDelete({userid:req.userid});
        if(newdata!=null) res.send("removed from cart");
        else res.send("error");
        return;
    }

    var newarr=new Array(data[0].prodid.length-1);
    var c=0;
    for(var i=0;i<data[0].prodid.length;i++)
    {
        if(obj==data[0].prodid[i])
        {continue;}
        else{newarr[c++]=data[0].prodid[i];}
    }

    var newdata= await CartSchema.findOneAndUpdate({userid:req.userid},{$set:{prodid:newarr}});
    if(newdata!=null) res.send("removed from cart");
    else res.send("error");
    return;

});






router.route("/getcart").get(auth,async(req,res)=>{
    var data=await CartSchema.find({userid:req.userid});
    if(data.length==0) return ;
    var totaldata=new Array(data[0].prodid.length);

    for(var i=0;i<data[0].prodid.length;i++)
    {
        totaldata[i]=await ProductSchema.find({_id:data[0].prodid[i]});
    }
    res.send(totaldata);
});



module.exports =router;