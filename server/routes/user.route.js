import {
  deleteUser,
  fileUpload,
  getAllUsers,
  getUserById,
  updateUser,
} from '../controllers/user.controller.js';

const base = '/api/users';

const userRoutes = [
  {
    method: 'GET',
    path: `${base}/file-upload`,
    handler: fileUpload,
  },

  {
    method: 'GET',
    path: `${base}/{userId}`,
    options: {
      auth: {
        strategy: 'jwt',
      },
    },
    handler: getUserById,
  },

  {
    method: 'PUT',
    path: `${base}/{userId}`,
    options: {
      auth: {
        strategy: 'jwt',
      },
    },
    handler: updateUser,
  },

  {
    method: 'DELETE',
    path: `${base}/{userId}`,
    options: {
      auth: {
        strategy: 'jwt',
      },
    },
    handler: deleteUser,
  },

  {
    method: 'GET',
    path: `${base}`,
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
