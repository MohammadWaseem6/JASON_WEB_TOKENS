// Importing necessary library
import jwt from 'jsonwebtoken'; // Library for JSON Web Tokens

// Secret key for JWT verification
const SECRET_KEY = 'secret';

// Middleware function to authenticate JWT token
export const authenticateToken = (req, res, next) => {
    // Extracting token from request headers
    const token = req.headers['authorization'];

    // Checking if token exists
    if (!token) return res.sendStatus(403);

    // Verifying the token
    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user; // Assigning user data to request object
        next(); // Proceeding to the next middleware
    });
};
