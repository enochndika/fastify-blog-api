import * as reportCommentController from './reportPost.controller';
import { IFastify } from '@utils/fastifyInterface';

async function reportPostService(fastify: IFastify) {
  fastify.post(
    '/:postId/:userId',
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

export default reportPostService;
