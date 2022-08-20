import MatchStatus from '@/store/haxball/match-status';
import LoggedUser from '@/store/haxball/logged-user.store';
import map2v2 from '@/lib/haxball/maps/map-2v2';
import { startGame } from '../startGame';
import UserAccount from '@/store/haxball/user-account.store';

const matchStatus = MatchStatus.get('match') as
  | 'WAITING_PLAYER'
  | 'STARTING'
  | 'STARTED'
  | 'PAUSED';

const start2v2YS = async (
  room: any,
  client: any,
  winnerTeamPlayerList: any | [] = undefined,
  loserTeamPlayerList: any | [] = undefined
) => {
  const playerList = room.getPlayerList() as any[];
  const playerListArray: any = [];
  const map2v2Txt = map2v2();

  LoggedUser.map((x: any) => {
    playerListArray.push(x);
  });

  if (playerListArray.length !== 5) {
    console.log(1);
    MatchStatus.set('match', 'WAITING_PLAYER');
    playerList.forEach((x: any) => {
      room.setPlayerTeam(x.id, 0);
    });
    room.stopGame();
    return startGame(room, client, undefined);
  }

  if (winnerTeamPlayerList && winnerTeamPlayerList.length !== 2) {
    MatchStatus.set('match', 'WAITING_PLAYER');
    playerList.forEach((x: any) => {
      room.setPlayerTeam(x.id, 0);
    });
    room.stopGame();
    return startGame(room, client, undefined);
  }

  if (loserTeamPlayerList && loserTeamPlayerList.length !== 2) {
    MatchStatus.set('match', 'WAITING_PLAYER');
    console.log(loserTeamPlayerList, 'LOSER_LIST');

    playerList.forEach((x: any) => {
      room.setPlayerTeam(x.id, 0);
    });
    room.stopGame();
    return startGame(room, client, undefined);
  }

  winnerTeamPlayerList.forEach((x: any) => {
    room.setPlayerTeam(x.id, 1);
  });

  const randomLoserPlayer =
    loserTeamPlayerList[Math.floor(Math.random() * loserTeamPlayerList.length)];

  room.setPlayerTeam(randomLoserPlayer.id);

  const spectate = playerList.filter((x) => x.team === 0);

  const spactateUserIsLogged = UserAccount.get(spectate[0]?.name);

  if (spactateUserIsLogged !== 'LOGGED') {
    MatchStatus.set('match', 'WAITING_PLAYER');
    startGame(room, client, null);
    return false;
  }

  room.setPlayerTeam(spectate[0]?.id, 2);

  room.setCustomStadium(map2v2Txt);

  if (LoggedUser.size !== 5) {
    MatchStatus.set('match', 'WAITING_PLAYER');
    return startGame(room, client, undefined);
  }

  MatchStatus.set('match', 'STARTED');

  room.startGame();

  if (
    playerList.filter((x) => x.team === 1).length > 1 ||
    playerList.filter((x) => x.team === 2).length > 1
  ) {
    playerList.forEach((x) => {
      room.setPlayerTeam(x.id, 0);
    });

    room.stopGame();
    MatchStatus.set('match', 'WAITING_PLAYER');
    return startGame(room, client, undefined);
  }

  return false;
};

export default start2v2YS;
