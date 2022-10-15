import { ColorPicker, EmojiPicker, StylePicker } from '@/types';

const sendAnnouncement = (
  room: RoomObject,
  emoji: EmojiPicker,
  message: string,
  playerId: number | undefined = undefined,
  color: ColorPicker,
  style: StylePicker
) => {
  room.sendAnnouncement(`${emoji} ${message}`, playerId, color, style);
};

export default sendAnnouncement;
