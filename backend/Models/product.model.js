const Mongoose=require('mongoose');

const schema=Mongoose.Schema;

const ProductSchema=new schema({
    image:{type:Array,required:true},
    brand:{type:String,required:true},
    about:{type:String,required:true},
    colour:{type:String,required:true},
    price:{type:String,required:true},
    totalleft:{type:Number,required:true},
    category:{type:Array,required:true},
    sellerid:{type:String,required:true}
},{ 
    timestamps:true, 
});
const exportingSchema=Mongoose.model('productSchema',ProductSchema);
module.exports=exportingSchema;