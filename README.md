## DuckDuckGo
### Description
This project contain a server and a client.

The server is built with NodeJS, and uses Express, Axios.

The server API end-points are:

** GET http://localhost:5000/api/duckduckgo/getList?q

- Request params:
  - q: qurey to search on DuckDuckGo

- Response: JSON response with an array of objects [{ "url": "https:/duckduckgo.com/X", "title": "X" },...]

** GET http://localhost:5000/api/duckduckgo/getPersistList

- Response: JSON response with a list of past queries

** POST http://localhost:5000/api/duckduckgo/persist

- Request body:
  - q: qurey to search on DuckDuckGo

- persist queries

- Response: JSON response with an array of objects [{ "url": "https:/duckduckgo.com/X", "title": "X" },...]

** GET http://localhost:5000/

- servers static files and client build

The client front-end is built with React, Redux, MATERIAL-UI, Axios, react-window.

## Usage
1. Run `git clone https://github.com/BoazRamot/DuckDuckGo.git`

2. Open repo `cd DuckDuckGo`

3. Run on bash `npm run all:install`, to install the module's prerequisites for server and client.

### dev
1. Run on bash `npm run client:start` to start the client in the development mode

2. Run on bash `npm run server:dev` to start the server in the development mode

3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### prod
1. Run on bash `npm run build` to start the build process, it will creat an optimized production build of the client and moved it to the server public folder.

2. Run on bash `npm run server:start` to start the server in the production mode.

3. Open [http://localhost:5000](http://localhost:5000) to view it in the browser.