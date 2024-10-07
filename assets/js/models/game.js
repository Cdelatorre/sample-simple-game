class Game {
  constructor(board) {
    this.board = board;
    this.background = new Background(this.board);
    this.clouds = new Clouds(this.board, 0.2);
    this.player = new Player(this.board);
  }

  start() {
    setInterval(() => {
      this.move();
      this.draw();
      // this.cleanup();
    }, 1000 / 60);
  }

  move() {
    this.player.move();
    this.clouds.move(this.player);
    this.background.move(this.player);
  }

  cleanup() {}

  draw() {
    this.background.draw();
    this.clouds.draw();
    this.player.draw();
  }
}
