import UserAccount from '@/store/haxball/user-account.store';
import { Client } from 'discord.js';
import { sendMessageToDiscord } from '../helpers/send-message-to-discord';

interface TEAM {
  name: string;
  team: number;
  admin: boolean;
  position: any;
}

const onPlayerTeamChange = (room: any, client: Client) => {
  room.onPlayerTeamChange = (changedPlayer: any, byPlayer: any) => {
    const isLogged = UserAccount.get(changedPlayer.name) === 'LOGGED';

    if (!isLogged)
      return room.kickPlayer(changedPlayer.id, 'Bunun için giriş yapmalısınız.');

    const playerList = room.getPlayerList() as any[];

    const team1 = playerList.filter((x: TEAM) => x.team === 1) as any[];

    const team2 = playerList.filter((x: TEAM) => x.team === 2);

    const requiredPlayer = process.env.REQUIRED_PLAYER as unknown as number;

    if (team1.length >= requiredPlayer && team2.length >= requiredPlayer) {
      console.log(true);
      room.startGame();
    }
  };
};
export default onPlayerTeamChange;
