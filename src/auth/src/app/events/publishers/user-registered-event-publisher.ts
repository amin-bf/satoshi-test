import { IUserRegisteredEvent, Publisher, Subjects } from "@satoshi/common";

export class UserRegisteredEventPublisher extends Publisher<IUserRegisteredEvent> {
  subject: Subjects.UserRegistered = Subjects.UserRegistered;
}
