import MatchStatus from '@/store/haxball/match-status';
import LoggedUser from '@/store/haxball/logged-user.store';
import map2v2 from '@/lib/haxball/maps/map-2v2';
import { startGame } from '../startGame';

const matchStatus = MatchStatus.get('match') as
  | 'WAITING_PLAYER'
  | 'STARTING'
  | 'STARTED'
  | 'PAUSED';

const start2v2 = async (room: any, client: any) => {
  const playerList = room.getPlayerList() as any[];
  const playerListArray: any = [];
  const map2v2Txt = map2v2();

  if (matchStatus === 'STARTED') {
    playerList.forEach((x: any) => {
      room.setPlayerTeam(x.id, 0);
    });

    await room.stopGame();
  }

  LoggedUser.map((x: any) => {
    playerListArray.push(x);
  });

  if (playerListArray.length !== 4) {
    MatchStatus.set('match', 'WAITING_PLAYER');
    playerList.forEach((x: any) => {
      room.setPlayerTeam(x.id, 0);
    });
    room.stopGame();
    return startGame(room, client, undefined);
  }

  playerListArray.slice(0, 2).forEach((x: any) => {
    room.setPlayerTeam(x.id, 1);
  });

  playerListArray.slice(2, 4).forEach((x: any) => {
    room.setPlayerTeam(x.id, 2);
  });

  room.setCustomStadium(map2v2Txt);

  MatchStatus.set('match', 'STARTED');

  room.startGame();

  return false;
};

export default start2v2;
