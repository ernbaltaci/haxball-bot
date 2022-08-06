import { prisma } from "@/lib/prisma";
import UserAccount from '@/store/haxball/user-account.store';
import { Client } from "discord.js";
import { sendMessageToDiscord } from "../helpers/send-message-to-discord";

const onPlayerJoin = (room: any, client: Client) => {
  room.onPlayerJoin = async (player: any) => {
    // Send Message Info Message
    sendMessageToDiscord(
      client,
      process.env.GUILD_ID as string,
      process.env.SERVER_LOG_CHANNEL_ID as string,
      `Sunucuya Katıldı -> ${player.name} `
    );


    const getUser = await prisma.user.findUnique({ where: { username: player.name } });

    // User Register Check
    !getUser && UserAccount.set(player.name, 'REGISTER')

    getUser && UserAccount.set(player.name, 'LOGIN')

    console.log(UserAccount.get(player.name))
  };
};
export default onPlayerJoin;
