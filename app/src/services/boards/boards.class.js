const { Service } = require("feathers-nedb");

exports.Boards = class Boards extends Service {
  create(data, params) {
    const { title } = data;
    const { user } = params;
    const boardData = {
      title,
      userId: user._id,
    };

    return super.create(boardData, params);
  }

  find(params) {
    const { user } = params;

    return super.find({
      query: {
        userId: user._id,
      },
    });
  }
};
