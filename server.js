import Hapi from '@hapi/hapi';
import Jwt from '@hapi/jwt';

import dotenv from 'dotenv';
dotenv.config();

import routes from './routes/index.js';

const init = async () => {
  const {
    NODE_ENV,
    PORT,
    HOST,
    JWT_ACCESS_SECRET_KEY,
    JWT_ACCESS_TOKEN_EXPIRY,
    ISSUER,
    AUDIENCE,
  } = process.env;

  const server = Hapi.server({
    port: PORT || 5000,
    host: HOST,
  });

  // Register jwt with the server
  await server.register(Jwt);

  server.auth.strategy('jwt', 'jwt', {
    keys: JWT_ACCESS_SECRET_KEY,
    verify: {
      aud: AUDIENCE,
      iss: ISSUER,
      sub: false,
      nbf: true,
      exp: true,
      maxAgeSec: 14400, // 4 hours
      timeSkewSec: 15,
    },
    validate: (artifacts, request, h) => {
      const { id, email } = artifacts.decoded.payload;
      return {
        isValid: true,
        credentials: { user: { id, email } },
      };
    },
  });

  // Set the strategy
  // server.auth.default('my_jwt_strategy');

  server.route(routes);

  server.ext('onPreResponse', function (request, h) {
    const response = request.response;

    if (response.isBoom) {
      const { message, stack } = response;

      const error = {
        statusCode: response.statusCode || 5000,
        message,
        stack: NODE_ENV === 'development' ? stack : '',
      };

      return error;
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
