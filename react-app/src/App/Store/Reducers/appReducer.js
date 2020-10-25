const reducer = (
  state = {
    loading: true,
  },
  action
) => {
  switch (action.type) {
    case "app-loading":
      return { ...state, loading: action.state };
    default:
      return state;
  }
};

export default reducer;
