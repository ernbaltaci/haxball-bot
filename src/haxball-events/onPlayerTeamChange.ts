import EmojiStore from '@/store/EmojiStore';
import UserAccount from '@/store/haxball/user-account.store';
import { Client, Collection } from 'discord.js';
import { sendMessageToDiscord } from '../helpers/send-message-to-discord';

interface TEAM {
  name: string;
  team: number;
  admin: boolean;
  position: any;
}

const GameInfoStatusCooldown = new Collection();

const cooldownTime = 5_000;

const onPlayerTeamChange = (room: any, client: Client) => {
  room.onPlayerTeamChange = (changedPlayer: any, byPlayer: any) => {
    const isLogged = UserAccount.get(changedPlayer.name);

    if (isLogged !== 'LOGGED') {
      room.setPlayerTeam(changedPlayer.id, 0);

      if (isLogged === 'REGISTER')
        return room.sendAnnouncement(
          `${EmojiStore.get(
            'cross'
          )} | Bu işlem için sunucuya kayıt olmanız gerekli! \n ${EmojiStore.get(
            'resume'
          )} !kayıt şifre`,
          changedPlayer.id,
          0xFF0000,
          'normal'
        );

      if (isLogged === 'LOGIN')
        return room.sendAnnouncement(
          `${EmojiStore.get(
            'cross'
          )} | Bu işlem için sunucuya giriş yapmanız gerekli! \n ${EmojiStore.get(
            'resume'
          )} !giriş şifre`,
          changedPlayer.id,
          process.env.RED_EMBED_COLOR,
          'normal'
        );
    }



    //     const team1 = playerList.filter((x: TEAM) => x.team === 1) as any[];

    //     const team2 = playerList.filter((x: TEAM) => x.team === 2);

    //     const requiredPlayer = process.env.REQUIRED_PLAYER as unknown as number;

    // if (team1.length >= requiredPlayer && team2.length >= requiredPlayer) {
    //   room.startGame();

    //   return room.sendAnnouncement(
    //     `${EmojiStore.get('tada')} | Oyun başladı.`,
    //     null,
    //     process.env.GREEN_EMBED_COLOR,
    //     'normal'
    //   );
    // } else {
    //   const cooldown = GameInfoStatusCooldown.get('cooldown_info') as number;

    //   if (cooldown > Date.now()) return;

    //   GameInfoStatusCooldown.set('cooldown_info', Date.now() + cooldownTime);

    //   // BOTH REQUIRED PLAYER ANNOUCMENT
    //   if (team1.length < requiredPlayer && team2.length < requiredPlayer)
    //     return room.sendAnnouncement(
    //       `${EmojiStore.get(
    //         'info'
    //       )} | Oyunun başlaması için için ${EmojiStore.get(
    //         'red_circle'
    //       )} KIRMIZI takıma ${
    //         requiredPlayer - team1.length
    //       } oyuncu; ${EmojiStore.get('blue_circle')} MAVI takıma ${
    //         requiredPlayer - team2.length
    //       } oyuncu kadar gerekli.`,
    //       null,
    //       0x0000ff,
    //       'normal'
    //     );

    //   // RED TEAM REQUIRED PLAYER ANNOUCMENT

    //   if (team1.length < requiredPlayer) return;
    //   room.sendAnnouncement(
    //     `${EmojiStore.get('info')} | Oyunun başlaması için ${EmojiStore.get(
    //       'red_circle'
    //     )} KIRMIZI takıma ${requiredPlayer - team1.length} oyuncu gerekli.`,
    //     null,
    //     0x0000ff,
    //     'normal'
    //   );

    //   // BLUE TEAM REQUIRED PLAYER ANNOUCMENT

    //   if (team2.length < requiredPlayer)
    //     return room.sendAnnouncement(
    //       `${EmojiStore.get('info')} | Oyunun başlaması için ${EmojiStore.get(
    //         'blue_circle'
    //       )} MAVI takıma ${requiredPlayer - team1.length} oyuncu gerekli.`,
    //       null,
    //       0x0000ff,
    //       'normal'
    //     );
    // }
  };
};
export default onPlayerTeamChange;
