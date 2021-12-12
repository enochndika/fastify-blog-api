import prisma from '@providers/prisma';
import generateJWT from './jwt.strategy';
import validatePassword from './validatePassword';
import { IUser } from '@models/user/user.interface';
import { FastifyReply, FastifyRequest } from 'fastify';

async function signIn(
  request: FastifyRequest<{ Body: IUser }>,
  reply: FastifyReply,
) {
  const { password, username } = request.body;

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (!user) {
    reply.statusCode = 400;
    return {
      message: `The username ${username} is not associated with any account, check your username and try again`,
    };
  }

  const isValidated = await validatePassword(password, user);

  if (!isValidated) {
    reply.statusCode = 400;
    return { message: 'Incorrect password' };
  }

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      last_logged: new Date(),
    },
  });
  return generateJWT(user);
}

export default signIn;
