


const chatSystem = (room: any, player: any, message: String, user: any) => {


    let color = null;
    let tag = user.role as any;

    // RANK PICKER
    switch (user.role) {
      case 'Beginner':
        color = 0xffffff;
        break;
      case 'HAVARI':
        color = 0x0e2beb;
        break;
      case 'ADMIN':
        color = 0x41d6e0;
        break;
      case 'KURUCU':
        color = 0xf5a556;
        tag = '🎪 Kurucu';
        break;
      case 'SUNUCU_SAHIBI':
        color = 0xf01818;
        tag = 'Sunucu Sahibi';
        break;
      case 'VIPADMIN':
        color = 0x2000ff;
        tag = '💎 VIPADMIN';
        break;
      case 'YONETICI':
        color = 0x2bf016;
        break;
    }

    room.sendAnnouncement(
      `[ ${tag} ] ${player.name}: ${message}`,
      undefined,
      color,
      'normal'
    );



}

export default chatSystem