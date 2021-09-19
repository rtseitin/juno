import { MessageEmbed } from 'discord.js';
import { Command } from '../../Interfaces'
import { ServiceUser } from '../../structures/ServiceUser';

export const command: Command = {
  name: 'todo',
  description: 'This command lets you manage your todos.',
  run: async (client, message, args) => {
    if (args.length === 0) {
      const user = await ServiceUser.get(message.author.id);
      const embed = new MessageEmbed()
        .setColor('#fff0be')
        .setTitle(`${message.author.tag} | To-Do List`)
        .setThumbnail(client.user.displayAvatarURL())
        .setFooter(`Use "${client.config.prefix}${command.name} add <todo item>" to add a to-do item, or "${client.config.prefix}${command.name} remove <index>" to remove one.`)

        if (user.todos.length > 0) {
          embed.setDescription(user.todos.map((todo, i) => `**[${i+1}]** ${todo}`).join('\n'))
        } else {
          embed.setDescription('You have no items on your to-do list!')
        }

      message.reply({ embeds: [embed] });
    } else {
      if (args[0] === 'add') {
        const todoItem = args.slice(1).join(' ');

        const user = await ServiceUser.get(message.author.id);
        user.todos.push(todoItem);
        user.save();

        message.reply({ content: `"\`${todoItem}\`" has been added to your to-do list!` })
      } else if (args[0] === 'remove') {
        const index = Number(args[1]);
        if (isNaN(index)) return message.reply('Please make sure that you enter a valid number as an argumnet.');

        const user = await ServiceUser.get(message.author.id);
        if (user.todos.length === 0) return message.reply('You have no items on your to-do list.')
        if (index < 1 || index > user.todos.length) return message.reply(`Please enter a number from \`1\` - \`${user.todos.length}\` to remove.`);

        message.reply(`Removed index \`${index}\`, or "\`${user.todos[index-1]}\`" from your to-do list!`);

        user.todos = user.todos.filter((todo, i) => i !== index-1);
        user.save();
      } else message.reply({ content: `Please use either \`${client.config.prefix}${command.name} remove <index>\` or \`${client.config.prefix}${command.name} add <todo item>\`` });
    }
  }
}