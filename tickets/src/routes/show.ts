import { Request, Response, Router } from 'express';
import { Ticket } from '../models/Ticket';
import { requireAuth, NotFoundError } from '@freddycruger/common';

const router = Router();

router.get(
  '/api/tickets/:id',
  requireAuth,
  async (req: Request, res: Response) => {
    let ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      throw new NotFoundError();
    }
    res.status(200).send(ticket);
  }
);

export { router as showTicketsRouter };
