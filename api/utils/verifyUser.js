import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';
export const verifyToken =(req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return  res.status(404).json("Unauthorised");
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if(err!=null){
      if(err.message==='jwt expired'){
        res.clearCookie('access_token');
        return  res.status(404).json("Unauthorised");
      }
    }
      if (err) return next(errorHandler(403, 'Token Got expire Please Click on sign out'));
      req.user = user;
       next();
    
  });
};   
//  next(errorHandler(401, 'Unauthorized'))