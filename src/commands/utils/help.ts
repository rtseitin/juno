import { MessageEmbed } from 'discord.js';
import { Command } from '../../Interfaces';

export const command: Command = {
  name: 'help',
  description: 'This command list all the commands offered by the bot',
  aliases: ['h'],
  run: async (client, message, args) => {
    const embed = new MessageEmbed()
      .setTitle(`Commands`)
      .setDescription('The following are commands offered by the bot to help better your life')
      .setColor('#fff0be')
      .setThumbnail(message.author.displayAvatarURL())
      .setTimestamp()
      .setFooter(client.user.username, client.user.displayAvatarURL())
      .setFields({
        name: 'Motivations',
        value: '`gratitude`, `quote`'
      }, {
        name: 'Productivity',
        value: '`prod-mode`, `todo`'
      }, {
        name: 'Utils',
        value: '`help`, `ping`, `profile`'
      });

    message.reply({ embeds: [embed] });
  }
}