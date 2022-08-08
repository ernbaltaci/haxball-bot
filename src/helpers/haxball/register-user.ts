import { prisma } from '@/lib/prisma';

import bcrypt from 'bcrypt';

const registerUser = async (player: any, password: string) => {
  const hashPassword = await bcrypt.hash(password, 10);

  try {
    await prisma.user.create({
      data: {
        username: player.name,
        password: hashPassword,
      },
    });
  } catch (error) {
    console.log(
      `${player.name} adlı oyuncuyu kayıt ederken bir sorun yaşandı. ${error}`
    );
  }

  return;
};

export default registerUser;
