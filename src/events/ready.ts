import { Event } from '../Interfaces';
import { IUser } from '../interfaces/User';

export const event: Event = {
  name: 'ready',
  run: async (client) => {
    console.log(`${client.user.tag} is online!`);
  }
}