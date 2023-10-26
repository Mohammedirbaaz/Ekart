const Mongoose=require('mongoose');

const schema=Mongoose.Schema;

const cartschema=new schema({
    prodid:{type:String,required:true},
    userid:{type:String,required:true},
},{ 
    strict: false 
},{ 
    timestamps:true, 
});
const exportingSchema=Mongoose.model('CartSchema',cartschema);
module.exports=exportingSchema;