import { PaymentCreatedEvent, Publisher, Subjects } from '@freddycruger/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
}
