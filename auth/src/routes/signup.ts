import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { BadRequestError, validateRequest } from '@freddycruger/common';
import { User } from '../models/User';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('Email Field must be type of email'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 22 })
      .withMessage('Password characters must be between 4 and 22'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError('Email in use!');
    }

    const user = User.build({ email, password });
    await user.save();

    const userJwt = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET!
    );

    req.session = {
      jwt: userJwt,
    };

    return res.status(201).send(user);
  }
);

export { router as signupRouther };
