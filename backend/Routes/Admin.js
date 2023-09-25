const router=require('express').Router();
const CategorySchema=require('../Models/category.model');

router.get("/create",async (req,res)=>{
    var obj=
    {
       CategoryName:req.body.type,
       CategoryImageLink:req.body.link,
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


router.get("/add",async(req,res)=>{

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



module.exports =router;


// CategorySchema.findOneAndUpdate({CategoryName:type},{
//     $addToSet:{"Sub":{
//         "CategoryName":req.body.CategoryName,
//         "CategoryImageLink":req.body.CategoryImageLink
//     }}
// }).then(ress=>{console.log(ress)}).catch(er=>{console.log(er)})