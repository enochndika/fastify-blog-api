import fp from 'fastify-plugin';
import { IFastify } from '@utils/fastifyInterface';
import { FastifyReply, FastifyRequest } from 'fastify';

type UserAuth = {
  username: string;
  role: string;
  iat: number;
  exp: number;
  iss: string;
};
const ADMIN = 'admin';

async function adminResource(fastify: IFastify) {
  fastify.decorate(
    'adminResource',
    async function (request: FastifyRequest, reply: FastifyReply) {
      try {
        const user = (await request.user) as UserAuth;
        if (user?.role !== ADMIN) {
          reply.statusCode = 403;
          reply.send(
            'Access denied. request forbidden by administrative rules',
          );
        }
      } catch (err) {
        reply.send(err);
      }
    },
  );
}

export default fp(adminResource);
