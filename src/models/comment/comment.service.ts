import * as commentController from './comment.controller';
import { IFastify } from '@utils/fastifyInterface';

async function commentService(fastify: IFastify) {
  fastify.post('/:postId', commentController.create);
  fastify.get('/', commentController.list);
  fastify.get('/:postId', commentController.listByPost);
  fastify.put('/:id/:userId', commentController.update);
  fastify.delete('/user/:id/:userId', commentController.remove);
  fastify.delete('/admin/:id', commentController.removeByAdmin);
}

export default commentService;
