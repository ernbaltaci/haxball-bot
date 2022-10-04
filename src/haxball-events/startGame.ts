
import UserAccount from '@/store/haxball/user-account.store';
import { Client } from 'discord.js';

import MatchStatus from '@/store/haxball/match-status';

import start1v1 from './start-game/1v1';
import start1v1YS from './start-game/1v1-YS';
import startFor1Player from './start-game/1-player';
import start2v2 from './start-game/2v2';
import start3v3 from './start-game/3v3';

const matchStatus = MatchStatus.get('match') as
  | 'WAITING_PLAYER'
  | 'STARTING'
  | 'STARTED'
  | 'PAUSED';

interface PLAYER {
  id: number;
  name: string;
}

const startGame = (room: any, client: Client, player: any) => {
  const loggedUserCount = UserAccount.filter((x) => x === 'LOGGED').size;

  if (loggedUserCount === 1) startFor1Player(room, client);
  else if (loggedUserCount === 2) start1v1(room, client);
  else if (loggedUserCount === 3) start1v1(room, client);
  else if (loggedUserCount === 4) start2v2(room, client);
  else if (loggedUserCount === 5) start2v2(room, client);
  else if (loggedUserCount === 6) start3v3(room, client);


  return false
};

export { startGame };
