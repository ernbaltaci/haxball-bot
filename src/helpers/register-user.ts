import UserAccount from '@/store/haxball/user-account.store';

const registerUser = (username: string, password: string) => {
  UserAccount.set(username, 'LOGGED');

  return;
};

export default registerUser
