class LiveCounter {
  constructor(board, lives) {
    this.lives = lives;
    this.board = board;

    this.heart = document.createElement("img");
    this.heart.src = "./assets/img/heart.png";
    this.heart.className = "heart";
    this.heart.style.position = "absolute";
    this.heart.style.width = "30px";
    this.heart.style.height = "30px";
    this.heart.style.zIndex = "10";
  }

  draw() {
    const hearts = this.board.querySelectorAll(".heart");

    hearts.forEach((heart) => {
      heart.remove();
    });

    Array(this.lives)
      .fill("x")
      .forEach((_, index) => {
        this.heart.style.left = `${(index + 1) * 30}px`;
        this.heart.style.top = "20px";

        this.board.appendChild(this.heart.cloneNode());
      });
  }
}
