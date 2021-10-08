import * as faker from 'faker';
import prisma from '../../providers/prisma';

const data = ['Business', 'Science', 'Sport', 'Nature'];

async function seedCategory() {
  for (const name of data) {
    await prisma.category.create({
      data: {
        name,
        createdAt: faker.date.between('2020-01-10', '2020-01-15'),
      },
    });
  }
}

export default seedCategory;
