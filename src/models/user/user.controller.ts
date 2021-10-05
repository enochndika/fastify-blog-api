import { FastifyReply, FastifyRequest } from 'fastify';
import { IUser } from './user.interface';
import prisma from '@providers/prisma';
import { toNumber } from '@utils/formats';

async function findUnique(
  request: FastifyRequest<{ Params: { username: string } }>,
  reply: FastifyReply,
) {
  const { username } = request.params;

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
      username: true,
      password: false,
      fullName: true,
      role: true,
    },
  });

  if (!user) {
    reply.statusCode = 404;
    return {};
  }
  return user;
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

  const data = await prisma.user.findMany({
    orderBy: [
      {
        [order]: 'desc',
      },
    ],
    take: limit,
    skip: (page - 1) * limit,
    select: {
      id: true,
      username: true,
      password: false,
      fullName: true,
      role: true,
    },
  });

  const count = await prisma.user.count();

  return {
    count,
    totalPages: Math.ceil(count / limit),
    currentPage: toNumber(page),
    data,
  };
}

async function create(request: FastifyRequest<{ Body: IUser }>) {
  const { body } = request;

  return prisma.user.create({
    data: {
      username: body.username,
      password: body.password,
      fullName: body.fullName,
      role: body.role,
    },
  });
}

async function update(
  request: FastifyRequest<{ Body: IUser; Params: { id: string } }>,
) {
  await prisma.user.update({
    where: {
      id: toNumber(request.params.id),
    },
    data: {
      fullName: request.body.fullName,
    },
  });

  return { status: 'success', message: 'User updated' };
}

async function remove(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
) {
  await prisma.user.delete({
    where: {
      id: toNumber(request.params.id),
    },
  });
  reply.statusCode = 204;
  return;
}

export { create, list, remove, findUnique, update };
