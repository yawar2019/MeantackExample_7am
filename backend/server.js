import express  from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Product from './models/product.model.js';
const app=express();
//dotenv.config();
app.use(express.json());



const getproducts=async (req,res)=>{
try
{
const products=await Product.find({});
 return res.status(200).json({success:true,data:products});
}
catch(error)
{
console.log('error in getting product'+error.message);
return res.status(500).json({success:false,message:'Internal Server Error'});
}
}

const createProduct=async(req,res)=>
{
const product=req.body;
if(!product.name|| !product.price)
{
    return res.status(400).json({success:false,message:"Please fill up all Fields"})
}

const newProduct=new Product(product);
try{
newProduct.save();
    return res.status(201).json({success:true,data:newProduct});
}
catch(error)
{
console.log('error in create product'+error.message);
return res.status(500).json({success:false,message:'Internal Server Error'});
}

}

const updateProduct=async(req,res)=>
{
try 
{
 const {id}=req.params;
const product=req.body;
const resProduct=await Product.findByIdAndUpdate(id,product,{new:true})
return res.status(200).json({status:"success",data:product});

}
catch(error)
{
console.log('error in updating product'+error.message);
return res.status(500).json({success:false,message:'Internal Server Error'});
}

}

const deleteProduct=async(req,res)=>
{
try 
{
 const {id}=req.params;
await Product.findByIdAndDelete(id);
return res.status(200).json({status:"success",message:'record deleted successfully'});

}
catch(error)
{
console.log('error in deleting product'+error.message);
return res.status(500).json({success:false,message:'Internal Server Error'});
}

}

app.get('/api/products',getproducts);
app.post('/api/products',createProduct);
app.put('/api/products/:id',updateProduct);
app.delete('/api/products/:id',deleteProduct);

app.listen(5000,()=>{
connectDB();
    console.log('Server Started')
})