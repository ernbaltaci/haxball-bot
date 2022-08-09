import { Client, Message } from "discord.js";

const ExampleCommand = {
  name: "oyuncu-listesi",
  func: async function (client: Client, message: Message, args: any[], room: any) {


    console.log(room.getPlayerList())

  },
};

export default ExampleCommand;
