// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async (context) => {
    const { result, app } = context;

    if (result.data.length > 0) {
      context.result.data = result.data.map((d) => {
        if (d.content) {
          d.content =
            "http://" + app.get("host") + ":" + app.get("port") + d.content;
        }
        return d;
      });
    }
    return context;
  };
};
