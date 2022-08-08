import { Client } from "discord.js";
import onPlayerChat from "../../haxball-events/onPlayerChat";
import onPlayerJoin from "../../haxball-events/onPlayerJoin";
import onPlayerLeave from "../../haxball-events/onPlayerLeave";

const HaxballJS = require("haxball.js");

const createRoom = (client: Client) =>
  HaxballJS.then(
    async (
      HBInit: (arg0: {
        roomName: string;
        maxPlayers: number;
        public: boolean;
        noPlayer: boolean;
        token: string;
      }) => any
    ) => {
      const room = HBInit({
        roomName: "Haxball.JS",
        maxPlayers: 16,
        public: true,
        noPlayer: true,
        token: process.env.HAXBALL_TOKEN as string,
      });

      room.setDefaultStadium("Big");
      room.setScoreLimit(5);
      room.setTimeLimit(0);

      room.onRoomLink = function (link: any) {
        console.log(link);
      };
      


      //Event handler
      onPlayerChat(room, client);
      onPlayerJoin(room, client);
      onPlayerLeave(room, client);
    }
  );

export default createRoom;
