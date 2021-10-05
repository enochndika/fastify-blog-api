import * as commentController from './comment.controller';
import { IFastify } from '@utils/fastifyInterface';

async function commentService(fastify: IFastify) {
  fastify.post('/:postId', commentController.create);
  fastify.get('/', commentController.list);
}

export default commentService;
