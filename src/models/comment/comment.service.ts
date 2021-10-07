import * as commentController from './comment.controller';
import { IFastify } from '@utils/fastifyInterface';

async function commentService(fastify: IFastify) {
  fastify.get('/', commentController.list);
  fastify.get('/:postId', commentController.listByPost);

  fastify.post(
    '/:postId',
    {
      preValidation: [fastify.authenticate],
    },
    commentController.create,
  );

  fastify.put(
    '/:id/:userId',
    {
      preValidation: [fastify.authenticate],
    },
    commentController.update,
  );

  fastify.delete(
    '/:id/:userId',
    {
      preValidation: [fastify.authenticate],
    },
    commentController.remove,
  );

  fastify.delete(
    '/admin/:id',
    {
      preValidation: [fastify.authenticate],
    },
    commentController.removeByAdmin,
  );
}

export default commentService;
