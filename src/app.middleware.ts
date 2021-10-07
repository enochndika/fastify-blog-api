import jwt from 'fastify-jwt';
import FastifyFormidable from 'fastify-formidable';
import { IFastify } from '@utils/fastifyInterface';
import fastifyCors from 'fastify-cors';

function middlewares(fastify: IFastify) {
  fastify.register(fastifyCors, {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  });

  fastify.register(FastifyFormidable, {
    addContentTypeParser: true,
    formidable: {
      maxFileSize: 3840 * 2160,
      uploadDir: './src/assets',
      keepExtensions: true,
    },
  });

  fastify.register(jwt, {
    secret: process.env.JWT_SECRET || '12345',
  });

  fastify.register(import('@plugins/authorization'));
  fastify.register(import('@plugins/adminResource'));
}

export default middlewares;
