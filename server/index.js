const { initRest } = require('./services/restApi/rest');
const duckduckgoRoutes = require('./routes/duckduckgoRoutes');

const routes = {
  '/api/duckduckgo': duckduckgoRoutes,
};

initRest({
  port: process.env.PORT || 5000,
  routes,
});
