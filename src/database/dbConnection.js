import mongoose from "mongoose";
import { config } from 'dotenv'
import path from 'path'
config({path: path.resolve('./config/.env')})


export const dbConnection = mongoose.connect(
  process.env.MONGO_URL,
  {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    maxPoolSize: 10,
    minPoolSize: 2
  }
).then(()=>{
    console.log('Database connected successfully  ✔️  '.bgGreen);  
}).catch((err)=>{
    console.error('Error connecting to database:'.bgRed, err);
});
