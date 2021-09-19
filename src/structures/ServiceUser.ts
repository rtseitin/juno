import { IUser } from '../interfaces/User';
import User from '../Schemas/User';

class ServiceUser {
  constructor(id: string) {
    User.find({
      id
    }, async (err, docs) => {
      if (docs.length) return;
      const user = new User({
        id,
        todos: [],
        productivityMode: false
      });

      user.save();
    });
  }

  public static async get(id: string): Promise<IUser | null> {
    const user: IUser | null = await User.findOne({ id });
    return user;
  }
}

export { ServiceUser };