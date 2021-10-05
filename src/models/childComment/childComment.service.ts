import * as childCommentController from './childComment.controller';
import { IFastify } from '@utils/fastifyInterface';

async function childCommentService(fastify: IFastify) {
  fastify.post('/:commentId', childCommentController.create);
  fastify.get('/', childCommentController.list);
  fastify.get('/:commentId', childCommentController.listByComment);
  fastify.put('/:id/:userId', childCommentController.update);
  fastify.delete('/user/:id/:userId', childCommentController.remove);
  fastify.delete('/admin/:id', childCommentController.removeByAdmin);
}

export default childCommentService;
