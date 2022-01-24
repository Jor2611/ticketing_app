import { Subjects, Publisher, OrderCancelledEvent } from '@freddycruger/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}
