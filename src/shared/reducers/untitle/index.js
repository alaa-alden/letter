const defaultUntitle = {
  untitles: 'untitle'
}
const reducerWord = (state = defaultUntitle, action) => {
  switch (action.type) {
    case 'Set_Untitle':
      return { ...state, untitle: action.untitle }
    default:
      return state
  }
}
export default reducerWord
