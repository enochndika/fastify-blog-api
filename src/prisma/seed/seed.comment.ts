import * as faker from 'faker';
import prisma from '../../providers/prisma';
import { toNumber } from '../../utils/formats';

async function seedComment() {
  for (let a = 0; a < 100; a++) {
    await prisma.comment.create({
      data: {
        content: faker.lorem.paragraph(),
        userId: toNumber(faker.finance.amount(1, 20, 0)),
        postId: toNumber(faker.finance.amount(1, 22, 0)),
        createdAt: faker.date.between('2021-05-15', '2021-10-01'),
      },
    });
  }
}

export default seedComment;
