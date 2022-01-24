import { Publisher, Subjects, OrderCreatedEvent } from '@freddycruger/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
}
