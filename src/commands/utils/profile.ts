import { MessageEmbed } from 'discord.js';
import { Command } from '../../Interfaces';
import { ServiceUser } from '../../structures/ServiceUser';
import axios from 'axios';

export const command: Command = {
  name: 'profile',
  description: 'This command shows you your productivity and motivation profile.',
  aliases: ['p'],
  run: async (client, message, args) => {
    const user = await ServiceUser.get(message.author.id);

    const embed = new MessageEmbed()
      .setTitle(`${message.author.username} | Productivity/Motivation Dashboard`)
      .setDescription('Welcome to your productivity/motivation dashobard, a place that aims to help you live a more productive life and motivates you to live life to the fullest!\n')
      .setColor('#fff0be')
      .setThumbnail(message.author.displayAvatarURL())
      .setTimestamp()
      .setFooter(client.user.username, client.user.displayAvatarURL())
      .addFields({
        name: '\u200B',
        value: '\u200B'
      }, {
        name: 'To-Do List',
        value: user.todos.length > 0 ? user.todos.map((todo, i) => `**[${i+1}]** ${todo}`).join('\n') : 'You have no items on your to-do list!',
        inline: true
      }, {
        name: 'Gratitude',
        value: user.gratitudes.length > 0 ? user.gratitudes.map((gratitude, i) => `**[${i+1}]** ${gratitude}`).join('\n') : 'You have no items on your graditute list!',
        inline: true
      }, {
        name: 'Productivity Mode',
        value: user.productivityMode ? '\`on\`' : '\`off\`',
        inline: true
      }, {
        name: '\u200B',
        value: '\u200B'
      });

    await axios.get('https://zenquotes.io/api/random')
      .then(res => {
        const { q, a } = res.data[0];
        embed.addField('Quote', `"${q}" -${a}`);
      });

    message.reply({ embeds: [embed] });
  }
}