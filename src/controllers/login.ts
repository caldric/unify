import bcrypt from 'bcrypt';
import express, { Request, Response } from 'express';
import User from '../models/user';

const loginRouter = express.Router();

loginRouter.put('/', async (req: Request, res: Response) => {
  try {
    // Find user
    const user = await User.findOneAndUpdate(
      { email: req.body.email },
      { loggedIn: true }
    );

    // If user is found, look for a password and match it
    const passwordMatches = user
      ? bcrypt.compareSync(req.body.password, user.password)
      : false;

    // Send back user email as a response
    if (user && passwordMatches) {
      // req.session.user = user;
      res.status(200).json({
        user: user.email,
        loggedIn: true,
        message: 'Login successful',
      });
    } else {
      throw new Error('Invalid email or password');
    }
  } catch (err) {
    res.status(400).json({ user: '', message: err.message });
  }
});

loginRouter.get('/status/:email', async (req: Request, res: Response) => {
  // Extract email argument from URL
  const { email } = req.params;

  try {
    const user = await User.findOne({ email });
    if (!user) throw new Error('User not found');

    res.status(200).json({
      message: 'Login status successfully obtained',
      loggedIn: user.loggedIn,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default loginRouter;
