const tolerance = 0.01;

function pointDistance(p1: any, p2: any) {
  var d1 = p1.x - p2.x;
  var d2 = p1.y - p2.y;
  return Math.hypot(d1, d2);
}

const triggerDistance = 15 + 6.5 + tolerance;

let lastPlayerTouched: any = undefined;
let lastTouchers: any = [];

const getLastToucher = (room: any) => {
  var ballPosition = room.getBallPosition();
  var players = room
    .getPlayerList()
    .filter((p: { id: any }) => room.getPlayerDiscProperties(p.id) != null);

  if (!players || players.length < 1) return;
  players.forEach((p: any) => {
    if (pointDistance(ballPosition, p.position) < triggerDistance) {
      if (lastTouchers[lastTouchers.length - 1]?.id != p?.id) {
        lastTouchers.push(p);
        lastPlayerTouched = p;
      }
    }
  });

  return { lastPlayerTouched, lastTouchers };
};

export default getLastToucher;
