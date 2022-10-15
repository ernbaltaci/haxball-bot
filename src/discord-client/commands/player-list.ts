import EmojiStore from '../../store/emoji.store';
import { Client, Colors, EmbedBuilder, Message } from 'discord.js';

const ExampleCommand = {
  name: 'oyuncu-listesi',
  func: async function (
    client: Client,
    message: Message,
    args: any[],
    room: any
  ) {
    const playerList = room.getPlayerList();
    if (playerList.length < 1)
      return message.reply({ content: `Şuanda sunucuda kimse yok.` });

    let playerListString: any = [];

    playerList.forEach((element: any) => {
      let team = null;

      element.team === 1 ? 'Kırmızı' : 'Mavi';

      if (element.team === 0) team = 'Takımda Değil.';

      playerListString.push(
        `\`Oyuncu Adı:\` **${element.name}** - \`Takım:\` **${team}**`
      );
    });

    const embed = new EmbedBuilder({
      title: `${EmojiStore.get('info')} | Oyuncu Listesi`,
      color: Colors.Aqua,
      description: `${playerListString.join('\n')}`,
    });

    message.reply({ embeds: [embed] });
  },
};

export default ExampleCommand;
