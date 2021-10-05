import { PrismaClient } from '@prisma/client';
import hashPassword from '../utils/hashPassword';
import slugify from 'slugify';

const prisma = new PrismaClient();

prisma.$use(async (params, next) => {
  const { model, args, action } = params;
  if (model == 'User' && action == 'create') {
    await hashPassword(args);
  }
  if (model == 'Post' && (action == 'create' || action === 'update')) {
    args.data.slug = slugify(args.data.title).toLowerCase();
  }
  return next(params);
});

export default prisma;
