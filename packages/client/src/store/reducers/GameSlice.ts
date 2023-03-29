import { createSlice } from '@reduxjs/toolkit';
import { GameState } from '../store.types';

import {
  directionMove,
  generateBoard,
  initBoard,
  randomNewTile,
  resetBoard
} from '../../helpers/board';
import { getBestScore } from '../../helpers/game-score';

const initialState: GameState = {
  board: null,
  currentScore: 0,
  bestScore: 0,
  isFail: false,
  gameConfig: {
    padding: 15,
    countTiles: 4,
    boardSize: 500
  }
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    createBoard: state => {
      if (!state.board) {
        const startBoard = initBoard(
          generateBoard(state.gameConfig.countTiles)
        );
        state.board = startBoard;
      }
    },
    resetBoardState: state => {
      if (state.board) {
        const resetedBoard = resetBoard(state.board);
        state.board = initBoard(resetedBoard);
        state.currentScore = 0;
        state.isFail = false;
      }
    },
    moveBoard: (state, action) => {
      const { board, direction } = action.payload;
      const boardWithScore = directionMove(
        board,
        direction,
        state.currentScore
      );
      state.board = boardWithScore.board;
      if (boardWithScore.wasMoved) {
        state.board = randomNewTile(boardWithScore.board);
      }
      state.currentScore = boardWithScore.score;
      state.bestScore = getBestScore(state.bestScore, state.currentScore);
    },
    failGame: state => {
      state.isFail = true;
    }
  }
});

export const { resetBoardState, createBoard, moveBoard, failGame } =
  gameSlice.actions;
