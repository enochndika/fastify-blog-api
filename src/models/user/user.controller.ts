import { FastifyReply, FastifyRequest } from "fastify";
import { IUser } from "./user.interface";
import prisma from "@providers/prisma";
import { toNumber } from "@utils/formats";

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

async function remove(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  await prisma.user.delete({
    where: {
      id: toNumber(request.params.id),
    },
  });
  reply.statusCode = 204;
  return;
}

export { create, list, remove };
