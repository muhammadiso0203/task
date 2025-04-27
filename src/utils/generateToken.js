import jwt from 'jsonwebtoken';

export const generateAccesToken = (payload) => {
    return jwt.sign(payload, process.env.ACCES_TOKEN_KEY, {
        expiresIn: process.env.ACCES_TOKEN_TIME
    });
};

export const generateRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.ACCES_TOKEN_KEY, {
    expiresIn: process.env.ACCES_TOKEN_TIME,
  });
};