import * as userService from '../services/user.service.js';

export const getAllUsers = async (request, h) => {
  const users = await userService.findUsers();

  return h
    .response({ message: 'Users fetched successfully', data: users })
    .code(200);
};

export const updateUser = async (request, h) => {
  const { name, email, password } = request.payload;
  const { userId } = request.params;

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
};

export const deleteUser = async (request, h) => {
  const { userId } = request.params;

  const userExists = await userService.findUserByIdOrEmail({ id: userId });

  if (!userExists) {
    return h.response({ message: 'User does not exist' }).code(500);
  }

  const deletedUser = await userService.deleteUserById(userId);

  return h
    .response({ message: 'Users deleted successfully', data: deletedUser })
    .code(200);
};
