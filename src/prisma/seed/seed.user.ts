import * as faker from 'faker';
import avatars from '../../utils/avatars';
import prisma from '../../providers/prisma';

async function seedUser() {
  for (let a = 0; a < 50; a++) {
    const avatar = Math.floor(Math.random() * avatars.length);
    const randomAvatar = avatars[avatar];

    await prisma.user.create({
      data: {
        username: faker.name.firstName().toLowerCase(),
        fullName: faker.name.firstName() + ' ' + faker.name.lastName(),
        password: 'secret',
        avatar: randomAvatar,
        createdAt: faker.date.between('2020-02-01', '2020-03-01'),
      },
    });
  }
}

export default seedUser;
