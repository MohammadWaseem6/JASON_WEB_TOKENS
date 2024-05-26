import express from 'express';
import authRoutes from './route/authRoutes.js';


const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World');
});

// app.use('/auth', authRoutes);

app.listen(port, () => {
    console.log(`Listening at port: ${port}`);
});
