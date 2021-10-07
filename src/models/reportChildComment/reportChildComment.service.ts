import * as reportChildCommentController from './reportChildComment.controller';
import { IFastify } from '@utils/fastifyInterface';

async function reportChildCommentService(fastify: IFastify) {
  fastify.post(
    '/:childCommentId/:userId',
    {
      preValidation: [fastify.authenticate],
    },
    reportChildCommentController.create,
  );

  fastify.get(
    '/',
    {
      preValidation: [fastify.authenticate, fastify.adminResource],
    },
    reportChildCommentController.list,
  );

  fastify.delete(
    '/:id',
    {
      preValidation: [fastify.authenticate, fastify.adminResource],
    },
    reportChildCommentController.remove,
  );
}

export default reportChildCommentService;
