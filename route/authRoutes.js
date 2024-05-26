// Importing necessary libraries
import express from 'express'; // Library for creating HTTP servers
import { register, login, Post } from '../controller/user.Controller.js'; // Importing controller functions

// Creating a router instance
const router = express.Router();

// Defining routes for registration, login, and creating posts
router.post('/register', register); // Route for user registration
router.post('/login', login); // Route for user login
router.post('/post', Post); // Route for creating a new post

// Exporting the router
export default router;
