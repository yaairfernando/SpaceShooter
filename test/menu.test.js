import 'jest-canvas-mock';
import Game from '../src/Scenes/GameInit';

/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */


describe('The game should', () => {
  let game;
  beforeAll(() => {
    game = new Game();
  });

  test('have a width of 1000', () => {
    expect(game.config.width).toEqual(1000);
  });

  test('have a height of 600', () => {
    expect(game.config.height).toEqual(600);
  });

  test('have the musicOn set to true', () => {
    expect(game.globals.model.musicOn).toEqual(true);
  });

  test('have an Object of scenes', () => {
    expect(typeof game.scene._pending).toEqual('object');
  });

  test('have an Object of 6 scenes', () => {
    expect(game.scene._pending.length).toEqual(6);
  });
});

describe('Player', () => {
  let game;
  beforeAll(() => {
    game = new Game();
  });

  test('score should be 0 when starting the game', () => {
    expect(game.globals.playerScore.player_score).toEqual(0);
  });

  test('score array should be empty when starting the game', () => {
    expect(game.globals.playerScore.scores.length).toEqual(0);
  });

  test('score should be updated', () => {
    let i = 0;
    while (i < 8) {
      game.globals.playerScore.updateScore();
      i += 1;
    }
    expect(game.globals.playerScore.player_score).toEqual(80);
  });

  test('score should be reseted after submiting the score', () => {
    game.globals.playerScore.resetScore();
    let i = 0;
    while (i < 5) {
      game.globals.playerScore.updateScore();
      i += 1;
    }
    expect(game.globals.playerScore.player_score).toEqual(50);
    game.globals.playerScore.submitScore('Yair');
    expect(game.globals.playerScore.player_score).toEqual(0);
  });
});
