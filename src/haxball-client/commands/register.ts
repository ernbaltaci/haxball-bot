import { prisma } from '@/lib/prisma';
import {
  AuthStatus,
  ColorPicker,
  EmojiPicker,
  HaxballCommadHandlerInterface,
  StylePicker,
} from '@/types';
import { Client } from 'discord.js';
import sendAnnouncement from '../helpers/room-send-announcement';
import bcrypt from 'bcrypt';
import PlayerStore from '@/store/player.store';

const RegisterCommand = {
  name: 'kayıt',
  isFilter: true,
  func: async function (
    client: Client,
    user: HaxballCommadHandlerInterface,
    args: any[],
    room: RoomObject
  ) {
    let player = user.player;

    const typedPassword = args[0] as string;

    if (!typedPassword || typedPassword.length < 4) {
      return sendAnnouncement(
        room,
        EmojiPicker.CROSS,
        `Hatalı bir şifre girdin, ${player.name}!`,
        player.haxballId,
        ColorPicker.RED,
        StylePicker.BOLD
      );
    }

    const hashPassword = await bcrypt.hash(typedPassword, 10);

    try {
      await prisma.user.create({
        data: {
          username: player.name,
          password: hashPassword,
        },
      });
    } catch (error) {
      room.kickPlayer(
        player.haxballId,
        'Kayıt sırasında bir sorun yaşandı.',
        false
      );
      console.log(
        `${player.name} adlı oyuncuyu kayıt ederken bir sorun yaşandı. ${error}`
      );
    }

    player.authStatus = AuthStatus.LOGGED;

    PlayerStore.set(player.name, player);

    return sendAnnouncement(
      room,
      EmojiPicker.CHECK,
      `Giriş başarılı, ${player.name}!`,
      player.haxballId,
      ColorPicker.GREEN,
      StylePicker.BOLD
    );
  },
};

export default RegisterCommand;
