import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import User from '../interfaces/user.interface';

const JWT_SECRET: Secret = 'password';
const jwtConfig: SignOptions = { expiresIn: '7d', algorithm: 'HS256' };

const jwtService = {
  createToken: (data: User): string | undefined => {
    const token = jwt.sign({ data }, JWT_SECRET, jwtConfig);
    return token;
  },

/*   validateToken: (token: string) => {
    try {
      const data = jwt.verify(token, JWT_SECRET);
      return data;
    } catch (e) {
      const error = new Error('Expired or invalid token');
      error.name = 'UnauthorizedError';
      throw error; 
    }
  }, */
};

export default jwtService;