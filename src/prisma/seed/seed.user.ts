import * as faker from 'faker';
import avatars from '../../utils/avatars';
import prisma from '../../providers/prisma';

async function seedUser() {
  const avatar = Math.floor(Math.random() * avatars.length);
  const randomAvatar = avatars[avatar];

  for (let i = 0; i < 100; i++) {
    await prisma.user.create({
      data: {
        username: faker.name.firstName().toLowerCase(),
        fullName: faker.name.firstName() + ' ' + faker.name.lastName(),
        password: 'secret',
        avatar: randomAvatar,
      },
    });
  }
}

export default seedUser;
