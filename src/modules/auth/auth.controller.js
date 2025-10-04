import pkg from 'bcrypt'
import { User } from "../../database/models/user.model.js"
import { Role } from "../../database/models/role.schema.js"
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { generateToken } from "../../utilities/tokenFunction.js"
import { CustomError, asyncHandler } from "../../utilities/errorHandeling.js";

export const signup = asyncHandler(async(req,res,next) => {
    const { 
        name,
        email,
        password,
        roleName
    } = req.body
    
    // التحقق من وجود البريد الإلكتروني
    const isExisted = await User.findOne({email})
    if(isExisted){
        return next(new CustomError(400, 'البريد الإلكتروني موجود مسبقاً'))
    }

    // البحث عن الدور
    const role = await Role.findOne({ name: roleName })
    if(!role){
        return next(new CustomError(400, 'الدور غير موجود'))
    }

    // تشفير كلمة المرور
    const hashedPassword = pkg.hashSync(password, +process.env.SALT_ROUNDS)
    
    const user = new User({
        name,
        email,
        password: hashedPassword,
        role: role._id
    })
    
    const savedUser = await user.save()
    
    // إرجاع البيانات بدون كلمة المرور
    const userResponse = await User.findById(savedUser._id)
        .select('-password')
        .populate('role', 'name description')
    
    res.status(201).json({
        success: true,
        message: 'تم إنشاء الحساب بنجاح',
        data: userResponse
    })
})
export const login = asyncHandler(async(req,res,next) => {
    const {email, password} = req.body
     
    if(!email){
        return next(new CustomError(422, 'البريد الإلكتروني وكلمة '))
    }

    if(!password){
        return next(new CustomError(422, 'البريد الإلكتروني وكلمة المرور مطلوبان'))
    }
    const user = await User.findOne({email}).populate('role', 'name description')
    if(!user){
        return next(new CustomError(401, 'البريد الإلكتروني أو كلمة المرور غير صحيحة'))
    }

    const isPasswordCorrect = pkg.compareSync(password, user.password)
    if(!isPasswordCorrect){
        return next(new CustomError(401, 'البريد الإلكتروني أو كلمة المرور غير صحيحة'))
    }

    const token = generateToken({
        payload:{
            email: user.email,
            _id: user._id,
            role: user.role.name
        },
        signature: process.env.SIGN_IN_TOKEN_SECRET || "Login",
        expiresIn: '7d',
    })
     
    const userResponse = {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token
    }
     
    res.status(200).json({
        success: true,
        message: 'تم تسجيل الدخول بنجاح',
        data: userResponse
    })
})

export const addUser = asyncHandler(async (req, res, next) => {
  const { name, email, password, roleName } = req.body;

  // Validate required fields
  if (!name || !email || !password || !roleName) {
    return next(new CustomError(400, "جميع الحقول مطلوبة"));
  }

  // Check if email already exists
  const isExist = await User.findOne({ email });
  if (isExist) {
    return next(new CustomError(400, "البريد الإلكتروني موجود مسبقاً"));
  }

  // البحث عن الدور
  const role = await Role.findOne({ name: roleName })
  if(!role){
      return next(new CustomError(400, 'الدور غير موجود'))
  }

  // Hash the password
  const hashedPassword = pkg.hashSync(password, +process.env.SALT_ROUNDS);

  // Prepare user object
  const user = new User({
    name,
    email,
    password: hashedPassword,
    role: role._id
  });

  await user.save();

  const userResponse = await User.findById(user._id)
      .select('-password')
      .populate('role', 'name description')

  res.status(201).json({ 
    success: true,
    message: "تم إنشاء المستخدم بنجاح", 
    data: userResponse 
  });
});

export const deleteUser = asyncHandler(async(req,res,next) => {
    const {id} = req.params
    
    const user = await User.findByIdAndDelete(id)
    if(!user){
        return next(new CustomError(404, 'المستخدم غير موجود'))
    }
    
    res.status(200).json({
        success: true,
        message: "تم حذف المستخدم بنجاح"
    })
})

export const forgetPassword = asyncHandler(async (req, res, next) => {
    const { email } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
        return next(new CustomError(404, 'البريد الإلكتروني غير مسجل'));
    }
    
    // إنشاء رمز إعادة تعيين كلمة المرور
    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    
    user.passwordResetToken = hashedToken;
    user.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 دقائق
    await user.save();
    
    // TODO: إرسال البريد الإلكتروني مع رابط إعادة التعيين
    await sendResetEmail(email, resetToken);
    
    res.status(200).json({ 
        success: true,
        message: 'تم إرسال رابط إعادة تعيين كلمة المرور',
        resetToken: process.env.NODE_ENV === 'development' ? resetToken : undefined
    });
});


