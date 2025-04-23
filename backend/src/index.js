import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectToDatabase } from './database/index.js';
import { userRouter } from './routers/user-router.js'; 
import { aiRouter } from './routers/ai-router.js';
import { companyRouter } from './routers/company-router.js';


dotenv.config(); 

const app = express();
const PORT = 9000;

app.use(cors());
app.use(express.json());

connectToDatabase();

app.use('/user', userRouter);
app.use('/ai', aiRouter)
app.use('/company', companyRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
  });
  
  export default app;