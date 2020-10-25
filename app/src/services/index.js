const users = require('./users/users.service.js');
const images = require('./images/images.service.js');
const boards = require('./boards/boards.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(images);
  app.configure(boards);
};
