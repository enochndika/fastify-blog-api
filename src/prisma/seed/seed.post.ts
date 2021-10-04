import * as faker from 'faker';
import prisma from '../../providers/prisma';
import pictures from '../../utils/pictures';
import { toNumber } from '../../utils/formats';

async function seedPost() {
  const picture = Math.floor(Math.random() * pictures.length);
  const randomPicture = pictures[picture];

  for (let i = 0; i < 1000; i++) {
    await prisma.post.create({
      data: {
        title: faker.commerce.productName(),
        fakeContent: faker.lorem.paragraphs(7),
        description: faker.lorem.paragraph(),
        authorId: toNumber(faker.finance.amount(1, 40, 0)),
        categoryId: toNumber(faker.finance.amount(1, 4, 0)),
        image: randomPicture,
        read_time: toNumber(faker.finance.amount(1, 8, 0)),
        vip: false,
        promoted: false,
      },
    });
  }
}

export default seedPost;
