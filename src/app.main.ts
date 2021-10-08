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

dotenv.config();

function main(opts = {}) {
  const app = fastify(opts);

  middlewares(app);

  app.get('/', async () => {
    return 'Welcome!';
  });

  services.forEach((service) => {
    app.register(service.name, { prefix: service.prefix });
  });

  return app;
}

export default main;
