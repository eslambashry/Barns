import mongoose from "mongoose";

export const dbConnection = async() => {
  return await mongoose.connect(
    process.env.MONGO_URL
  ).then(()=>{
      console.log('Database connected successfully  ✔️  '.bgGreen);  
  }).catch((err)=>{
      console.error('Error connecting to database:'.bgRed, err);
  });
};