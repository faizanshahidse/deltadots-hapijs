import { getExample, postExample } from '../controllers/index.js';

const userRoutes = [
  { method: 'GET', path: '/example', handler: getExample },
  { method: 'POST', path: '/example', handler: postExample },
];

export default userRoutes;
