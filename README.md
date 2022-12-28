
# 🤖 Juno Discord Bot
Juno is a Discord chat bot designed and built during Hack the North 2022 to help users manage their productivity. With Juno, users can create and manage to-do and gratitude lists, track their progress, and switch between different productivity modes.

## 🧰 Stack
- TypeScript
- MongoDB
- Discord.js

## 🎉 Features
- To-do list management
- Gratitude list management
- Motivational quote generation
- Productivity mode, a user mode that disables distractions and a person's ability to chat until toggled off
- Scalable and modular design for efficient feature development

## 🎥 Demo
You can see a demo of Juno in action by watching the YouTube video at [https://youtu.be/_AtP857OUw0?t=38](https://youtu.be/_AtP857OUw0?t=38).

## 🚀 Getting Started
To get started with Juno, you will need to set up a MongoDB database and create a Discord bot. Then, you can clone this repository and install the dependencies using npm:

```bash
git clone https://github.com/rtseitin/juno.git
cd juno
npm install
```
Next, you will need to create a `.env` file in the root directory of the project and set the following environment variables:
```
BOT_TOKEN=your_discord_bot_token
MONGODB_URI=your_mongodb_uri
```

Finally, you can start the bot by running the following command:
```bash
npm start
```