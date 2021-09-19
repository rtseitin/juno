import { Event, Command } from '../Interfaces';
import { Message, MessageEmbed } from 'discord.js';
import { ServiceUser } from '../structures/ServiceUser';

export const event: Event = {
  name: 'messageCreate',
  run: async (client, message: Message) => {
    if (!message.author.bot) new ServiceUser(message.author.id);
    const databaseSetup = await ServiceUser.get(message.author.id);

    if (databaseSetup &&
      databaseSetup.productivityMode === true &&
      !message.content.startsWith(client.config.prefix) &&
      !message.author.bot
    ) {
      const embed = new MessageEmbed()
        .setColor('#fff0be')
        .setThumbnail(client.user.displayAvatarURL())
        .setTitle(`You have productivity mode on, so stay on track and don't send messages on Discord! 😠`)
        .setDescription(`You can use \`${client.config.prefix}prod-mode\` to turn it off.`);

      return message.reply({ embeds: [embed] });
    }

    if (
      message.author.bot ||
      !message.guild ||
      !message.content.startsWith(client.config.prefix)
    ) return;

    const args = message.content
      .slice(client.config.prefix.length)
      .trim()
      .split(/ +/g);

    const cmd = args.shift().toLowerCase();
    if (!cmd) return;

    if (cmd && !databaseSetup) return message.reply('Setting up your user data in the database, please use the command again.');

    const command = client.commands.get(cmd) || client.aliases.get(cmd);
    if (command) (command as Command).run(client, message, args);
  }
}