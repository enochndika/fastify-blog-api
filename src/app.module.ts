import { addAliases } from 'module-alias';

addAliases({
  '@utils': `${__dirname}/utils`,
  '@models': `${__dirname}/models`,
  '@auth': `${__dirname}/auth`,
  '@plugins': `${__dirname}/plugins`,
  '@providers': `${__dirname}/providers`,
});

import fastify from 'fastify';
import 'make-promises-safe';
import dotenv from 'dotenv';
import jwt from 'fastify-jwt';
import services from './app.service';

dotenv.config();

function main(opts = {}) {
  const app = fastify(opts);

  /* Middlewares*/
  app.register(jwt, {
    secret: process.env.JWT_SECRET || '12345',
  });
  app.register(import('@plugins/authorization'));
  app.register(import('@plugins/adminResource'));

  /* Routes Middlewares*/
  services.forEach((service) => {
    app.register(service.name, { prefix: service.prefix });
  });

  return app;
}

export default main;
