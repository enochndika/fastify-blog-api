import { FastifyReply, FastifyRequest } from 'fastify';
import prisma from '@providers/prisma';
import { toNumber } from '@utils/formats';
import { IChildComment } from './childComment.interface';

async function create(
  request: FastifyRequest<{
    Body: IChildComment;
    Params: { commentId: number };
  }>,
) {
  const { body, params } = request;

  return prisma.childComment.create({
    data: {
      content: body.content,
      userId: toNumber(body.userId),
      commentId: toNumber(params.commentId),
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

  const data = await prisma.childComment.findMany({
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

// find all child comments of a comment
async function listByComment(
  request: FastifyRequest<{
    Querystring: {
      page: number;
      limit: number;
      sortBy: string;
    };
    Params: {
      commentId: string;
    };
  }>,
) {
  const { query, params } = request;
  const limit = toNumber(query.limit) || 1;
  const page = toNumber(query.page) || 1;
  const order = query.sortBy || 'id';

  const data = await prisma.childComment.findMany({
    where: {
      commentId: toNumber(params.commentId),
    },
    orderBy: [
      {
        [order]: 'desc',
      },
    ],
    take: limit,
    skip: (page - 1) * limit,
    include: {
      user: {
        select: {
          id: true,
          username: true,
          fullName: true,
          avatar: true,
        },
      },
    },
  });

  const count = await prisma.childComment.count({
    where: {
      commentId: toNumber(params.commentId),
    },
  });

  return {
    totalPages: Math.ceil(count / limit),
    currentPage: toNumber(page),
    data,
  };
}

async function update(
  request: FastifyRequest<{
    Params: {
      id: string;
      userId: string;
    };
    Body: {
      content: string;
    };
  }>,
) {
  return prisma.childComment.updateMany({
    where: {
      id: toNumber(request.params.id),
      userId: toNumber(request.params.userId),
    },
    data: {
      content: request.body.content,
    },
  });
}

async function remove(
  request: FastifyRequest<{
    Params: {
      id: string;
      userId: string;
    };
  }>,
  reply: FastifyReply,
) {
  await prisma.childComment.deleteMany({
    where: {
      id: toNumber(request.params.id),
      userId: toNumber(request.params.userId),
    },
  });
  reply.statusCode = 204;
  return;
}

async function removeByAdmin(
  request: FastifyRequest<{
    Params: {
      id: string;
    };
  }>,
  reply: FastifyReply,
) {
  await prisma.childComment.delete({
    where: {
      id: toNumber(request.params.id),
    },
  });
  reply.statusCode = 204;
  return;
}

export { create, list, listByComment, removeByAdmin, remove, update };
