import handleDrop from "./../Actions/handle-drop";

const initState = {
  boards: [],
  mediaData: [],
  bottomPanel: false,
  boardModal: false,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case "handle-drop":
      return handleDrop(state, action.item, action.board);
    case "update-app-data":
      return { ...state, mediaData: action.mediaImages, boards: action.boards };
    case "bottom-panel":
      return { ...state, bottomPanel: !state.bottomPanel };
    case "board-modal":
      return { ...state, boardModal: !state.boardModal };
    case "push-board":
      const boards = [...state.boards];
      const board = action.board;
      board["tiles"] = [];
      boards.push(board);
      return { ...state, boards, boardModal: false };
    case "clear-storage":
      return initState;
    default:
      return state;
  }
};

export default reducer;
