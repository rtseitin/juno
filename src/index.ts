import { config } from 'dotenv';
import { JunoClient } from './structures/JunoClient';

config({ path: './.env' });

new JunoClient({
  token: process.env.BOT_TOKEN,
  mongoURI: process.env.MONGO_URI,
  prefix: "!"
}).init();