import { IFastify } from '@utils/fastifyInterface';
import * as userController from './user.controller';
import userSchema from '@models/user/user.validator';

async function userService(fastify: IFastify) {
  fastify.get('/:username', userController.findUnique);
  fastify.post('/', { schema: userSchema }, userController.create);

  fastify.get(
    '/',
    {
      preValidation: [fastify.authenticate, fastify.adminResource],
    },
    userController.list,
  );

  fastify.put(
    '/:id',
    {
      preValidation: [fastify.authenticate],
    },
    userController.update,
  );

  fastify.delete(
    '/:id',
    {
      preValidation: [fastify.authenticate],
    },
    userController.remove,
  );

  fastify.delete(
    '/admin/:id',
    {
      preValidation: [fastify.authenticate, fastify.adminResource],
    },
    userController.remove,
  );
}

export default userService;
