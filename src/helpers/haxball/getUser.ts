import { prisma } from '@/lib/prisma';
import CacheUser from '@/store/haxball/CacheUser';

const getUser = (name: string) => {
  const cachedUser = CacheUser.get(name) as any;

  if (cachedUser && cachedUser.username && cachedUser.cachedTime < Date.now())
    CacheUser.set(name, undefined);

  if (cachedUser && cachedUser.username) return cachedUser;

  const user = prisma.user
    .findUnique({
      where: { username: name },
    })
    .then((x) => {
      const cachedUserObject = {
        username: x?.username,
        isAdmin: x?.isAdmin,
        banned: x?.isBanned,
        role: x?.role,
        id: x?.id,
        cachedTime: Date.now() + 30_000,
      };
      CacheUser.set(name, cachedUserObject);

      return x;
    });
};

export default getUser;
