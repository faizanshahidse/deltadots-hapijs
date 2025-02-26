import authRoutes from './auth.route.js';
import userRoutes from './user.route.js';

const routes = [].concat(authRoutes, userRoutes);

export default routes;
