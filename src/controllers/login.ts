import bcrypt from 'bcrypt';
import express, { Request, Response } from 'express';
import User from '../models/user';

const loginRouter = express.Router();

loginRouter.post('/', async (req: Request, res: Response) => {
  // Find user
  const user = await User.findOne({
    email: req.body.email,
  }).catch((err) => res.status(400).json({ user: '', message: err.message }));

  // If user is found, look for a password and match it
  const passwordMatches = user
    ? //@ts-ignore
      bcrypt.compareSync(req.body.password, user.password)
    : false;

  // Store user on session
  if (user && passwordMatches) {
    // req.session.user = user;
    //@ts-ignore
    res.status(200).json({ user: user.email, message: 'Login successful' });
  } else {
    res.status(400).json({ user: '', message: 'Invalid email or password' });
  }
});

export default loginRouter;
