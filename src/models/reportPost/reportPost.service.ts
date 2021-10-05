import * as reportCommentController from './reportPost.controller';
import { IFastify } from '@utils/fastifyInterface';

async function reportPostService(fastify: IFastify) {
  fastify.post('/:postId/:userId', reportCommentController.create);
  fastify.get('/', reportCommentController.list);
  fastify.delete('/:id', reportCommentController.remove);
}

export default reportPostService;
