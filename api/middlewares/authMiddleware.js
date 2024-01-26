const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.protect = async (req, res, next) => {
   let token;
   if (
     req.headers.authorization &&
     req.headers.authorization.startsWith("Bearer")
   ) {
     token = req.headers.authorization.split(" ")[1];
   }

   if (!token) {
     return res
       .status(401)
       .json({ success: false, message: "Not authorized to access this route" });
   }

   try {
     const decoded = jwt.verify(token, process.env.JWT_SECRET);
     const user = await User.findById(decoded.id);

     if (!user) {
       return res
         .status(401)
         .json({ success: false, message: "Not authorized" });
     }

     req.user = user;
     next();
   } catch (error) {
     console.error(error); 
     res
       .status(401)
       .json({ success: false, message: "Not authorized, token failed" });
   }
};

exports.authorize = (...roles) => {
   return (req, res, next) => {
     if (!roles.includes(req.user.role)) {
       return res.status(403).json({
         success: false, 
         message: "User not authorized for this route",
       });
     }
     next();
   };
};
