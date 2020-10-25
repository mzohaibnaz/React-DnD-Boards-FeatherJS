const removeItemFromCurrentBoard = function (boards, item) {
  return boards.map((board) => {
    if (board._id === item.boardId) {
      board.tiles = board.tiles.filter((tile) => tile._id !== item._id);
      return board;
    }
    return board;
  });
};

const handleDrop = function (state, item, board) {
  let boards = removeItemFromCurrentBoard(state.boards, item).map((b) => {
    if (b._id === board._id) {
      let _item = {
        ...item,
        boardId: board._id,
      };
      b.tiles.push(_item);
      return b;
    }
    return b;
  });

  let mediaData = state.mediaData;
  // check media item
  if (typeof item.type !== undefined && item.type === "media") {
    mediaData = mediaData.filter((media) => media._id !== item._id);
  }

  return { ...state, boards, mediaData };
};

export default handleDrop;
