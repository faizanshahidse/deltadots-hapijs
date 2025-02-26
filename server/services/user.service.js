import { UserDto, EmailAndIdDto } from '../dtos/user.dto.js';
import User from '../repositories/user.repository.js';

export const createNewUser = async (data = UserDto) => {
  return await User.create(data);
};

export const findUserByIdOrEmail = async (query = EmailAndIdDto) => {
  return await User.findOne(query);
};

export const findUsers = async (page) => {
  let offset = 0;
  let limit = 10;
  if (page) {
    offset = Number(page * 10);
  }

  return await User.find(offset, limit);
};

export const updateUserById = async (userId, user = UserDto) => {
  return await User.updateById(userId, user);
};

export const deleteUserById = async (userId) => {
  return await User.deleteById(userId);
};
