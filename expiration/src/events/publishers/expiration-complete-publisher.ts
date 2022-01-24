import {
  ExpirationCompleteEvent,
  Publisher,
  Subjects,
} from '@freddycruger/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete;
}
