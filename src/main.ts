require("dotenv").config();
import { Client, GatewayIntentBits, GuildTextBasedChannel } from "discord.js";
import createRoom from "./helpers/room-create";

const manager = require("./helpers/command-handler");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessages,
  ],
});

client.on("ready", async (client) => {
  console.log(`${client.user!.username} running...`);
});

const sendMessage = async (player: any, message: string) => {
  const guild = client.guilds.cache.get("1002983127020470393");

  const channel = guild?.channels.cache.get(
    "1004827194113146950"
  ) as GuildTextBasedChannel;

  channel.send({ content: `${player.name} -> ${message}` });
};

const bootStrap = async () => {
  manager(client);
  await client.login();
  createRoom(client);
};
bootStrap();
