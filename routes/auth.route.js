import { createNewUser, login } from '../controllers/auth.controller.js';

const base = '/api';

const authRoutes = [
  { method: 'POST', path: `${base}/register`, handler: createNewUser },
  { method: 'POST', path: `${base}/login`, handler: login },
];

export default authRoutes;
