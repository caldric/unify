import bcrypt from 'bcrypt';
import express from 'express';
import User from '../models/user';

const signupRouter = express.Router();

signupRouter.post('/', async (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, 10);
  console.log(req.body.password);
  await User.create(req.body).catch((err) =>
    res.status(400).json({ message: err.message })
  );
  res.status(200).json({ message: 'Successfully created new user' });
});

export default signupRouter;
