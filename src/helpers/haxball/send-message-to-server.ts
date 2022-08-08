import EmojiStore from '@/store/EmojiStore';

const RED_EMBED_COLOR = 0xff0000;

const GREEN_EMBED_COLOR = 0x00FF00;


const sendWarningToServer = (
  room: any,
  userId: number | undefined,
  message: string
) => {
  room.sendAnnouncement(
    `${EmojiStore.get('warning')} | ${message} `,
    userId,
    RED_EMBED_COLOR,
    'bold'
  );

};

const sendSuccessToServer = (
  room: any,
  userId: number | undefined,
  message: string
) => {
  room.sendAnnouncement(
    `${EmojiStore.get('tada')} | ${message}`,
    userId,
    GREEN_EMBED_COLOR,
    'bold'
  );
};

export { sendWarningToServer, sendSuccessToServer };
