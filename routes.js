const fs = require("fs");
const path = require("path");
const express = require("express");

const _wrapAsyncFn =
  (fn) =>
  (...args) =>
    fn(...args).catch(args[2]);

const topLevelRouter = express.Router(); // eslint-disable-line new-cap

const API_CONTROLLERS = path.join(__dirname, "/controllers/");

walkControllers(topLevelRouter, API_CONTROLLERS);

function readController(router, controller, overrides = []) {
  Object.keys(controller).forEach((key) => {
    let action = controller[key];
    let { method } = action;
    const { url, middlewares = [], handler } = action;

    // Allow to specify a list of routes (METHOD + URL) to skip
    if (overrides.indexOf(`${method}-${url}`) !== -1) return;

    // If an authentication middleware is used run getUserLanguage after it, otherwise before
    // for cron instead use it only if an authentication middleware is present

    method = method.toLowerCase();

    const fn = handler ? _wrapAsyncFn(handler) : noop;

    router[method](url, ...middlewares, fn);
  });
}

function walkControllers(router, filePath, overrides) {
  fs.readdirSync(filePath).forEach((fileName) => {
    if (!fs.statSync(filePath + fileName).isFile()) {
      walkControllers(router, `${filePath}${fileName}/`, overrides);
    } else if (fileName.match(/\.js$/) && !fileName.match(/\.test.js$/)) {
      const controller = require(filePath + fileName).api; // eslint-disable-line global-require, import/no-dynamic-require, max-len
      if (controller) {
        readController(router, controller, overrides);
      }
    }
  });
}

exports.router = topLevelRouter;
