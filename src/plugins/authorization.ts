import fp from 'fastify-plugin';
import { IFastify } from '@utils/fastifyInterface';
import { FastifyReply, FastifyRequest } from 'fastify';

async function authenticate(fastify: IFastify) {
  fastify.decorate(
    'authenticate',
    async function (request: FastifyRequest, reply: FastifyReply) {
      try {
        await request.jwtVerify();
      } catch (err) {
        reply.send(err);
      }
    },
  );
}

export default fp(authenticate);
