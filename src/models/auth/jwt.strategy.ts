import server from '../../app.server';
import { IUser } from '@models/user/user.interface';

function generateJWT(user: IUser) {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);

  const payload = {
    username: user.username,
    role: user.role,
  };

  return server.jwt.sign(payload, {
    expiresIn: parseInt(String(expirationDate.getTime() / 1000), 10),
    issuer: 'Enoch Ndika',
  });
}

export default generateJWT;
