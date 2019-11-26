import {statics} from '../statics';
import {checkWin} from '../action';

const defaultState = {
    numPlayers: 1,
    players: ["X", "O"],
    turn: 0,
    numMoves: 0,
    board: ["", "", "", "", "", "", "", "", ""],
    winningCombo: [],
    winningPiece: "",
    showWinner: false,
    score: [0, 0]
  };

const reducer = (state = defaultState, action) => {
    switch (action.type) {
      case statics.RESET:
        return defaultState;
      case statics.NUMPLAYERS:
        return { ...state, numPlayers: parseInt(action.value) };
      case statics.PIECESELECTION:
        return {
          ...state,
          turn: action.value === "X" ? 0 : 1,
          players: action.value === "X" ? ["X", "O"] : ["O", "X"]
        };
      case statics.MOVE:
        const piece = state.players[state.turn];
        let newPlace = action.place;
  
        const newBoard = state.board.map(function (place, idx) {
          return idx.toString() === newPlace ? piece : place;
        });
        const winner = checkWin(newBoard, piece);
        let newScore = state.score;
        let newTurn = state.turn === 1 ? 0 : 1;
        if (winner[0]) {
          newScore[state.turn]++;
          newTurn = state.turn;
        }
  
        return {
          ...state,
          turn: newTurn,
          numMoves: state.numMoves + 1,
          board: newBoard,
          winningCombo: winner[1],
          winningPiece: winner[0] ? piece : "",
          score: newScore
        };
      case statics.SHOWWINNER:
        return {
          ...state,
          showWinner: true
        };
      default:
        return state;
    }
  };
  export default reducer;