// Imports
import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import apiRouter from './controllers/api';

import signupRouter from './controllers/signup';
import loginRouter from './controllers/login';

// Config
const local = {
  port: 8080,
  mongoURI: 'mongodb://localhost:27017/unify',
  clientURL: 'http://localhost:3000',
};
const deployment = {
  port: process.env.PORT,
  mongoURI: process.env.MONGODB_URI,
};
const app = express();
const PORT = deployment.port || local.port;
const MONGODB_URI = deployment.mongoURI || local.mongoURI;

// Connect to MongoDB via Mongoose
mongoose.connection.on('error', (error) => console.log(error.message));
mongoose.connection.on('disconnected', () => console.log('Mongo disconnected'));
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
mongoose.connection.once('open', () => {
  console.log('Connected to Mongoose');
});

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'client', 'build')));
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '..', 'client', 'build')));
}

// Routes
app.use('/api', apiRouter);
app.use('/api/signup', signupRouter);
app.use('/api/login', loginRouter);
app.get('/*', (_, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});

// Listener
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
