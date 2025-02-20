import Joi from 'joi';

import * as userService from '../services/user.service.js';
import {
  encryptPassword,
  decryptPassword,
  createJwtAccessToken,
} from '../utils/auth.util.js';

export const createNewUser = async (request, h) => {
  try {
    const schema = Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
      role: Joi.string(),
    });

    const { name, email, password, role } = request.payload;

    await schema.validateAsync({ name, email, password, role });

    const userExists = await userService.findUserByIdOrEmail({ email });

    if (userExists) {
      return h.response({ message: 'User already exists' }).code(500);
    }

    const data = {
      name,
      email,
      password: encryptPassword(password),
      role,
    };

    const user = await userService.createNewUser(data);
    delete user.password;

    return h
      .response({ message: 'User registered successfully', data: user })
      .code(201);
  } catch (err) {
    throw new Error(err);
  }
};

export const login = async (request, h) => {
  try {
    const schema = Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    });

    const { email, password } = request.payload;

    await schema.validateAsync({ email, password });

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
  } catch (err) {
    throw new Error(err);
  }
};
