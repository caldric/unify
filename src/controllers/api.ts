import express from 'express';

const apiRouter = express.Router();

apiRouter.get('/', (req, res) => {
  res.status(200).json({ message: 'Get request received' });
});

apiRouter.post('/', (req, res) => {
  res.status(200).json({ message: 'Post request received' });
});

export default apiRouter;
