import express from 'express';

// Config
const apiRouter = express.Router();

// Main app logic function
const combineGroceries = (groceryList: string): string => {
  return groceryList.toUpperCase();
};

// Routes
apiRouter.post('/', (req, res) => {
  const { input }: { input: string } = req.body;
  const combinedGroceries = combineGroceries(input);
  res.status(200).json({
    message: 'Post request successful',
    output: combinedGroceries,
    input,
  });
});

export default apiRouter;
