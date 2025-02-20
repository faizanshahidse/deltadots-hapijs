import {
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from '../controllers/user.controller.js';

const base = '/api';

const userRoutes = [
  {
    method: 'GET',
    path: `${base}/user/{userId}`,
    options: {
      auth: {
        strategy: 'jwt',
      },
    },
    handler: getUserById,
  },

  {
    method: 'PUT',
    path: `${base}/user/{userId}`,
    options: {
      auth: {
        strategy: 'jwt',
      },
    },
    handler: updateUser,
  },

  {
    method: 'DELETE',
    path: `${base}/user/{userId}`,
    options: {
      auth: {
        strategy: 'jwt',
      },
    },
    handler: deleteUser,
  },

  {
    method: 'GET',
    path: `${base}/users`,
    // options: { auth: 'jwt' },
    options: {
      auth: {
        strategy: 'jwt',
      },
    },
    handler: getAllUsers,
  },
];

export default userRoutes;