export const resetPassword = asyncHandler(async(req,res,next) => {
    const { token, newPassword } = req.body;
    
    if(!token || !newPassword){
        return next(new CustomError(400, 'الرمز وكلمة المرور الجديدة مطلوبان'))
    }
    
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    
    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() }
    });
    
    if(!user) {
        return next(new CustomError(400, 'الرمز غير صحيح أو منتهي الصلاحية'));
    }

    const hashedPassword = pkg.hashSync(newPassword, +process.env.SALT_ROUNDS)
    user.password = hashedPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
  
    await user.save();
    
    res.status(200).json({
        success: true,
        message: "تم إعادة تعيين كلمة المرور بنجاح"
    });
});

export const logout = asyncHandler(async(req,res,next) => {
    // في حالة استخدام JWT، عملية تسجيل الخروج تتم من جانب العميل
    // يمكن إضافة منطق إضافي مثل إضافة التوكن إلى قائمة سوداء
    res.status(200).json({
        success: true,
        message: "تم تسجيل الخروج بنجاح"
    });
});

export const getSingleUser = asyncHandler(async(req,res,next) => {
    const { id } = req.params;
    
    const user = await User.findById(id)
        .select('-password')
        .populate('role', 'name description');
    
    if(!user){
        return next(new CustomError(404, 'المستخدم غير موجود'));
    }
    
    res.status(200).json({
        success: true,
        data: user
    });
});

export const updateProfile = asyncHandler(async(req,res,next) => {
    const { id } = req.params;
    const { name, email } = req.body;
    
    const user = await User.findById(id);
    if(!user){
        return next(new CustomError(404, 'المستخدم غير موجود'));
    }
    
    // التحقق من البريد الإلكتروني إذا تم تغييره
    if(email && email !== user.email){
        const emailExists = await User.findOne({ email });
        if(emailExists){
            return next(new CustomError(400, 'البريد الإلكتروني موجود مسبقاً'));
        }
    }
    
    if(name) user.name = name;
    if(email) user.email = email;
    
    await user.save();
    
    const updatedUser = await User.findById(id)
        .select('-password')
        .populate('role', 'name description');
    
    res.status(200).json({
        success: true,
        message: 'تم تحديث الملف الشخصي بنجاح',
        data: updatedUser
    });
});

export const getAllUser = asyncHandler(async(req,res,next) => {
    const users = await User.find()
        .select('-password')
        .populate('role', 'name description');
    
    res.status(200).json({
        success: true,
        count: users.length,
        data: users
    });
});

export const getAllLength = asyncHandler(async(req,res,next) => {
    const userCount = await User.countDocuments();
    const roleCount = await Role.countDocuments();
    
    res.status(200).json({
        success: true,
        data: {
            users: userCount,
            roles: roleCount
        }
    });
});

export const verifyUserToken = asyncHandler(async(req,res,next) => {
    const token = req.headers.authorization?.split(' ')[1];
    
    if(!token){
        return next(new CustomError(401, 'لم يتم توفير رمز التحقق'));
    }
    
    try {
        const decoded = jwt.verify(token, process.env.SIGN_IN_TOKEN_SECRET || "Login");
        
        const user = await User.findById(decoded._id)
            .select('-password')
            .populate('role', 'name description');
        
        if(!user){
            return next(new CustomError(404, 'المستخدم غير موجود'));
        }
        
        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        return next(new CustomError(401, 'رمز التحقق غير صحيح أو منتهي الصلاحية'));
    }
});

export const UpdateUser = asyncHandler(async(req,res,next) => {
    const { id } = req.params;
    const { name, email, roleName } = req.body;
    
    const user = await User.findById(id);
    if(!user){
        return next(new CustomError(404, 'المستخدم غير موجود'));
    }
    
    // التحقق من البريد الإلكتروني إذا تم تغييره
    if(email && email !== user.email){
        const emailExists = await User.findOne({ email });
        if(emailExists){
            return next(new CustomError(400, 'البريد الإلكتروني موجود مسبقاً'));
        }
    }
    
    // تحديث الدور إذا تم توفيره
    if(roleName){
        const role = await Role.findOne({ name: roleName });
        if(!role){
            return next(new CustomError(400, 'الدور غير موجود'));
        }
        user.role = role._id;
    }
    
    if(name) user.name = name;
    if(email) user.email = email;
    
    await user.save();
    
    const updatedUser = await User.findById(id)
        .select('-password')
        .populate('role', 'name description');
    
    res.status(200).json({
        success: true,
        message: 'تم تحديث المستخدم بنجاح',
        data: updatedUser
    });
});