import { TicketCreatedEvent } from '@freddycruger/common';
import mongoose from 'mongoose';
import { Message } from 'node-nats-streaming';
import { Ticket } from '../../../models/Ticket';
import { natsWrapper } from '../../../nats-wrapper';
import { TicketCreatedListener } from '../ticket-created-listener';

const setup = async () => {
  //create an instance of the listener

  const listener = new TicketCreatedListener(natsWrapper.client);

  //create fake data object
  const data: TicketCreatedEvent['data'] = {
    id: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    title: 'concert',
    price: 10,
    userId: new mongoose.Types.ObjectId().toHexString(),
  };

  //create fake message object
  //@ts-ignore
  //to ignore other items in message we dont care
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, msg, data };
};

it('creates and saves a ticket', async () => {
  const { listener, data, msg } = await setup();
  //call the onMessage function with these objects
  await listener.onMessage(data, msg);
  //write asserstions to make sure a ticket wa created!
  const ticket = await Ticket.findById(data.id);
  expect(ticket).toBeDefined();
  expect(ticket!.title).toEqual(data.title);
  expect(ticket!.price).toEqual(data.price);
});

it('acks a message', async () => {
  const { listener, data, msg } = await setup();
  //call the onMessage function with these objects
  await listener.onMessage(data, msg);
  //write asserstions to make sure a ticket wa created!

  expect(msg.ack).toHaveBeenCalled();
  //write assertions to check message ack
});
