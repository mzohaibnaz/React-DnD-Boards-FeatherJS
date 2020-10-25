const reducer = (
  state = {
    user: false,
  },
  action
) => {
  switch (action.type) {
    case "login-user":
      return { user: action.user };
    case "logout-user":
      return { user: false };
    default:
      return state;
  }
};

export default reducer;
