import { FastifyRequest } from 'fastify';
import prisma from '@providers/prisma';
import { toNumber } from '@utils/formats';
import { IComment } from './comment.interface';

async function create(
  request: FastifyRequest<{ Body: IComment; Params: { postId: number } }>,
) {
  const { body, params } = request;

  return prisma.comment.create({
    data: {
      content: body.content,
      userId: toNumber(body.userId),
      postId: toNumber(params.postId),
    },
  });
}

async function list(
  request: FastifyRequest<{
    Querystring: {
      page: number;
      limit: number;
      sortBy: string;
    };
  }>,
) {
  const { query } = request;
  const limit = toNumber(query.limit) || 1;
  const page = toNumber(query.page) || 1;
  const order = query.sortBy || 'id';

  const data = await prisma.comment.findMany({
    orderBy: [
      {
        [order]: 'desc',
      },
    ],
    take: limit,
    skip: (page - 1) * limit,
  });

  const count = await prisma.comment.count();

  return {
    count,
    totalPages: Math.ceil(count / limit),
    currentPage: toNumber(page),
    data,
  };
}

export { create, list };
