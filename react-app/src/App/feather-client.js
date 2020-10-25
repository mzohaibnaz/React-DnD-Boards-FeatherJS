import io from "socket.io-client";
const feathers = require("@feathersjs/client");
const rest = require("@feathersjs/rest-client");

const server = "http://localhost:3030";
//const socket = io(server);
// Connect to the same as the browser URL (only in the browser)
const restClient = rest(server);

const client = feathers()
  //.configure(feathers.socketio(socket))
  .configure(restClient.fetch(window.fetch))
  .configure(
    feathers.authentication({
      storage: window.localStorage,
    })
  );

const getFeathersInstance = async () => {
  try {
    let user = await login();
    return { client, user: user.user };
  } catch (err) {
    return false;
  }
};

const login = async (credentials) => {
  try {
    if (!credentials) {
      return await client.reAuthenticate();
    } else {
      let { email, password } = credentials;
      return await client.authenticate({
        strategy: "local",
        email,
        password,
      });
    }
  } catch (err) {
    throw Error({
      message: "Failed to login user!",
    });
  }
};

export { client, getFeathersInstance, login };
