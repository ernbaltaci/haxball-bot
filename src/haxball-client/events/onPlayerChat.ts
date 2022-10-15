import PlayerStore from '@/store/player.store';
import {
  AuthStatus,
  ColorPicker,
  EmojiPicker,
  PlayerInterface,
  StylePicker,
} from '@/types';
import { Client } from 'discord.js';
import LoginCommand from '../commands/login';
import commandHandler from '../helpers/command-handler';
import sendAnnouncement from '../helpers/room-send-announcement';

const onPlayerChat = (room: RoomObject, client: Client) =>
  (room.onPlayerChat = (player: PlayerObject, message: string) => {
    const getPlayer = PlayerStore.get(player.id) as PlayerInterface;
    const command = commandHandler(message);

    // COMMAND HANDLER
    if (command.isCommand) {
      const userObj = {
        player: getPlayer,
        message,
      };
      // @ts-ignore:next-line
      command.command.default.func(client, userObj, command.args, room);

      if (command.command.default.isFilter) return false;
    }

    !getPlayer &&
      room.kickPlayer(player.id, 'Giriş bilgileriniz bulunamadı.', false);

    // KULLANICININ GİRİŞ YAPIP YAPMADIĞINI KONTROL ETME
    if (getPlayer.authStatus !== AuthStatus.LOGGED) {
      sendAnnouncement(
        room,
        EmojiPicker.CROSS,
        `Devam edebilmek için giriş yapmalısın, ${player.name}! Giriş yapabilmek için: ${process.env.HAXBALL_PREFIX}${LoginCommand.name}`,
        player.id,
        ColorPicker.RED,
        StylePicker.BOLD
      );

      return false;
    }

    return true;
  });

export default onPlayerChat;
