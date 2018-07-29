const defaultUserStore = {
  user: null,
  isAuthenticated: false
}
const reducerGame = (state = defaultUserStore, action) => {
  switch (action.type) {
    case 'Set_User':
      return { ...state,
        user: action.user,
        isAuthenticated: action.isAuthenticated
      }
    case 'Delete_User':
      return {
        ...state,
        user: null,
        isAuthenticated: false
      }

    default:
      return state
  }
}
export default reducerGame
