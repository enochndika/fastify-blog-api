import * as commentController from './likePost.controller';
import { IFastify } from '@utils/fastifyInterface';

async function likePostService(fastify: IFastify) {
  fastify.get('/', commentController.list);
  fastify.post('/:postId/:userId', commentController.create);
  fastify.get('/:postId', commentController.listByPost);
  fastify.get('/user/:userId', commentController.listByUser);
  fastify.delete('/:postId/:userId', commentController.remove);
}

export default likePostService;
