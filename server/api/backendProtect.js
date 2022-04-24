const { models: { User } } = require('../db');

// Only logged in user can have access to their API cart
const isLoggedIn = async (req, res, next) => {
    try {
      const token = req.headers.authorization;
  
      if (!token) return res.status(401).json({ message: "unauthorized" });
  
      const user = await User.findByToken(token);
      
      req.user = user;
      next();
    } catch (err) {
      console.log(err);
      next(err);
    }
  };

// Only Admin has the right to access and modify backend products
const isAdmin = async (req, res, next) => {
try {
    const token = req.headers.authorization;
    // If there is no token, return unauthorized
    if (!token) return res.status(401).json({ message: "unauthorized" });

    const user = await User.findByToken(token);
    // If the logged in user is not Admin, return unauthorized
    if (!user.isAdmin) return res.status(401).json({ message: "unauthorized" });
    
    req.user = user;
    next();
} catch (err) {
    console.log(err);
    next(err);
}
};

module.exports = { isLoggedIn, isAdmin }