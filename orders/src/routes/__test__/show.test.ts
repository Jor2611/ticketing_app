import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/Ticket';
import mongoose from 'mongoose';

it('fetches the order', async () => {
  // Create a ticket
  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: 'concert',
    price: 20,
  });

  await ticket.save();

  const user = global.signin();

  // Create an order for this ticket
  const { body: createdOrder } = await request(app)
    .post(`/api/orders/`)
    .set('Cookie', user)
    .send({ ticketId: ticket.id })
    .expect(201);

  // Fetch the order
  const { body: fetchedOrder } = await request(app)
    .get(`/api/orders/${createdOrder.id}`)
    .set('Cookie', user)
    .expect(200);

  expect(fetchedOrder.id).toEqual(createdOrder.id);
});

it('returns an error if user tries to fetch another users order', async () => {
  // Create a ticket
  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: 'concert',
    price: 20,
  });

  await ticket.save();

  const user = global.signin();

  // Create an order for this ticket
  const { body: createdOrder } = await request(app)
    .post(`/api/orders/`)
    .set('Cookie', user)
    .send({ ticketId: ticket.id })
    .expect(201);

  // Fetch the order
  const { body: fetchedOrder } = await request(app)
    .get(`/api/orders/${createdOrder.id}`)
    .set('Cookie', global.signin())
    .expect(401);
});
