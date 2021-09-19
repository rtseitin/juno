import { Client, Collection, Intents } from 'discord.js';
import { Command } from '../interfaces/Command';
import { Config } from '../interfaces/Config';
import path from 'path';
import { readdirSync } from 'fs';
import { connect } from 'mongoose';

class JunoClient extends Client {
  public commands: Collection<string, Command> = new Collection();
  public events: Collection<string, Event> = new Collection();
  public aliases: Collection<string, Command> = new Collection();
  public config: Config;

  constructor(options: { token, mongoURI, prefix }) {
    super({
      intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
      ]
    });

    this.config = options;
  }

  public async init() {
    this.login(this.config.token);
    connect(this.config.mongoURI);

    this.commandHandler();
    this.eventHandler();
  }

  private commandHandler() {
    const commandPath = path.join(__dirname, '..', 'commands');
    readdirSync(commandPath).forEach((dir) => {
      const commands = readdirSync(`${commandPath}/${dir}`).filter((file) => file.endsWith('.js'));

      for (const file of commands) {
        const { command } = require(`${commandPath}/${dir}/${file}`);
        this.commands.set(command.name, command);

        if (command?.aliases && command?.aliases.length !== 0) {
          command.aliases.forEach((alias) => {
            this.aliases.set(alias, command);
          });
        }
      }
    });

  }

  private eventHandler() {
    const eventPath = path.join(__dirname, '..', 'events');
    readdirSync(eventPath).forEach(async (file) => {
      const { event } = await import(`${eventPath}/${file}`);
      this.events.set(event.name, event);
      this.on(event.name, event.run.bind(null, this));
    });
  }
}

export { JunoClient };