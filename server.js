import Hapi from '@hapi/hapi';
import dotenv from 'dotenv';
import routes from './routes/index.js';

dotenv.config();

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 3000,
    host: 'localhost',
  });

  server.route(routes);

  await server.start();
  console.log('Server running on %s', server.info.uri);
  console.log('Server is running on PORT', server.info.port);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
