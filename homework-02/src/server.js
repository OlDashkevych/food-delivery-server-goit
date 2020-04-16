const url = require("url");
const http = require("http");
const morgan = require("morgan");
const router = require("./routes/router");
const getRouteHandler = require("./assets/get-route-handler");

const logger = morgan("combined");

const startServer = (port) => {
  const server = http.createServer((request, response) => {
    const parsedUrl = url.parse(request.url);
    const parsedUrlPathname =
      parsedUrl.pathname.slice(-1) === "/"
        ? parsedUrl.pathname.slice(0, -1)
        : parsedUrl.pathname;

    const func = getRouteHandler(router, parsedUrlPathname) || router.default;

    logger(request, response, () => func(request, response));
  });

  server.listen(port, (err) => {
    if (err) {
      return console.log("something is wrong", err);
    }
    console.log(`server is listening on ${port}`);
  });
};

module.exports = startServer;
