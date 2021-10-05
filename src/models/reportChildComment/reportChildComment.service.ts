import * as reportCommentController from './reportChildComment.controller';
import { IFastify } from '@utils/fastifyInterface';

async function reportCommentService(fastify: IFastify) {
  fastify.post('/:commentId/:userId', reportCommentController.create);
  fastify.get('/', reportCommentController.list);
  fastify.delete('/:id', reportCommentController.remove);
}

export default reportCommentService;
