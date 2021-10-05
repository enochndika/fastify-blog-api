import * as faker from 'faker';
import prisma from '../../providers/prisma';
import pictures from '../../utils/pictures';
import { toNumber } from '../../utils/formats';

const picture = Math.floor(Math.random() * pictures.length);
const randomPicture = pictures[picture];

async function seedAll() {
  for (let b = 0; b < 100; b++) {
    await prisma.post.create({
      data: {
        title: faker.commerce.productName(),
        fakeContent: faker.lorem.paragraphs(7),
        content: faker.lorem.paragraphs(7),
        description: faker.lorem.paragraph(),
        authorId: toNumber(faker.finance.amount(1, 10, 0)),
        categoryId: toNumber(faker.finance.amount(1, 4, 0)),
        image: [randomPicture],
        read_time: toNumber(faker.finance.amount(1, 8, 0)),
        vip: false,
        promoted: false,
      },
    });
  }
}

async function seedPromotedPosts() {
  for (let b = 0; b < 25; b++) {
    await prisma.post.create({
      data: {
        title: faker.commerce.productName(),
        fakeContent: faker.lorem.paragraphs(7),
        content: faker.lorem.paragraphs(7),
        description: faker.lorem.paragraph(),
        authorId: toNumber(faker.finance.amount(1, 10, 0)),
        categoryId: toNumber(faker.finance.amount(1, 4, 0)),
        image: [randomPicture],
        read_time: toNumber(faker.finance.amount(1, 8, 0)),
        vip: false,
        promoted: true,
      },
    });
  }
}

async function seedVipPosts() {
  for (let d = 0; d < 25; d++) {
    await prisma.post.create({
      data: {
        title: faker.commerce.productName(),
        fakeContent: faker.lorem.paragraphs(7),
        content: faker.lorem.paragraphs(7),
        description: faker.lorem.paragraph(),
        authorId: toNumber(faker.finance.amount(1, 10, 0)),
        categoryId: toNumber(faker.finance.amount(1, 4, 0)),
        image: [randomPicture],
        read_time: toNumber(faker.finance.amount(1, 8, 0)),
        vip: true,
        promoted: false,
      },
    });
  }
}

async function seedPosts() {
  await Promise.all([seedAll(), seedVipPosts(), seedPromotedPosts()]);
}

export default seedPosts;
