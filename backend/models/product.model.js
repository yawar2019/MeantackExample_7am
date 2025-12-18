 import mongoose from "mongoose";

 const productScheema=new mongoose.Schema({

    name:{
        type:String,
        required:true
    },

    price:{
        type:Number,
        required:true
    }
    },
    {

        timestamps:true
    }

 );

 const Product =mongoose.model("Product",productScheema);
 export default Product;