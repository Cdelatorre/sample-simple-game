class Item {
  constructor(board, itemType, x) {
    this.board = board;
    this.itemType = itemType;
    this.width = 20;
    this.height = 24;
    this.x = x;
    this.y = MAIN_FLOOR;

    this.element = document.createElement("img");
    this.element.style.position = "absolute";
    this.element.className = "item";
    this.element.src = `./assets/img/${itemType}.png`;
  }

  move(speed) {
    if (speed > 0) this.x -= speed;
  }

  draw() {
    this.element.style.width = this.width + "px";
    this.element.style.height = this.height + "px";
    this.element.style.left = this.x + "px";
    this.element.style.bottom = this.y + "px";

    this.board.appendChild(this.element);
  }
}
