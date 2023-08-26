import jwt from 'jsonwebtoken'
import 'dotenv/config';
import { Types } from 'mongoose';

const generateToken = (userId: Types.ObjectId): string => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET as string, {
    expiresIn: '30d',
  });
  return token;
};

export default generateToken;

