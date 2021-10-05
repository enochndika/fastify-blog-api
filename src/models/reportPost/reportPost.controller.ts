import { FastifyReply, FastifyRequest } from 'fastify';
import prisma from '@providers/prisma';
import { toNumber } from '@utils/formats';
import { IReportPost } from './reportPost.interface';

async function create(
  request: FastifyRequest<{
    Body: IReportPost;
    Params: { postId: number; userId: number };
  }>,
) {
  const { body, params } = request;

  return prisma.reportPost.create({
    data: {
      subject: body.subject,
      userId: toNumber(params.userId),
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

  const data = await prisma.reportPost.findMany({
    orderBy: [
      {
        [order]: 'desc',
      },
    ],
    take: limit,
    skip: (page - 1) * limit,
  });

  const count = await prisma.reportPost.count();

  return {
    count,
    totalPages: Math.ceil(count / limit),
    currentPage: toNumber(page),
    data,
  };
}

async function remove(
  request: FastifyRequest<{
    Params: {
      id: string;
    };
  }>,
  reply: FastifyReply,
) {
  await prisma.reportPost.delete({
    where: {
      id: toNumber(request.params.id),
    },
  });
  reply.statusCode = 204;
  return;
}

export { create, list, remove };
