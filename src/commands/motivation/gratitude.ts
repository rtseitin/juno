import { MessageEmbed } from 'discord.js';
import { Command } from '../../Interfaces'
import { ServiceUser } from '../../structures/ServiceUser';

export const command: Command = {
  name: 'gratitude',
  description: 'This command lets you manage your gratitudes.',
  run: async (client, message, args) => {
    if (args.length === 0) {
      const user = await ServiceUser.get(message.author.id);
      const embed = new MessageEmbed()
        .setColor('#fff0be')
        .setTitle(`${message.author.tag} | Graditute List`)
        .setThumbnail(client.user.displayAvatarURL())
        .setFooter(`Use "${client.config.prefix}${command.name} add <gratitude>" to add a gratitude, or "${client.config.prefix}${command.name} remove <index>" to remove one.`)

        if (user.todos.length > 0) {
          embed.setDescription(user.gratitudes.map((gratitude, i) => `**[${i+1}]** ${gratitude}`).join('\n'))
        } else {
          embed.setDescription('You have no items on your graditute list!')
        }

      message.reply({ embeds: [embed] });
    } else {
      if (args[0] === 'add') {
        const gratitudeItem = args.slice(1).join(' ');

        const user = await ServiceUser.get(message.author.id);
        user.gratitudes.push(gratitudeItem);
        user.save();

        message.reply({ content: `"\`${gratitudeItem}\`" has been added to your gratitude list!` })
      } else if (args[0] === 'remove') {
        const index = Number(args[1]);
        if (isNaN(index)) return message.reply('Please make sure that you enter a valid number as an argumnet.');

        const user = await ServiceUser.get(message.author.id);
        if (user.gratitudes.length === 0) return message.reply('You have no items on your graditute list.')
        if (index < 1 || index > user.gratitudes.length) return message.reply(`Please enter a number from \`1\` - \`${user.gratitudes.length}\` to remove.`);

        message.reply(`Removed index \`${index}\`, or "\`${user.gratitudes[index-1]}\`" from your graditute list!`);

        user.gratitudes = user.gratitudes.filter((gratitude, i) => i !== index-1);
        user.save();
      } else message.reply({ content: `Please use either \`${client.config.prefix}${command.name} remove <index>\` or \`${client.config.prefix}${command.name} add <todo item>\`` });
    }
  }
}