const ADD_GAME_DATA = "ADD_GAME_DATA";

export const addGameData = (gameData) => ({
  type: ADD_GAME_DATA,
  payload: gameData,
});

const initialState = {
  games: [],
};

const gameDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_GAME_DATA:
      return {
        ...state,
        games: [...state.games, action.payload],
      };
    default:
      return state;
  }
};

export default gameDataReducer;
