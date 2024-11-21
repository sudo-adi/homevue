import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './routes/index.js';
import { initDatabase } from './config/database.js';

dotenv.config();
initDatabase()
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors())
app.use('/api/v1', router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
