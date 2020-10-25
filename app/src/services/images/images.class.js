const { Service } = require("feathers-nedb");

exports.Images = class Images extends Service {
  create(data, params) {
    const { title, content } = data;
    const imageData = {
      title,
      content,
    };

    return super.create(imageData, params);
  }
};
