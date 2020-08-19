import express, { Request, Response } from 'express';
import { combineGroceries } from '../models/groceries';
import ShoppingList from '../models/shoppingList';
import User from '../models/user';

// Config
const apiRouter = express.Router();

// Routes
apiRouter.post('/', async (req: Request, res: Response) => {
  // Obtain input from client
  const { input, user }: { input: string; user: string } = req.body;

  // Run input through main logic function
  const combinedGroceries = combineGroceries(input);

  try {
    // Obtain user document
    const userDocument = await User.findOne({ email: user });

    if (userDocument) {
      // Create shopping list
      const shoppingList = new ShoppingList({
        userID: userDocument._id,
        items: combinedGroceries,
      });
      await shoppingList.save();

      // Send response
      res.status(200).json({
        message: 'Post request successful',
        output: combinedGroceries,
        input,
      });
    } else {
      throw new Error('User not found');
    }
  } catch (err) {
    console.log(`Error: ${err.message}`);
    res.status(400).json({ message: err.message });
  }
});

apiRouter.get('/', async (req: Request, res: Response) => {
  try {
    // Obtain user ID
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      // Send back shopping list as the response
      const shoppingList = await ShoppingList.findOne({ userID: user._id });
      res.status(200).json({
        message: 'Successfully retrieved shopping list',
        shoppingList,
      });
    } else {
      throw new Error('User not found');
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default apiRouter;
