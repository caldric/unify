import bcrypt from 'bcrypt';
import express, { Request, Response } from 'express';
import User from '../models/user';

const loginRouter = express.Router();

loginRouter.post('/', async (req: Request, res: Response) => {
  try {
    // Find user
    const user = await User.findOne({ email: req.body.email });

    // If user is found, look for a password and match it
    const passwordMatches = user
      ? bcrypt.compareSync(req.body.password, user.password)
      : false;

    // Send back user email as a response
    if (user && passwordMatches) {
      // req.session.user = user;
      res.status(200).json({ user: user.email, message: 'Login successful' });
    } else {
      res.status(400).json({ user: '', message: 'Invalid email or password' });
    }
  } catch (error) {
    console.log(`Error: ${error.message}`);
    res.status(400).json({ user: '', message: error.message });
  }
});

export default loginRouter;
