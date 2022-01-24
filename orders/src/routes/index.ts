import { requireAuth } from '@freddycruger/common';
import { Request, Response, Router } from 'express';
import { Order } from '../models/Order';

const router = Router();

router.get('/api/orders', requireAuth, async (req: Request, res: Response) => {
  const orders = await Order.find({ userId: req.currentUser!.id }).populate(
    'ticket'
  );

  res.status(200).send(orders);
});

export { router as indexOrderRouter };
