import MatchStatus from '@/store/haxball/match-status';
import LoggedUser from '@/store/haxball/logged-user.store';
import map2v2 from '@/lib/haxball/maps/map-2v2';
import { startGame } from '../startGame';
import getLastToucher from '../getLastToucher';
import UserAccount from '@/store/haxball/user-account.store';

const matchStatus = MatchStatus.get('match') as
  | 'WAITING_PLAYER'
  | 'STARTING'
  | 'STARTED'
  | 'PAUSED';

const start1v1YS = async (
  room: any,
  client: any,
  winnerTeamPlayerList: any = undefined,
  loserTeamPlayerList: any = undefined
) => {
  const playerList = room.getPlayerList() as any[];
  const playerListArray: any = [];
  const map2v2Txt = map2v2();

  ///
  if (
    winnerTeamPlayerList &&
    loserTeamPlayerList &&
    winnerTeamPlayerList.length > 0 &&
    loserTeamPlayerList.length > 0
  ) {

    const spectate = playerList.filter((x) => x.team === 0);

    const spactateUserIsLogged = UserAccount.get(spectate[0]?.name);

    if (spactateUserIsLogged !== 'LOGGED') {
      MatchStatus.set('match', 'WAITING_PLAYER');
      startGame(room, client, null);
      return false;
    }


    winnerTeamPlayerList.forEach((x: any) => {
      room.setPlayerTeam(x.id, 1);
    });
    room.setPlayerTeam(spectate[0]?.id, 2);

    loserTeamPlayerList.forEach((x: any) => {
      room.setPlayerTeam(x.id, 0);
    });
    MatchStatus.set('match', 'STARTED');

    if (LoggedUser.size !== 3) {
      MatchStatus.set('match', 'WAITING_PLAYER');
      return startGame(room, client, undefined);
    }
    room.setCustomStadium(map2v2Txt);

    room.startGame();
    return false;
  } ///

  LoggedUser.map((x: any) => {
    playerListArray.push(x);
  });

  playerListArray.slice(0, 1).forEach((x: any) => {
    room.setPlayerTeam(x.id, 1);
  });

  playerListArray.slice(1, 2).forEach((x: any) => {
    room.setPlayerTeam(x.id, 2);
  });

  room.setCustomStadium(map2v2Txt);

  if (LoggedUser.size !== 3) {
    MatchStatus.set('match', 'WAITING_PLAYER');
    return startGame(room, client, undefined);
  }

  MatchStatus.set('match', 'STARTED');

  room.startGame();

  return false;
};

export default start1v1YS;
