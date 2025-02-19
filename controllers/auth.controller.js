import * as userService from '../services/user.service.js';
import {
  encryptPassword,
  decryptPassword,
  createJwtAccessToken,
} from '../utils/auth.util.js';

export const createNewUser = async (request, h) => {
  const { name, email, password } = request.payload;

  const userExists = await userService.findUserByIdOrEmail({ email });

  if (userExists) {
    return h.response({ message: 'User already exists' }).code(500);
  }

  const data = {
    name,
    email,
    password: encryptPassword(password),
  };

  const user = await userService.createNewUser(data);
  delete user.password;

  return h
    .response({ message: 'User registered successfully', data: user })
    .code(201);
};

export const login = async (request, h) => {
  const { email, password } = request.payload;

  const user = await userService.findUserByIdOrEmail({ email });

  if (!user) {
    return h.response({ message: 'User does not exist' }).code(500);
  }

  const isPasswordMatched = decryptPassword(password, user.password);

  if (!isPasswordMatched) {
    return h.response({ message: 'Email or password is wrong' }).code(403);
  }

  const token = await createJwtAccessToken(user);
  user.accessToken = token;
  delete user.password;

  return h
    .response({ message: 'User logged in successfulyy', data: user })
    .code(200);
};
