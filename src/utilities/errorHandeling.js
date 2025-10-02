// Async Handler - للتعامل مع الأخطاء في الدوال غير المتزامنة
export const asyncHandler = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};

export const globalResponse = (err,req,res,next) => {
    if(err){
        if(req.validationErrorArr){
            return res.status(err['cause'] || 400).json({message: req.validationErrorArr})
        }
        return res.status(err['cause'] || 500).json({message:err.message})
    }
}

export class CustomError extends Error {
    constructor(statusCode, message) {
      super(message);
      this.statusCode = statusCode;
    }
  }