const helmet = require("helmet");
const securityHeaders = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
    },
  },
  xssFilter: true,
  noSniff: true,
  hidePoweredBy: true,
  frameguard: { action: "deny" },
  hsts: {
    maxAge: 63072000,
    includeSubDomains: true,
    preload: true,
  },
});

module.exports = securityHeaders;
