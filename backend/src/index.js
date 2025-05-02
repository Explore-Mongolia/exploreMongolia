import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectToDatabase } from './database/index.js';
import { userRouter } from './routers/user-router.js'; 
import { aiRouter } from './routers/ai-router.js';
import { companyRouter } from './routers/company-router.js';
import { destinationRouter } from './routers/destination-router.js';
import { experienceRouter } from './routers/experience-router.js';
import { clerkUserRouter } from './routers/clerk-user.js';
import { processRecords } from "./utils/algoliaSync.js"



dotenv.config(); 

const app = express();
const PORT = 9000;

app.use(cors());
app.use(express.json());

connectToDatabase();
// processRecords()
//   .then(() => console.log('Successfully indexed objects!'))
//   .catch((err) => console.error("hey", err));

app.use('/user', userRouter);
app.use('/ai', aiRouter)
app.use('/company', companyRouter)
app.use('/destination', destinationRouter)
app.use('/experience', experienceRouter)
app.use("/clerk-user", clerkUserRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
  });
  
  export default app;