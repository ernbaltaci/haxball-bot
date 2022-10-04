import { Headless } from 'haxball.js';

const onRoomLink = (room: RoomObject) =>
  (room.onRoomLink = (url: string) => {
    console.log(url);
  });

export default onRoomLink;
