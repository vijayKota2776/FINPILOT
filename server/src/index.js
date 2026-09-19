import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import waitlistRoutes from './routes/waitlist.js';
import demoRoutes from './routes/demo.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/waitlist', waitlistRoutes);
app.use('/api/demo', demoRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
