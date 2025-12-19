import mongoose from "mongoose";

export const connectDB=async()=>{

    try{
       // MONGO_URI='mongodb+srv://yawarali17_db_user:Du0WF2zacY0ImS8w@cluster0.g7asgvk.mongodb.net/products?appName=Cluster0';
//const conn=await mongoose.connect(process.env.MONGO_URI);
const conn=await mongoose.connect('mongodb+srv://yawarali17_db_user:Du0WF2zacY0ImS8w@cluster0.g7asgvk.mongodb.net/product?appName=Cluster0');
console.log(`mongoo connected':${conn.connection.host}`);
    }
    catch(error)
    {
console.error(error.message);
process.exit(1);
    }

}