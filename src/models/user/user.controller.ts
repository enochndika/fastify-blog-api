import { FastifyReply, FastifyRequest } from 'fastify';
import { IUser } from './user.interface';
import prisma from '@providers/prisma';
import { toNumber } from '@utils/formats';

async function read(
  request: FastifyRequest<{ Params: { username: string } }>,
  reply: FastifyReply,
) {
  const { username } = request.params;

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
    select: {
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

async function list() {
  return prisma.user.findMany({
    select: {
      username: true,
      password: false,
      fullName: true,
      role: true,
    },
  });
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
  const user = await prisma.user.update({
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

export { create, list, remove, read, update };
