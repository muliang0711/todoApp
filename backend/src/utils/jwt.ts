import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'supersecret';

// token that accpect two parameters, payload(gmail , name) and expiresIn(number of days, hours, minutes) 
export const createToken = (payload: any, expiresIn: number | `${number}${'d' | 'h' | 'm'}` = '7d'): string => {
  return jwt.sign(payload, SECRET, {
    expiresIn: expiresIn as jwt.SignOptions['expiresIn']
  });
};


export const verifyToken = (token: string) => {
    return jwt.verify(token, SECRET);
};