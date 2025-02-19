import { getExample, postExample } from '../controllers/index.js';
import {
  deleteUser,
  getAllUsers,
  updateUser,
} from '../controllers/user.controller.js';

const base = '/api';

const userRoutes = [
  { method: 'GET', path: '/example', handler: getExample },
  { method: 'POST', path: '/example', handler: postExample },
  { method: 'PUT', path: `${base}/user/{userId}`, handler: updateUser },
  { method: 'DELETE', path: `${base}/user/{userId}`, handler: deleteUser },
  {
    method: 'GET',
    path: `${base}/users`,
    // options: { auth: 'jwt' },
    config: {
      auth: {
        strategy: 'jwt',
      },
    },
    handler: getAllUsers,
  },
];

export default userRoutes;
