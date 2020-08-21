import express, { Request, Response } from 'express';
import User from '../models/user';

const logoutRouter = express.Router();

logoutRouter.put('/', async (req: Request, res: Response) => {
  try {
    // Find user
    const user = await User.findOneAndUpdate(
      { email: req.body.email },
      { loggedIn: false }
    );
    if (!user) throw new Error('User not found');

    // Send back response
    res
      .status(200)
      .json({ message: 'Logout successful', loggedIn: false, user: '' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default logoutRouter;
