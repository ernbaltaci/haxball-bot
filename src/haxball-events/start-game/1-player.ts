import MatchStatus from '@/store/haxball/match-status';
import LoggedUser from '@/store/haxball/logged-user.store';
import map2v2 from '@/lib/haxball/maps/map-2v2';
import { startGame } from '../startGame';

const matchStatus = MatchStatus.get('match') as
  | 'WAITING_PLAYER'
  | 'STARTING'
  | 'STARTED'
  | 'PAUSED';

const startFor1Player = async (room: any, client: any) => {
    const playerListArray: any = [];
    const map2v2Txt = map2v2();

    LoggedUser.map((x: any) => {
        playerListArray.push(x);
      });

      playerListArray.slice(0, 1).forEach((x: any) => {
        room.setPlayerTeam(x.id, 1);
      });

    room.setCustomStadium(map2v2Txt);
    room.setScoreLimit(1);

    room.startGame();

    MatchStatus.set('match', 'STARTED');
  return false;
};

export default startFor1Player;
