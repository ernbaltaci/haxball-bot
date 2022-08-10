import UserAccount from '@/store/haxball/user-account.store';
import { Client } from 'discord.js';
import { sendMessageToDiscord } from '../helpers/send-message-to-discord';
import getLastToucher from './getLastToucher';

const onGameTick = (room: any, client: Client) => {
  room.onGameTick = (player: any) => {
    getLastToucher(room);
  };
};
export default onGameTick;
