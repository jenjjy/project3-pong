import { SVG_NS, KEYS } from '../settings';
import Board from './Board';
import Paddle from './Paddle';
import Ball from './Ball';
import Score from './Score';

export default class Game {
  constructor(element, width, height) {
    this.element = element;
    this.width = width;
    this.height = height;
    this.gameOver = false;

    this.paddleWidth = 8;
    this.paddleHeight = 56;
    this.boardGap = 10;

    this.player1 = new Paddle(
      this.height,
      this.width / 2,
      this.paddleWidth,
      this.paddleHeight,
      this.boardGap,
      (this.height - this.paddleHeight) / 2,
      KEYS.w,
      KEYS.s,
      KEYS.a,
      KEYS.d,
      'player1'
    );

    this.player2 = new Paddle(
      this.height,
      this.width,
      this.paddleWidth,
      this.paddleHeight,
      this.width - this.boardGap - this.paddleWidth,
      (this.height - this.paddleHeight) / 2,
      KEYS.up,
      KEYS.down,
      KEYS.left,
      KEYS.right,
      'player2'
    );

    document.addEventListener('keydown', event => {
      switch (event.key) {
        case KEYS.spaceBar:
          this.pause = !this.pause;
          break;
      }
    }); //end of addEventListener

    this.gameElement = document.getElementById(this.element);
    this.board = new Board(this.width, this.height);
    this.ball = new Ball(8, this.width, this.height);
    this.score1 = new Score(this.width / 2 - 50, 30, 30);
    this.score2 = new Score(this.width / 2 + 30, 30, 30);
  } //end of constructor

  render() {
    if (this.pause) {
      return;
    }
    if (this.player1.score === 5 && !gameOver) {
      alert('Player 1 wins!');
      gameOver = true;
      location.reload();
    }
    if (this.player2.score === 5 && !gameOver) {
      alert('Player 2 wins!');
      gameOver = true;
      location.reload();
    }

    this.gameElement.innerHTML = '';
    let svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttributeNS(null, 'width', this.width);
    svg.setAttributeNS(null, 'height', this.height);
    svg.setAttributeNS(null, 'viewbox', `0 0 ${this.width} ${this.height}`);
    this.gameElement.appendChild(svg);

    this.board.render(svg);
    this.player1.render(svg);
    this.player2.render(svg);
    this.ball.render(svg, this.player1, this.player2);
    this.score1.render(svg, this.player1.score);
    this.score2.render(svg, this.player2.score);
  } //end of render
} //end of Game
