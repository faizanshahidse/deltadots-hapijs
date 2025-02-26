import defineUserAbility from '../casl/user.ability.js';

const { JWT_ACCESS_SECRET_KEY, ISSUER, AUDIENCE } = process.env;

const jwtStrategyPlugin = {
  name: 'jwtStrategyPlugin',
  version: '1.0.0',
  register: function (server, options) {
    server.auth.strategy('jwt', 'jwt', {
      keys: JWT_ACCESS_SECRET_KEY,
      verify: {
        aud: AUDIENCE,
        iss: ISSUER,
        sub: false,
        nbf: true,
        exp: true,
        // maxAgeSec: 14400, // 4 hours
        // timeSkewSec: 15,
      },
      validate: (artifacts, request, h) => {
        const { id, email, role } = artifacts.decoded.payload;

        // casl ability
        const user = { role: role };
        request.ability = defineUserAbility(user);
        return {
          isValid: true,
          credentials: { user: { id, email, role } },
        };
      },
    });
  },
};

export default jwtStrategyPlugin;
