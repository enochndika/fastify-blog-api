import { addAliases } from 'module-alias';

addAliases({
  '@utils': `${__dirname}/utils`,
  '@models': `${__dirname}/models`,
  '@auth': `${__dirname}/auth`,
  '@plugins': `${__dirname}/plugins`,
  '@providers': `${__dirname}/providers`,
});

import fastify from 'fastify';
import dotenv from 'dotenv';
import 'make-promises-safe';
import services from './app.service';
import middlewares from './app.middleware';

dotenv.config({
  path: '.env',
});

function main(opts = {}) {
  const app = fastify(opts);

  middlewares(app);
  services(app);

  app.get('/', async () => {
    return 'Welcome!';
  });

  return app;
}

export default main;
