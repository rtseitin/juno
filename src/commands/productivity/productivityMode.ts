import { Command } from '../../Interfaces';
import { ServiceUser } from '../../structures/ServiceUser';

export const command: Command = {
  name: 'prod-mode',
  description: 'Toggles productivity mode.',
  aliases: ['pm'],
  run: async (client, message, args) => {
    const user = await ServiceUser.get(message.author.id);

    user.productivityMode = !user.productivityMode;
    user.save();

    message.reply(`Productivity mode has been toggled to: \`${user.productivityMode ? 'on' : 'off'}\``)
  }
}