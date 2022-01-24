import { Ticket } from '../Ticket';

it('implements optimistic concurrency control', async () => {
  // Create an instance
  const ticket = Ticket.build({
    title: 'concert',
    price: 5,
    userId: '123',
  });
  //Save ticket to db
  await ticket.save();

  //fetch the ticket twice
  const firstTicket = await Ticket.findById(ticket.id);
  const secondTicket = await Ticket.findById(ticket.id);

  //make two separate changes to tickets
  firstTicket!.set({ price: 10 });
  secondTicket!.set({ price: 15 });

  // save the first fetched ticket
  await firstTicket!.save();

  // save the second fetched ticket
  try {
    await secondTicket!.save();
  } catch (err) {
    console.log(err);
    return;
  }

  throw new Error('Should not reach this point');
});

it('increments version value after each update', async () => {
  const ticket = Ticket.build({
    title: 'concert',
    price: 5,
    userId: '123',
  });

  await ticket.save();
  expect(ticket.version).toEqual(0);
  await ticket.save();
  expect(ticket.version).toEqual(1);
  await ticket.save();
  expect(ticket.version).toEqual(2);
});
