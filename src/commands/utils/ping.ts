import { Command } from '../../Interfaces';

export const command: Command = {
  name: 'ping',
  description: 'This command tells you the current ping of the bot',
  aliases: ['pong'],
  run: async (client, message, args) => {
    message.channel.send(`\`${client.ws.ping}ms\` ping!`);
  }
}