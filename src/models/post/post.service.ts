import * as postController from './post.controller';
import { IFastify } from '@utils/fastifyInterface';

async function postService(fastify: IFastify) {
  fastify.post('/:authorId', postController.create);
  fastify.get('/', postController.list);
}

export default postService;
