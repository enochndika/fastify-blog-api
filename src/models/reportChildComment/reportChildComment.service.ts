import * as reportChildCommentController from './reportChildComment.controller';
import { IFastify } from '@utils/fastifyInterface';

async function reportChildCommentService(fastify: IFastify) {
  fastify.post('/:childCommentId/:userId', reportChildCommentController.create);
  fastify.get('/', reportChildCommentController.list);
  fastify.delete('/:id', reportChildCommentController.remove);
}

export default reportChildCommentService;
