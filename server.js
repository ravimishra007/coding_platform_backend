// Import necessary modules
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

// Import routes
import adminRoutes from './routes/admin.routes.js';
import userRoutes from './routes/user.routes.js';
import planRoutes from './routes/plan.routes.js';
import couponRoutes from './routes/coupon.routes.js';
import imageKitRoute from './routes/imageKit.js';
import challengeRoutes from './routes/challenge.routes.js';

// Database connection
import { connectionToDb } from './config/user.dbConfig.js';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors({
    origin: 'http://localhost:3000',  
    credentials: true
  }));

// Middleware setup
app.use(express.json());


// Base route
app.get('/', (req, res) => {
  res.send("Welcome to the Mediverse");
});


app.use('/api/challenges', challengeRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);
app.use('/api/plans', planRoutes);
app.use('/api/coupons', couponRoutes);
app.use('/api/image', imageKitRoute);






// Start the server and connect to the database
app.listen(port, async () => {
  try {
    await connectionToDb();
    console.log(`Server is running on port ${port}`);
  } catch (error) {
    console.error("Unable to connect to the database", error);
    process.exit(1);  // Exit with failure if DB connection fails
  }
});
