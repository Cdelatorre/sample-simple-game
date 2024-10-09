class Enemy {
  constructor(board) {
    this.board = board;
    this.width = 60;
    this.height = 40;
    this.x = this.board.clientWidth;
    this.y = 80;
    this.vx = 10;

    this.element = document.createElement("div");
    this.element.style.position = "absolute";
    this.element.className = "enemy";

    this.element.style.backgroundImage = "url('./assets/img/enemy.png')";
    this.element.style.backgroundPosition = "center";
    this.element.style.backgroundSize = "cover";
    this.element.style.backgroundRepeat = "no-repeat";
  }

  draw() {
    this.element.style.width = this.width + "px";
    this.element.style.height = this.height + "px";
    this.element.style.left = this.x + "px";
    this.element.style.bottom = this.y + "px";

    this.board.appendChild(this.element);
  }

  move() {
    this.x -= this.vx;
  }
}
