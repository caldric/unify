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
        // section: combinedGroceries.section,
        // contents: combinedGroceries.,
      });
      await shoppingList.save();
    }

    // Send response
    res.status(200).json({
      message: 'Post request successful',
      output: combinedGroceries,
      input,
    });
  } catch (error) {
    console.log(`Error: ${error.message}`);
    res.status(400).json({ message: error.message });
  }
});

export default apiRouter;
