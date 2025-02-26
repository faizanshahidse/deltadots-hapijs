import Hapi from '@hapi/hapi';
import Jwt from '@hapi/jwt';

import dotenv from 'dotenv';
dotenv.config();

import routes from './routes/index.js';

import onPostAuthPlugin from './plugins/on-post-auth.plugin.js';
import jwtStrategyPlugin from './plugins/jwt-strategy.plugin.js';

const init = async () => {
  const { NODE_ENV, PORT, HOST } = process.env;

  const server = Hapi.server({
    port: PORT || 5000,
    host: HOST,
  });

  /***************************************************************************
   *                                                                          *
   * 1. jwtStrategyPlugin is used for json web token authentication.          *
   *                                                                          *
   * 2. onPostAuthPlugin plugin is used for casl authorization purpose        *
   * after the jwt-token authentication.                                      *                             *
   *                                                                          *
   ***************************************************************************/

  await server.register(Jwt);
  await server.register(onPostAuthPlugin);
  await server.register(jwtStrategyPlugin);

  server.route(routes);

  /***************************************************************************
   *                                                                          *
   * Global Error Handling                                                    *
   *                                                                          *                                                          *
   ***************************************************************************/

  server.ext('onPreResponse', function (request, h) {
    const response = request.response;

    if (response.isBoom) {
      const { message, stack } = response;

      const errorResponse = {
        statusCode: response.output?.statusCode || 5000,
        message,
        stack: NODE_ENV === 'development' ? stack : '',
      };

      return h.response(errorResponse).code(errorResponse.statusCode);
    }
    return h.continue;
  });

  await server.start();
  console.log('Server running on %s', server.info.uri);
  console.log('Server is running on PORT', server.info.port);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
