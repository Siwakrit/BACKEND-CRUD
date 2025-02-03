import express from 'express';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import userRouter from './routes/userRoutes.js';

const app = express();
const port = process.env.PORT || 4000;
// Connect to database
connectDB();

// Middleware
app.use(express.json()); // Parse JSON request body

// Routes
app.use('/api/users', userRouter);

app.get("/", (req, res) => {
    res.send("API Working NA 🥹🥹🥹");
})

// Start server
app.listen(port, () => {
    console.log(`🔥Server running on port ${port} 🤩`);
});


