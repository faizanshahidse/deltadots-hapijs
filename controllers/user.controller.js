import Joi from 'joi';
import path from 'path';

import * as userService from '../services/user.service.js';
import constant from '../config/constants.js';
import { uploadFile } from '../aws/upload-file.aws.js';

export const getUserById = async (request, h) => {
  try {
    const schema = Joi.object().keys({
      userId: Joi.number().required(),
    });

    const { userId } = request.params;

    await schema.validateAsync({ userId: Number(userId) });

    const user = await userService.findUserByIdOrEmail({ id: userId });

    return h.response({ message: constant.user.FETCHED, data: user }).code(200);
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
      .response({ message: constant.user.FETCHED, data: users })
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
      return h.response({ message: constant.user.NOT_EXIST }).code(500);
    }

    const user = {
      name,
      email,
      password,
    };

    const updatedUser = await userService.updateUserById(userId, user);

    return h
      .response({ message: constant.user.UPDATED, data: updatedUser })
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
      return h.response({ message: constant.user.NOT_EXIST }).code(500);
    }

    const deletedUser = await userService.deleteUserById(userId);

    return h
      .response({ message: constant.user.DELETED, data: deletedUser })
      .code(200);
  } catch (err) {
    throw new Error(err);
  }
};

export const fileUpload = async (request, h) => {
  try {
    // This is an example aws fileUpload having hard coded values.

    const __dirname = path.dirname('programming_task');

    const filePath = path.resolve(__dirname, 'public/programming_task.pdf');
    const key = '/media';

    const bucketName = process.env.S3_BUCKET;

    const file = await uploadFile({ bucketName, key, filePath });

    return h.response({ message: constant.user.FETCHED, data: file }).code(200);
  } catch (err) {
    throw new Error(err);
  }
};
