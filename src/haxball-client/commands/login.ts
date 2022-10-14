import { Client } from 'discord.js';

const LoginCommand = {
  name: 'giriş',
  isFilter: true,
  func: async function (
    client: Client,
    user: any,
    args: any[],
    room: RoomObject
  ) {},
};

export default LoginCommand;
