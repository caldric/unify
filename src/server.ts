// Imports
import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import apiRouter from './controllers/api';

// Config
const app = express();
const PORT = process.env.PORT || 8080;
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

// Middleware
app.use(express.json());

// Routes
app.use('/api', apiRouter);
app.get('/*', (_, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});

// Listener
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
