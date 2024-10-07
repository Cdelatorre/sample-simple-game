class Player {
  constructor(board) {
    this.board = board;
    this.width = 20;
    this.height = 40;
    this.x = 0;
    this.y0 = MAIN_FLOOR;
    this.y = this.y0;
    this.vy = 5;
    this.vx = 5;
    this.isMiddle = false;
    this.bullets = [];

    this.element = document.createElement("div");
    this.element.style.position = "absolute";
    this.element.className = "player";
    this.element.style.backgroundColor = "red";
    this.setListeners();

    this.movements = {
      up: false,
      down: false,
      left: false,
      right: false,
    };
  }

  draw() {
    this.element.style.width = this.width + "px";
    this.element.style.height = this.height + "px";
    this.element.style.left = this.x + "px";
    this.element.style.bottom = this.y + "px";

    this.board.appendChild(this.element);

    this.bullets.forEach((bullet) => {
      bullet.draw();
    });
  }

  setListeners() {
    window.addEventListener("keydown", (event) => {
      switch (event.key) {
        case "ArrowUp":
          this.movements.up = true;
          break;
        case "ArrowDown":
          this.movements.down = true;
          break;
        case "ArrowLeft":
          this.movements.left = true;
          break;
        case "ArrowRight":
          this.movements.right = true;
          break;
        case " ":
          console.log("shoot");
          this.shoot();
          break;
      }
    });

    window.addEventListener("keyup", (event) => {
      switch (event.key) {
        case "ArrowUp":
          this.movements.up = false;
          break;
        case "ArrowDown":
          this.movements.down = false;
          break;
        case "ArrowLeft":
          this.movements.left = false;
          break;
        case "ArrowRight":
          this.movements.right = false;
          break;
      }
    });
  }

  move() {
    // MOVEMENTS

    if (this.movements.up) {
      this.y += this.vy;
    } else if (this.movements.down) {
      this.y -= this.vy;
    }

    if (this.movements.left) {
      this.x -= this.vx;
    } else if (this.movements.right) {
      this.x += this.vx;
    }

    // BOUNDARIES OF THE BOARD

    if (this.x < 0) {
      this.x = 0;
    }
    if (this.x > this.board.clientWidth / 2) {
      this.x = this.board.clientWidth / 2;
      this.isMiddle = true;
    } else {
      this.isMiddle = false;
    }

    if (this.y < MAIN_FLOOR) {
      this.y = this.y0;
    }
    if (this.y > this.board.clientHeight - this.height) {
      this.y = this.board.clientHeight - this.height;
    }

    this.bullets.forEach((bullet) => {
      bullet.move();
    });
  }

  shoot() {
    console.log("entro en el metodo shoot");
    this.bullets.push(
      new Bullet(this.board, this.x + this.width / 2, this.y + this.height / 2)
    );
  }
}
