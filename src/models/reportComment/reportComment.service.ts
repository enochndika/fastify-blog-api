import * as reportCommentController from './reportComment.controller';
import { IFastify } from '@utils/fastifyInterface';

async function reportCommentService(fastify: IFastify) {
  fastify.post(
    '/:commentId/:userId',
    {
      preValidation: [fastify.authenticate],
    },
    reportCommentController.create,
  );

  fastify.get(
    '/',
    {
      preValidation: [fastify.authenticate, fastify.adminResource],
    },
    reportCommentController.list,
  );

  fastify.delete(
    '/:id',
    {
      preValidation: [fastify.authenticate, fastify.adminResource],
    },
    reportCommentController.remove,
  );
}

export default reportCommentService;
