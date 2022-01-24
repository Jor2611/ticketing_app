import { requireAuth } from '@freddycruger/common';
import { Request, Response, Router } from 'express';
import { Ticket } from '../models/Ticket';

const router = Router();

router.get('/api/tickets', async (req: Request, res: Response) => {
  let tickets = await Ticket.find({ orderId: undefined });

  res.status(200).send(tickets);
});

export { router as listTicketsRouter };
