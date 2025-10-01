// import { nanoid } from "nanoid"
// import pkg from 'bcrypt'
// import {User} from "../../database/models/user.schema.js"
// import jwt from "jsonwebtoken"
// import crypto from 'crypto';
// import { generateToken } from "../../utilities/tokenFunction.js"
// import { CustomError } from "../../utilities/errorHandeling.js";

// export const signup = async(req,res,next) => {
    
//     const { 
//         userName,
//         email,
//         password,
//         role
//     } = req.body
//     //is email exsisted
//     const isExsisted = await User.findOne({email})
//     if(isExsisted){
//         return res.status(400).json({message:"Email exsisted"})
//     }

//     const hashedPassword = pkg.hashSync(password, +process.env.SALT_ROUNDS)
    
//     const user = new User({
//         userName,
//         email,
//         password:hashedPassword,
//         role
//     })
//     const saveUser = await user.save()
//     res.status(201).json({message:'done', saveUser})
// }
// export const login = async(req,res,next) => {
//     const {email,password} = req.body
 
     
//     if(!email || !password){
//         return next(new CustomError(422, 'Email And Password Is Required'))
//      }

//     const userExsist = await User.findOne({email})
//     if(!userExsist){
//         return next(new CustomError(401, 'user not found'))
//     } 

//     if(userExsist.isActive == false){
//         return next(new CustomError(401, 'user is not active'))
//     }

    
//     const passwordExsist = pkg.compareSync(password,userExsist.password)
 
//     if(!passwordExsist){
//         return next(new CustomError(401, 'password incorrect'))
//     }

//     const token = generateToken({
//         payload:{
//             email,
//             _id: userExsist._id,
//             role: userExsist.role
//         },
//         signature: process.env.SIGN_IN_TOKEN_SECRET || "Login", // ! process.env.SIGN_IN_TOKEN_SECRET
//         expiresIn: '1w',
//      })
     
//      const userUpdated = await User.findOneAndUpdate(
        
//         {email},
        
//         {
//             token,
//             isActive: true,
//         },
//         {new: true},
//      )
     
//      res.status(200).json({message: 'Login Success', userUpdated})
// }

// export const addUser = async (req, res, next) => {
//   const { userName, email, password, phoneNumber, role, isActive } = req.body;

//   // Validate required fields
//   if (!userName || !email || !password || !phoneNumber || !role) {
//     return next(new CustomError(400, "All fields are required"));
//   }

//   // Check if email already exists
//   const isExist = await User.findOne({ email });
//   if (isExist) {
//     return next(new CustomError(400, "Email is already existed"));
//   }

//   // Hash the password
//   const hashedPassword = pkg.hashSync(password, +process.env.SALT_ROUNDS);
//   const customId = nanoid();

//   // Prepare user object
//   const user = new User({
//     userName,
//     email,
//     password: hashedPassword,
//     phoneNumber,
//     role,
//     isActive,
//     customId,
//   });

//   // Handle file upload if image exists
//   if (req.file) {
//     const uploadResult = await imagekit.upload({
//       file: req.file.buffer,
//       fileName: req.file.originalname,
//       folder: `${process.env.PROJECT_FOLDER || 'MMAF'}/User/${customId}`,
//     });

//     user.image = {
//       secure_url: uploadResult.url,
//       public_id: uploadResult.fileId,
//     };
//   }

//   await user.save();

//   res.status(201).json({ message: "User created successfully", user });
// };

// export const deleteUser = async(req,res,next) => {
//     const {id} = req.params
    
//     const user = await User.findById(id)
//   if (user) {
//     const uploadedimage = user.image.public_id
//     if(uploadedimage){
//         await destroyImage(uploadedimage)
//     }
//   }
//   await User.findByIdAndDelete(id)
//     res.status(201).json({message:"User",user})
// }

// export const forgetPassword = async (req, res, next) => {
//     const { email } = req.body;
//     const verificationCode = crypto.randomInt(100000, 999999);
//     // console.log(verificationCode);
    
//     // First check if email already exists
//     const existingUser = await User.findOne({ email });
//     if (!existingUser) {
//         return next(new Error('Email not registered'));
//     }
//     // console.log(existingUser);
    
//     existingUser.verificationCode = verificationCode;
//     await existingUser.save();
//     // Store verification code in database
//     await tempVerificationModel.create({
//         email,
//         code: verificationCode,
//         // expiresAt: Date.now() + 10 * 60 * 1000 // 10 minutes
//     });
  
//     await sendVerificationEmail(email, verificationCode);
//     res.status(200).json({ message: 'Verification code sent successfully' });
//   };


//   export const resetPassword = async(req,res,next) => {
//     const {verificationCode, newPassword, email} = req.body;
    
//     const user = await User.findOne({email});
//     if(!user) {
//         return res.status(400).json({message: "User not found"});
//     }
  
//     if (!user.verificationCode || user.verificationCode !== parseInt(verificationCode)) {
//         return res.status(400).json({ error: 'Invalid verification code' });
//     }
  
//     // if (user.codeExpiresAt < Date.now()) {
//     //     return res.status(400).json({ error: 'Verification code expired' });
//     // }

//     const hashedPassword = pkg.hashSync(newPassword, +process.env.SALT_ROUNDS)
//     user.password = hashedPassword;
//     user.verificationCode = null;
//     user.codeExpiresAt = null;
  
//     const updatedUser = await user.save();
//     res.status(200).json({message: "Password reset successfully", updatedUser});
//   };