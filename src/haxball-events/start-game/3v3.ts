import MatchStatus from '@/store/haxball/match-status';
import LoggedUser from '@/store/haxball/logged-user.store';
import map3v3 from '@/lib/haxball/maps/map-2v2';
import { startGame } from '../startGame';

const matchStatus = MatchStatus.get('match') as
  | 'WAITING_PLAYER'
  | 'STARTING'
  | 'STARTED'
  | 'PAUSED';

const start3v3 = async (room: any, client: any) => {
  const playerList = room.getPlayerList() as any[];
  const playerListArray: any = [];
  const map3v3Txt = map3v3();

  if (matchStatus === 'STARTED') {
    playerList.forEach((x: any) => {
      room.setPlayerTeam(x.id, 0);
    });

    await room.stopGame();
  }

  LoggedUser.map((x: any) => {
    playerListArray.push(x);
  });

  if (playerListArray.length !== 6) {
    MatchStatus.set('match', 'WAITING_PLAYER');
    playerList.forEach((x: any) => {
      room.setPlayerTeam(x.id, 0);
    });
    room.stopGame();
    return startGame(room, client, undefined);
  }

  playerListArray.slice(0, 3).forEach((x: any) => {
    room.setPlayerTeam(x.id, 1);
  });

  playerListArray.slice(3, 6).forEach((x: any) => {
    room.setPlayerTeam(x.id, 2);
  });

  room.setCustomStadium(map3v3Txt);

  MatchStatus.set('match', 'STARTED');

  room.startGame();

  return false;
};

export default start3v3;
