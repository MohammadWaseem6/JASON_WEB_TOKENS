import jwt from 'jsonwebtoken'; // Library for JSON Web Tokens
import bcrypt from 'bcryptjs'; // Library for password hashing
import { PrismaClient } from '@prisma/client'; // Prisma client for database operations

// Creating an instance of PrismaClient
const prisma = new PrismaClient();

// Secret key for JWT signing
const SECRET_KEY = 'secret';

// Function to register a new user
export const register = async (req, res) => {
    // Extracting name, email, and password from request body
    const { name, email, password } = req.body;
    // Hashing the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        // Creating a new user in the database
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        });
        // Sending a successful response with the created user
        res.status(201).json(user);
    } catch (error) {
        // Handling errors, if user already exists
        res.status(400).json({ error: 'User already exists' });
    }
};

// Function to authenticate and log in a user
export const login = async (req, res) => {
    // Extracting email and password from request body
    const { email, password } = req.body;

    try {
        // Finding the user with the provided email in the database
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });

        // Validating the user's credentials
        if (user && await bcrypt.compare(password, user.password)) {
            // Generating a JWT token with the user's ID
            const token = jwt.sign({ userId: user.id }, SECRET_KEY);
            // Sending the token in the response
            res.json({ token });
        } else {
            // Sending an error response for invalid email or password
            res.status(401).json({ error: 'Invalid email or password' });
        }
    } catch (error) {
        // Handling internal server errors
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Function to create a new post
export const Post = async (req, res) => {
    // Extracting token from request headers
    const token = req.headers['authorization'];
    // Checking if token exists
    if (!token) return res.sendStatus(403);

    // Verifying the token and extracting user ID
    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
    });

    // Extracting title and body of the post from request body
    const { title, body } = req.body;
    // Extracting user ID from the token
    const userId = req.user.userId;

    // Checking if user ID exists
    if (userId) {
        try {
            // Creating a new post associated with the user in the database
            const post = await prisma.post.create({
                data: {
                    title,
                    body,
                    user: {
                        connect: {
                            id: userId
                        }
                    }
                }
            });
            // Sending a successful response with the created post
            res.status(201).json(post);
        } catch (error) {
            // Handling errors, if post already exists
            res.status(400).json({ error: 'Post already exists' });
        }
    } else {
        // Sending an unauthorized error response if user ID is not found
        res.status(401).json({ error: 'Unauthorized' });
    }
};
