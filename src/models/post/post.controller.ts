import { FastifyRequest } from 'fastify';
import prisma from '@providers/prisma';
import { toNumber } from '@utils/formats';
import { IPost, IPostAuthorId } from './post.interface';

async function create(
  request: FastifyRequest<{ Body: IPost; Params: IPostAuthorId }>,
) {
  const { body, params } = request;

  return prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      fakeContent: body.fakeContent,
      description: body.description,
      image: body.image,
      vip: body.vip,
      promoted: body.promoted,
      read_time: toNumber(body.read_time),
      authorId: toNumber(params.authorId),
      categoryId: toNumber(body.categoryId),
    },
  });
}

async function list() {
  return prisma.post.findMany();
}

export { create, list };
