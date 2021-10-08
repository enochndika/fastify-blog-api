import { IFastify } from '@utils/fastifyInterface';
import * as categoryController from './category.controller';
import categorySchema from '@models/category/category.validator';

async function categoryService(fastify: IFastify) {
  fastify.get('/', categoryController.list);

  fastify.post(
    '/',
    {
      preValidation: [fastify.authenticate, fastify.adminResource],
      schema: categorySchema,
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
