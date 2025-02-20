import Joi from 'joi';

import * as userService from '../services/user.service.js';

export const getUserById = async (request, h) => {
  try {
    const schema = Joi.object().keys({
      userId: Joi.number().required(),
    });

    const { userId } = request.params;

    await schema.validateAsync({ userId: Number(userId) });

    const user = await userService.findUserByIdOrEmail({ id: userId });

    return h
      .response({ message: 'User fetched successfully', data: user })
      .code(200);
  } catch (err) {
    throw new Error(err);
  }
};

export const getAllUsers = async (request, h) => {
  try {
    // pagination
    let { page } = request.query;

    const users = await userService.findUsers(Number(page));

    return h
      .response({ message: 'Users fetched successfully', data: users })
      .code(200);
  } catch (err) {
    throw new Error(err);
  }
};

export const updateUser = async (request, h) => {
  try {
    const schema = Joi.object().keys({
      userId: Joi.number().required(),
      name: Joi.string(),
      email: Joi.string().email(),
      password: Joi.string(),
    });

    const { name, email, password } = request.payload;

    const { userId } = request.params;

    await schema.validateAsync({
      userId: Number(userId),
      name,
      email,
      password,
    });

    const userExists = await userService.findUserByIdOrEmail({ id: userId });

    if (!userExists) {
      return h.response({ message: 'User does not exist' }).code(500);
    }

    const user = {
      name,
      email,
      password,
    };

    const updatedUser = await userService.updateUserById(userId, user);

    return h
      .response({ message: 'Users updated successfully', data: updatedUser })
      .code(200);
  } catch (err) {
    throw new Error(err);
  }
};

export const deleteUser = async (request, h) => {
  try {
    const schema = Joi.object().keys({
      userId: Joi.number().required(),
    });

    const { userId } = request.params;

    await schema.validateAsync({ userId: Number(userId) });

    const userExists = await userService.findUserByIdOrEmail({ id: userId });

    if (!userExists) {
      return h.response({ message: 'User does not exist' }).code(500);
    }

    const deletedUser = await userService.deleteUserById(userId);

    return h
      .response({ message: 'Users deleted successfully', data: deletedUser })
      .code(200);
  } catch (err) {
    throw new Error(err);
  }
};
