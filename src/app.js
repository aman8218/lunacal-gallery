import express from 'express';
import cors from 'cors';
import connectDB from './db.js'; // Use `import` to import your connectDB function
import uploadRoutes from './routes.js'; // Make sure this matches the export in routes.js
import { configDotenv } from 'dotenv';
configDotenv()

// Connect to the database
const db = async () => {
    try {
      await connectDB(); // Call the connectDB function
    } catch (error) {
      console.error("Error in connecting the database:", error);
    }
  };

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/images', uploadRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
db();
