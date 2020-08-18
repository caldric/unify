import bcrypt from 'bcrypt';
import express, { Request, Response } from 'express';
import User from '../models/user';

const signupRouter = express.Router();

signupRouter.post('/', async (req: Request, res: Response) => {
  // Encrypt password
  req.body.password = bcrypt.hashSync(req.body.password, 10);

  // Create new user
  await User.create(req.body).catch((err) =>
    res.status(400).json({ message: err.message })
  );
  res.status(200).json({ message: 'Successfully created new user' });
});

export default signupRouter;
