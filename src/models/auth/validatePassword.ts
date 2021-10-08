import bcrypt from 'bcryptjs';
import { IUser } from '@models/user/user.interface';

async function validatePassword(password: string, user: IUser) {
  return bcrypt.compare(password, user.password);
}

export default validatePassword;
