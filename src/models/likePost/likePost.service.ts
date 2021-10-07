import * as commentController from './likePost.controller';
import { IFastify } from '@utils/fastifyInterface';

async function likePostService(fastify: IFastify) {
  fastify.get('/', commentController.list);
  fastify.get('/:postId', commentController.listByPost);
  fastify.get('/user/:userId', commentController.listByUser);

  fastify.post(
    '/:postId/:userId',
    {
      preValidation: [fastify.authenticate],
    },
    commentController.create,
  );

  fastify.delete(
    '/:postId/:userId',
    {
      preValidation: [fastify.authenticate],
    },
    commentController.remove,
  );
}

export default likePostService;
