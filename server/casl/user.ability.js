import { defineAbility } from '@casl/ability';

import {
  updateUser,
  deleteUser,
  getAllUsers,
  getUserById,
} from '../controllers/user.controller.js';

const defineUserAbility = (user) => {
  return defineAbility((can, cannot) => {
    if (user.role === 'admin') {
      can('update', updateUser);
      can('delete', deleteUser);
      can('read', getAllUsers);
      can('read', getUserById);
    }

    if (user.role === 'user') {
      can('read', getAllUsers);
      can('read', getUserById);
    }
  });
};

export default defineUserAbility;
