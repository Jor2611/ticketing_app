import express, { Request, Response } from 'express';
import { currentUser } from '@freddycruger/common';

const router = express.Router();

router.post(
  '/api/users/signout',
  currentUser,
  async (req: Request, res: Response) => {
    req.session = null;
    res.send({});
  }
);

export { router as signoutRouther };
