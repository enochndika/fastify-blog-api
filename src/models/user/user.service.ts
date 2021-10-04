import * as userController from './user.controller';
import { IFastify } from '@utils/fastifyInterface';

async function userService(fastify: IFastify) {
  fastify.get('/:username', userController.read);

  fastify.get('/', userController.list);
  fastify.post('/', userController.create);
  fastify.put('/:id', userController.update);
  fastify.delete('/:id', userController.remove);
  fastify.delete('/admin/:id', userController.remove);
}

export default userService;
