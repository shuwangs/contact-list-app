import jwt from "jsonwebtoken";

const authenticateToken = (req, res, next) => {

    // grab token from authorization hearder
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            message: 'Unauthorized. No token provided.'
        });
    }

    try {
        // verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        // continue to next middleware
        next();
    } catch (error) {
        return res.status(403).json({
            message: 'Forbidden - Invalid or expired token',
        });
    }
}

export default authenticateToken;
// this part is refered to https://towardsdev.com/jwt-middleware-in-express-apps-a-simple-guide-to-secure-authorization-a49d7e4c365a
