import { Publisher, Subjects, TicketUpdatedEvent } from '@freddycruger/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
