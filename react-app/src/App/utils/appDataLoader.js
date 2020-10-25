import { getFeathersInstance } from "../feather-client";

const appDataLoader = async () => {
  let boards = [];
  let mediaImages = [];
  let { client, user } = await getFeathersInstance();
  if (client) {
    try {
      const _boards = await client.service("boards").find();
      const _images = await client.service("images").find();
      mediaImages = _images.data.map((image) => {
        image["type"] = "media";
        return image;
      });
      boards = _boards.data.map((board) => {
        board["tiles"] = [];
        return board;
      });
      return { mediaImages, boards, jwt_user: user };
    } catch (err) {
      return { mediaImages, boards, jwt_user: false };
    }
  } else {
    return { mediaImages, boards, jwt_user: false };
  }
};
export default appDataLoader;
