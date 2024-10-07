class Bullet {
  constructor(board, x, y) {
    this.board = board;
    this.x = x;
    this.y = y;
    this.width = 10;
    this.height = 10;
    this.vx = 15;

    this.element = document.createElement("div");
    this.element.style.position = "absolute";
    this.element.style.backgroundColor = "blue";
  }

  draw() {
    this.element.style.width = this.width + "px";
    this.element.style.height = this.height + "px";
    this.element.style.left = this.x + "px";
    this.element.style.bottom = this.y + "px";

    this.board.appendChild(this.element);
  }

  move() {
    this.x += this.vx;
  }
}
