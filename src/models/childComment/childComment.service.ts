import { IFastify } from '@utils/fastifyInterface';
import * as childCommentController from './childComment.controller';

async function childCommentService(fastify: IFastify) {
  fastify.get('/', childCommentController.list);
  fastify.get('/:commentId', childCommentController.listByComment);

  fastify.post(
    '/:commentId',
    {
      preValidation: [fastify.authenticate],
    },
    childCommentController.create,
  );

  fastify.put(
    '/:id/:userId',
    {
      preValidation: [fastify.authenticate],
    },
    childCommentController.update,
  );

  fastify.delete(
    '/user/:id/:userId',
    {
      preValidation: [fastify.authenticate],
    },
    childCommentController.remove,
  );

  fastify.delete(
    '/admin/:id',
    {
      preValidation: [fastify.authenticate, fastify.adminResource],
    },
    childCommentController.removeByAdmin,
  );
}

export default childCommentService;
