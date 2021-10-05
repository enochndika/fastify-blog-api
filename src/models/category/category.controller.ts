import { FastifyReply, FastifyRequest } from 'fastify';
import prisma from '@providers/prisma';
import { toNumber } from '@utils/formats';
import { ICategory, ICategoryParams } from './category.interface';

async function list() {
  return prisma.category.findMany();
}

async function create(request: FastifyRequest<{ Body: ICategory }>) {
  const { name } = request.body;

  return prisma.category.create({
    data: {
      name,
    },
  });
}

async function update(
  request: FastifyRequest<{ Body: ICategory; Params: ICategoryParams }>,
) {
  return prisma.category.update({
    where: {
      id: toNumber(request.params.id),
    },
    data: {
      name: request.body.name,
    },
  });
}

async function remove(
  request: FastifyRequest<{ Params: ICategoryParams }>,
  reply: FastifyReply,
) {
  const data = await prisma.category.delete({
    where: {
      id: toNumber(request.params.id),
    },
  });
  reply.statusCode = 204;
  return data;
}

export { create, list, remove, update };
