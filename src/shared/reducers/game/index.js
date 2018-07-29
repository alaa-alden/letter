const defaultGameStore = {
  level: '1'
}
const reducerGame = (state = defaultGameStore, action) => {
  switch (action.type) {
    case 'Set_Level':
      return { ...state,
        level: action.level
      }
    default:
      return state
  }
}
export default reducerGame
