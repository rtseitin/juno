import { Command } from '../../Interfaces';
import { MessageEmbed } from 'discord.js';
import axios from 'axios';

export const command: Command = {
  name: 'quote',
  description: 'Sends a message with a motivating quote.',
  run: async (client, message, args) => {
    axios.get('https://zenquotes.io/api/random')
      .then(res => {
        const embed = new MessageEmbed()
          .setColor('#fff0be')
          .setThumbnail(client.user.displayAvatarURL())
          .setTitle(`"${res.data[0].q}"`)
          .setDescription(`- ${res.data[0].a}`)
          .setFooter(`${client.user.username} | Motivational Quote`);

        message.reply({ embeds: [embed] });
      }).catch(err => console.log(err));
  }
}