import * as categoryController from './category.controller';
import { IFastify } from '@utils/fastifyInterface';

async function categoryService(fastify: IFastify) {
  fastify.get('/', categoryController.list);
  fastify.post(
    '/',
    {
      preValidation: [fastify.authenticate, fastify.adminResource],
    },
    categoryController.create,
  );

  fastify.put(
    '/:id',
    {
      preValidation: [fastify.authenticate, fastify.adminResource],
    },
    categoryController.update,
  );

  fastify.delete(
    '/:id',
    {
      preValidation: [fastify.authenticate, fastify.adminResource],
    },
    categoryController.remove,
  );
}

export default categoryService;
