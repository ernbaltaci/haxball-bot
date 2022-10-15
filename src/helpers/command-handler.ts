import { Client, Message } from 'discord.js';
import CommandStore from '../store/CommandStore';
import fs from 'node:fs';
import HaxballCommandStore from '@/store/haxball-command.store';

// discord bot commands
const commandFiles = fs.readdirSync(`${__dirname}/../discord-client/commands`);

for (const file of commandFiles) {
  const command = require(`../discord-client/commands/${file}`);
  CommandStore.set(command.default.name, command);
}

// haxbal commands
const haxballCommandFiles = fs.readdirSync(
  `${__dirname}/../haxball-client/commands`
);

for (const file of haxballCommandFiles) {
  const command = require(`${__dirname}/../haxball-client/commands/${file}`);
  HaxballCommandStore.set(command.default.name, command);
}

module.exports = async function (client: Client, room: any) {
  client.on('messageCreate', async (message: Message) => {
    const prefix = process.env.BOT_PREFIX as string;

    if (!message.content.startsWith(prefix)) return;

    const [name, ...args] = message.content
      .slice(prefix.length)
      .trim()
      .split(/ +/g);

    const command = CommandStore.get(name);
    if (!command) return;

    try {
      // @ts-ignore:next-line
      await command.default.func(client, message, args, room);
    } catch (error) {
      console.error(error);
    }
  });

  console.log('Command Manager running');
};
