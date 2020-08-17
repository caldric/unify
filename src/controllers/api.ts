import express from 'express';
import { combineGroceries } from '../models/groceries';

// Config
const apiRouter = express.Router();

// Routes
apiRouter.post('/', (req, res) => {
  // Obtain input from client
  const { input }: { input: string } = req.body;

  // Run input through main logic function
  const combinedGroceries = combineGroceries(input);

  // Send response
  res.status(200).json({
    message: 'Post request successful',
    output: combinedGroceries,
    input,
  });
});

export default apiRouter;
