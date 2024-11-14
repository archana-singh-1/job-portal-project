import jwt from 'jsonwebtoken';

export const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; 

    // console.log("Authorization Header:", req.headers.authorization); 

    if (!token) {
        return res.status(403).json({ message: "No token provided, authorization denied." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); 
        req.user = decoded; 
        next(); 

    } catch (error) {
        // console.error("Token verification error:", error); 
        return res.status(401).json({ message: "Invalid token." });
    }
};
