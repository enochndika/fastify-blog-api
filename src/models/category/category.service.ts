import * as categoryController from './category.controller';
import { IFastify } from '@utils/fastifyInterface';

async function categoryService(fastify: IFastify) {
  fastify.get('/', categoryController.list);
  fastify.post('/', categoryController.create);
  fastify.put('/:id', categoryController.update);
  fastify.delete('/:id', categoryController.remove);
}

export default categoryService;
