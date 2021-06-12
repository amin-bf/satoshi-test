import { IUserRegisteredEvent, Listener, Subjects } from "@satoshi/common";
import { User } from "../../models/user";

export class UserRegisteredEventListener extends Listener<IUserRegisteredEvent> {
  subject: Subjects.UserRegistered = Subjects.UserRegistered;
  queueGroupName: string = "data-service";
  async onMessage(
    data: { id: string; name: string; age: number; score: number },
    msg: any
  ): Promise<void> {
    try {
      const user = User.build({
        _id: data.id,
        age: data.age,
        name: data.name,
        score: data.score,
      });

      await user.save();

      msg.ack();
    } catch (error) {
      console.log(error);
    }
  }
}
