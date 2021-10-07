import { FastifyReply, FastifyRequest } from 'fastify';
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
  const limit = toNumber(query.limit) || 10;
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

// find all comments of a post
async function listByPost(
  request: FastifyRequest<{
    Querystring: {
      page: number;
      limit: number;
      sortBy: string;
    };
    Params: {
      postId: string;
    };
  }>,
) {
  const { query, params } = request;
  const limit = toNumber(query.limit) || 10;
  const page = toNumber(query.page) || 1;
  const order = query.sortBy || 'id';

  const data = await prisma.comment.findMany({
    where: {
      postId: toNumber(params.postId),
    },
    orderBy: [
      {
        [order]: 'desc',
      },
    ],
    take: limit,
    skip: (page - 1) * limit,
    include: {
      post: {
        select: {
          id: true,
          description: true,
          createdAt: true,
        },
      },
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

  const count = await prisma.comment.count({
    where: {
      postId: toNumber(params.postId),
    },
  });

  return {
    count,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
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
  return prisma.comment.updateMany({
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
  await prisma.comment.deleteMany({
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
  await prisma.comment.delete({
    where: {
      id: toNumber(request.params.id),
    },
  });
  reply.statusCode = 204;
  return;
}

export { create, list, listByPost, removeByAdmin, remove, update };
