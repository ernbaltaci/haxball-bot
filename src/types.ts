export enum ColorPicker {
  RED = 0xff0000,

  GREEN = 0x00ff00,

  DEFAULT = 0xfff,
}

export enum StylePicker {
  NORMAL = 'NORMAL',

  BOLD = 'BOLD',
}

export enum EmojiPicker {
  CROSS = '❌',

  CHECK = '✅',

  WARNING = '⚠️',

  NEW = '🆕',
}

export enum AuthStatus {
  REGISTER = 'REGISTER',
  LOGIN = 'LOGIN',
  LOGGED = 'LOGGED',
}
export interface PlayerInterface {
  id: number;
  haxballId: number;
  name: string;
  team: TeamID;
  admin: boolean;
  position: { x: number; y: number };
  auth: string;
  conn: string;
  authStatus: AuthStatus;
  username: string;
  password: string;
  role: string;
  isAdmin: boolean;
  isBanned: boolean;
  isMuted: boolean;
  playCount: number;
  goalCOunt: number;
  assistCount: number;
  winCount: number;
  loseCount: number;
  tieCount: number;
}

export interface HaxballCommadHandlerInterface {
  player: PlayerInterface;
  message: string;
}
