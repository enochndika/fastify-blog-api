import server from '../../app.server';
import { IUser } from '@models/user/user.interface';

function generateJWT(user: IUser) {
  const payload = {
    username: user.username,
    role: user.role,
  };

  return server.jwt.sign(payload, {
    expiresIn: '7d',
    issuer: 'Enoch Ndika',
  });
}

export default generateJWT;
