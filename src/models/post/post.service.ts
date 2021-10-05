import * as postController from './post.controller';
import { IFastify } from '@utils/fastifyInterface';

async function postService(fastify: IFastify) {
  /* CRUD */
  fastify.get('/read/:slug', postController.findUnique);
  fastify.get('/', postController.list);
  fastify.post('/:authorId', postController.create);
  fastify.put('/:id', postController.update);
  fastify.delete('/:id/:authorId', postController.remove);
  fastify.delete('/:id', postController.removeByAdmin);

  /* FILTERS */
  fastify.get('/category/:categoryId', postController.listByCategory);
  fastify.get('/author/:authorId', postController.listByAuthor);
  fastify.get('/trends', postController.listByTrends);
  fastify.get('/related/:id', postController.listRelated);
  fastify.get('/vip', postController.listVip);
  fastify.get('/search', postController.listBySearch);
}

export default postService;
