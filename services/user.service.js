import { UserDto, EmailAndIdDto } from '../dtos/user.dto.js';
import User from '../repositories/user.repository.js';

export const createNewUser = async (data = UserDto) => {
  try {
    return await User.create(data);
  } catch (error) {
    throw new Error(error);
  }
};

export const findUserByIdOrEmail = async (query = EmailAndIdDto) => {
  try {
    return await User.findOne(query);
  } catch (error) {
    throw new Error(error);
  }
};

export const findUsers = async () => {
  try {
    return await User.find();
  } catch (error) {
    throw new Error(error);
  }
};

export const updateUserById = async (userId, user = UserDto) => {
  try {
    return await User.updateById(userId, user);
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteUserById = async (userId) => {
  try {
    return await User.deleteById(userId);
  } catch (error) {
    throw new Error(error);
  }
};
