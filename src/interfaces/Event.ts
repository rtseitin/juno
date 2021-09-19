import { ClientEvents } from 'discord.js';
import { JunoClient } from '../structures/JunoClient';

interface Run {
  (client: JunoClient, ...args: any[]);
}

export interface Event {
  name: keyof ClientEvents;
  run: Run;
}