import {
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from '../controllers/user.controller.js';

const onPostAuthPlugin = {
  name: 'onPostAuthPlugin',
  version: '1.0.0',
  register: function (server, options) {
    server.ext('onPostAuth', (request, h) => {
      const {
        auth: { isAuthenticated },
        ability,
        method,
      } = request;

      if (!isAuthenticated) {
        return h.continue;
      }

      if (method === 'get' && ability.can('read', getAllUsers)) {
        return h.continue;
      }

      if (method === 'get' && ability.can('read', getUserById)) {
        return h.continue;
      }

      if (method === 'put' && ability.can('update', updateUser)) {
        return h.continue;
      }

      if (method === 'delete' && ability.can('delete', deleteUser)) {
        return h.continue;
      }

      return h
        .response({ error: 'Only admin has access' })
        .code(403)
        .takeover();
    });
  },
};

export default onPostAuthPlugin;
