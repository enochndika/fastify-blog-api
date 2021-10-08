import { IFastify } from '@utils/fastifyInterface';
import * as postController from './post.controller';
import postSchema from '@models/post/post.validator';

async function postService(fastify: IFastify) {
  /* CRUD */
  fastify.get('/read/:slug', postController.findUnique);
  fastify.get('/', postController.list);

  fastify.post(
    '/:authorId',
    {
      schema: postSchema,
    },
    postController.create,
  );

  fastify.put(
    '/:id/:authorId',
    {
      preValidation: [fastify.authenticate],
    },
    postController.update,
  );

  fastify.delete(
    '/:id/:authorId',
    {
      preValidation: [fastify.authenticate],
    },
    postController.remove,
  );

  fastify.delete(
    '/:id',
    {
      preValidation: [fastify.authenticate, fastify.adminResource],
    },
    postController.removeByAdmin,
  );

  /* FILTERS */
  fastify.get('/category/:categoryId', postController.listByCategory);
  fastify.get('/author/:authorId', postController.listByAuthor);
  fastify.get('/trends', postController.listByTrends);
  fastify.get('/related/:id', postController.listRelated);
  fastify.get('/vip', postController.listVip);
  fastify.get('/search', postController.listBySearch);
}

export default postService;
