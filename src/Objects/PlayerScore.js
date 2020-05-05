import 'regenerator-runtime/runtime';
import { getBoardHTML } from '../Util/DOM';

export default class PlayerScore {
  constructor(scene) {
    this.scene = scene;
    this.id = 'eFTPsewuS1FDOkrhwkBr',
    this.player_score = 0;
    this.scores = [];
    this.getPlayerScore();
  }

  updateScore() {
    this.player_score += 10;
  }

  resetScore() {
    this.player_score = 0;
  }

  getPlayerScore() {
    return this.player_score;
  }

  async submitScore(player) {
    if (this.player_score > 0) {
      const init = {
        method: 'POST',
        body: JSON.stringify({
          user: `${player}`,
          score: this.player_score,
        }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      };

      try {
        await fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${this.id}/scores/`, init);
        this.player_score = 0;
      } catch (error) {
        console.log(error);
      }
    }
  }

  async getScores() {
    try {
      const res = await fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${this.id}/scores/`);
      const data = await res.json();
      this.scores = data.result.sort((a, b) => {
        if (a.score < b.score) {
          return 1;
        }

        if (a.score > b.score) {
          return -1;
        }

        return 0;
      });
    } catch (error) {
      console.log(error);
    }
  }

  showLeaderBoard() {
    return getBoardHTML(this.scores);
  }
}
