import Jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const { JWT_ACCESS_SECRET_KEY, JWT_ACCESS_TOKEN_EXPIRY, ISSUER, AUDIENCE } =
  process.env;

export const encryptPassword = (password) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

export const decryptPassword = (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword);
};

export const createJwtAccessToken = (user) => {
  return new Promise((resolve, reject) => {
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };
    const secret = JWT_ACCESS_SECRET_KEY;
    const options = {
      expiresIn: JWT_ACCESS_TOKEN_EXPIRY,
      audience: AUDIENCE,
      issuer: ISSUER,
    };
    Jwt.sign(payload, secret, options, (err, token) => {
      if (err) return reject(err);
      resolve(token);
    });
  });
};
