import { FastifyReply, FastifyRequest } from 'fastify';
import prisma from '@providers/prisma';
import { toNumber } from '@utils/formats';
import { ILikePost } from './likePost.interface';

async function create(
  request: FastifyRequest<{
    Params: { userId: number; postId: number };
  }>,
  reply: FastifyReply,
) {
  const { params } = request;

  const like = await prisma.likePost.findFirst({
    where: {
      userId: toNumber(params.userId),
      postId: toNumber(params.postId),
    },
  });

  if (!like) {
    return prisma.likePost.create({
      data: {
        userId: toNumber(params.userId),
        postId: toNumber(params.postId),
      },
    });
  }
  reply.statusCode = 400;
  return { message: 'vous aimez déjà ce post' };
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

  const data = await prisma.likePost.findMany({
    orderBy: [
      {
        [order]: 'desc',
      },
    ],
    take: limit,
    skip: (page - 1) * limit,
  });

  const count = await prisma.likePost.count();

  return {
    count,
    totalPages: Math.ceil(count / limit),
    currentPage: toNumber(page),
    data,
  };
}

// get all likes of a post
async function listByPost(
  request: FastifyRequest<{
    Querystring: {
      page: number;
      limit: number;
    };
    Params: {
      postId: string;
    };
  }>,
) {
  const { query, params } = request;
  const limit = toNumber(query.limit) || 5000;

  const data = await prisma.likePost.findMany({
    where: {
      postId: toNumber(params.postId),
    },
    take: limit,
  });

  const count = await prisma.likePost.count({
    where: {
      postId: toNumber(params.postId),
    },
    take: limit,
  });

  return {
    data,
    count,
  };
}

// get all likes of a post
async function listByUser(
  request: FastifyRequest<{
    Querystring: {
      page: number;
      limit: number;
    };
    Params: {
      userId: string;
    };
  }>,
) {
  const { query, params } = request;
  const limit = toNumber(query.limit) || 5000;

  const data = await prisma.likePost.findMany({
    where: {
      userId: toNumber(params.userId),
    },
    take: limit,
  });

  return {
    data,
  };
}

async function remove(
  request: FastifyRequest<{
    Params: {
      postId: string;
      userId: string;
    };
  }>,
  reply: FastifyReply,
) {
  const like = await prisma.likePost.findFirst({
    where: {
      postId: toNumber(request.params.postId),
      userId: toNumber(request.params.userId),
    },
  });

  if (!like) {
    reply.statusCode = 404;
    return {};
  }

  await prisma.likePost.deleteMany({
    where: {
      postId: toNumber(request.params.postId),
      userId: toNumber(request.params.userId),
    },
  });
  reply.statusCode = 204;
  return;
}

export { create, list, listByPost, listByUser, remove };
