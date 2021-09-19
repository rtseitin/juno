import { JunoClient } from "../structures/JunoClient";
import { Message } from 'discord.js';

interface Run {
  (client: JunoClient, message: Message, args: Array<string>);
}

export interface Command {
  name: string;
  description: string;
  aliases?: Array<string>;
  run: Run;
}