import { Client, Message } from "discord.js";
import CommandStore from "../store/CommandStore";
import fs from "node:fs";

const commandFiles = fs
  .readdirSync(`${__dirname}/../commands`)
  .filter((file: any) => file.endsWith(".ts"));

for (const file of commandFiles) {
  const command = require(`${__dirname}/../commands/${file}`);
  CommandStore.set(command.default.name, command);
}

module.exports = async function (client: Client) {
  client.on("messageCreate", async (message: Message) => {
    const prefix = process.env.PREFIX as string;

    if (!message.content.startsWith(prefix)) return;

    const [name, ...args] = message.content
      .slice(prefix.length)
      .trim()
      .split(/ +/g);

    const command = CommandStore.get(name);
    if (!command) return;

    try {
      // @ts-ignore:next-line
      await command.default.func(client, message, args, player, db);
    } catch (error) {
      console.error(error);
    }
  });

  console.log("Command Manager running");
};
