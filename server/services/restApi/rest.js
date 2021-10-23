const express = require('express');
const http = require('http');
const cors = require('cors');
const app = express();
const server = http.createServer(app);

const initRest = ({
  port = 3000,
  routes = {},
  responseTimeout = 25000,
  sendResponseOnTimeout = false,
}) => {
  const routesList = Object.keys(routes);
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    }),
  );
  app.use(cors());

  app.use(express.static('public'));

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

  routes &&
    (() => {
      for (let index = 0; index < routesList.length; index++) {
        const route = routesList[index];
        app.use(route, routes[route]);
        if (index === routesList.length - 1) {
          // handle route not found
          app.use((req, res, next) => {
            const error = new Error('Not found');
            error.status = 404;
            next(error);
          });
          // error middleware handler
          app.use((error, req, res, next) => {
            res.status(error.status || 500).send({
              error: {
                status: error.status || 500,
                message: error.message || 'Internal Server Error',
              },
            });
          });
        }
      }
    })();

  // handle user/server res.send error
  sendResponseOnTimeout &&
    server.on('request', (req, res) => {
      setTimeout(() => {
        if (res.writableEnded) {
          return;
        }
        res.status(500).send({
          error: {
            status: 500,
            message: 'Internal Server Error',
          },
        });
      }, responseTimeout);
    });

  server.listen(port, () => console.log(`[Rest_API]`, `Listening On Port ${port}`));
};

module.exports = { initRest };
