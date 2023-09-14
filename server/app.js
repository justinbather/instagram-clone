import express from 'express';
import connectDB from './config/db.js';
import cors from 'cors';
import test from "./routes/api/test.js"
import auth from "./routes/api/AuthRoute.js"
import cookieParser from 'cookie-parser';

const app = express();

connectDB(); //Connect to DB

app.use(cors({ origin: true, credentials: true }));

app.use(express.json({ extended: false }));


app.get('/', (req, res) => res.send("Hello"));

app.use(cookieParser());
app.use('/api', test);
app.use('/auth', auth);

const port = process.env.PORT || 8082;

app.listen(port, () => console.log('Server running'))