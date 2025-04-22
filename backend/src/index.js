import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectToDatabase } from './database/index.js';



dotenv.config(); 

const app = express();
const PORT = 9000;

app.use(cors());
app.use(express.json());

connectToDatabase();

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
  });
  
  export default app;