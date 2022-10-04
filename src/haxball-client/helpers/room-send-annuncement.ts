import { ColorPicker, EmojiPicker, StylePicker } from '@/types';

const sendAnnouncement = (
  room: RoomObject,
  emoji: EmojiPicker,
  message: string,
  playerId: number | undefined = undefined,
  color: ColorPicker,
  style: StylePicker
) => {
    console.log(emoji)
  room.sendAnnouncement(`${emoji} ${message}`, playerId, color, style);
};

export default sendAnnouncement