import prisma from '../../providers/prisma';

const data = ['Business', 'Science', 'Sport', 'Nature'];

async function seedCategory() {
  for (const name of data) {
    await prisma.category.create({
      data: {
        name,
      },
    });
  }
}

export default seedCategory;
