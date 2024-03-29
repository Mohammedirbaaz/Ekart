const router=require('express').Router();
const CategorySchema=require('../Models/category.model');
const UserSchema=require("../models/useraccount.model");

router.post('/create',(req,res)=>{
    console.log(req.body);
    var obj=
    {
       CategoryName:req.body.CategoryName,
       CategoryImageLink:req.body.CategoryImageLink,
    }
    var categorysaver=new CategorySchema(obj);
    categorysaver.save().then(ress=>{
        res.send("added");
        return;
    }).catch(err=>{
        res.send(err);
        return;
    });
});


router.post("/add",async(req,res)=>{

    var arr=req.body.IdType;
    var type=req.body.type;

    var subs="";
    var dynamics= new Array(arr.length);
    var temp=new Array(arr.length);
    arr.length+=1;
    for(var i=0;i<arr.length;i++)
    {
        if(i<arr.length-1)
        {
            temp[i]=['d'+(i+1)];
            var ob1={[temp[i]+'.CategoryName']:arr[i]};
            dynamics[i]=ob1;
        }
        subs=subs+"Sub";
        if(arr.length-1!=i)
        {
            subs=subs+[`.$[${temp[i]}].`];
        }
    }

    CategorySchema.findOneAndUpdate({CategoryName:type},
        {$addToSet:{[subs]:
                   {
                    "CategoryName":req.body.CategoryName,
                    "CategoryImageLink":req.body.CategoryImageLink
                    }
              }
        },
        { arrayFilters: dynamics, upsert: true,new:true }
        ).then(ress=>{console.log(ress)}).catch(er=>{console.log(er)})
    
    /*
    CategorySchema.findOneAndUpdate({CategoryName:type},
        {$set:{subs:
                   [{
                    "CategoryName":req.body.CategoryName,
                    "CategoryImageLink":req.body.CategoryImageLink
                    }]
              }
        },
        { arrayFilters: [ { [dynamic+'.Catego'+'r'+str]: "Women" },{ ['sss.Catego'+'r'+str]: "Upperwear" } ], upsert: true,new:true }
        ).then(ress=>{console.log(ress)}).catch(er=>{console.log(er)})*/
});

router.get('/getdetails',(req,res)=>{
    CategorySchema.find({}).then(ress=>res.send(ress)).catch(err=>res.send(err));
})

router.get('/customerdetails',async(req,res)=>{
    var data=await UserSchema.find({usertype:"customer"});
    if(data)
    {
        res.send(data);
    }else res.status(404).send("error");
})

router.get('/sellerdetails',async(req,res)=>{
    var data=await UserSchema.find({usertype:"seller"});
    if(data)
    {
        res.send(data);
    }else res.status(404).send("error");
})



module.exports =router;


// CategorySchema.findOneAndUpdate({CategoryName:type},{
//     $addToSet:{"Sub":{
//         "CategoryName":req.body.CategoryName,
//         "CategoryImageLink":req.body.CategoryImageLink
//     }}
// }).then(ress=>{console.log(ress)}).catch(er=>{console.log(er)})