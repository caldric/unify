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
    if (!userDocument) throw new Error('User not found');

    // Delete pre-existing shopping list
    await ShoppingList.deleteMany({ userID: userDocument._id });

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
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

apiRouter.get('/:email', async (req: Request, res: Response) => {
  try {
    // Obtain user ID
    const user = await User.findOne({ email: req.params.email });
    if (!user) throw new Error('User not found');

    // Send back shopping list as the response
    const shoppingList = await ShoppingList.findOne({ userID: user._id });
    res.status(200).json({
      message: 'Successfully retrieved shopping list',
      shoppingList: shoppingList ? shoppingList : {},
    });
  } catch (err) {
    res.status(400).json({ message: err.message, shoppingList: {} });
  }
});

apiRouter.delete('/:email', async (req: Request, res: Response) => {
  try {
    // Obtain user ID
    const user = await User.findOne({ email: req.params.email });
    if (!user) throw new Error('User not found');

    // Send back shopping list as the response
    const shoppingList = await ShoppingList.deleteMany({ userID: user._id });
    res.status(200).json({ message: 'Successfully deleted shopping list' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default apiRouter;
