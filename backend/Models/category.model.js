const Mongoose=require('mongoose');

const schema=Mongoose.Schema;

const categorySchema=new schema({
    CategoryName:{type:String,required:true},
    CategoryImageLink:{type:String,required:true},
},{ 
    strict: false 
},{ 
    timestamps:true, 
});
const exportingSchema=Mongoose.model('CategorySchema',categorySchema);
module.exports=exportingSchema;