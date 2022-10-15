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

const LoginCommand = {
  name: 'giriş',
  isFilter: true,
  func: async function (
    client: Client,
    user: HaxballCommadHandlerInterface,
    args: any[],
    room: RoomObject
  ) {
    let player = user.player;

    const typedPassword = args[0] as string;

    if (
      !typedPassword ||
      typedPassword.length < parseInt(process.env.MIN_PASWORD_LENGTH as string)
    ) {
      return sendAnnouncement(
        room,
        EmojiPicker.CROSS,
        `Hatalı bir şifre girdin, ${player.name}!`,
        player.haxballId,
        ColorPicker.RED,
        StylePicker.BOLD
      );
    }

    const userFromDb = await prisma.user.findUnique({
      where: { username: player.name },
    });

    if (!userFromDb)
      return room.kickPlayer(
        player.haxballId,
        'Veritabanında gerekli bilgiler bulunamadı.',
        false
      );

    const isCorrect = await bcrypt.compare(typedPassword, userFromDb?.password);

    if (!isCorrect) {
      return sendAnnouncement(
        room,
        EmojiPicker.CROSS,
        `Yanlış şifre girdin, ${player.name}`,
        player.haxballId,
        ColorPicker.RED,
        StylePicker.BOLD
      );
    }

    player.authStatus = AuthStatus.LOGGED;

    PlayerStore.set(player.name, player);

    return sendAnnouncement(
      room,
      EmojiPicker.CHECK,
      `Giriş başarılı, ${player.name}`,
      player.haxballId,
      ColorPicker.GREEN,
      StylePicker.BOLD
    );
  },
};

export default LoginCommand;
