class Player {
  constructor(board, character) {
    this.board = board;
    this.width = 40;
    this.height = 60;
    this.x = 0;
    this.y0 = MAIN_FLOOR;
    this.y = this.y0;
    this.vy = 10;
    this.vx = 5;
    this.isMiddle = false;
    this.bullets = [];

    this.element = document.createElement("div");
    this.element.style.position = "absolute";
    this.element.className = "player";
    this.element.style.backgroundImage = `url('./assets/img/${character}.png')`;
    this.element.style.backgroundPosition = "center";
    this.element.style.backgroundSize = "cover";
    this.element.style.backgroundRepeat = "no-repeat";

    this.setListeners();

    this.actions = {
      isJumping: false,
      up: false,
      down: false,
      left: false,
      right: false,
      canShoot: true,
    };

    this.lives = 11;
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
        // case "ArrowUp":
        //   this.actions.up = true;
        //   break;
        // case "ArrowDown":
        //   this.actions.down = true;
        //   break;
        case "ArrowLeft":
          this.actions.left = true;
          break;
        case "ArrowRight":
          this.actions.right = true;
          break;
        case " ":
          this.actions.isJumping = true;
          break;
        case "z":
          console.log("shoot");
          this.shoot();
          break;
      }
    });

    window.addEventListener("keyup", (event) => {
      switch (event.key) {
        // case "ArrowUp":
        //   this.actions.up = false;
        //   break;
        // case "ArrowDown":
        //   this.actions.down = false;
        //   break;
        case "ArrowLeft":
          this.actions.left = false;
          break;
        case "ArrowRight":
          this.actions.right = false;
          break;
      }
    });
  }

  move() {
    // MOVEMENTS
    if (this.actions.isJumping) {
      this.y += this.vy;
      this.vy -= 0.6;

      if (this.y < this.y0) {
        this.y = this.y0;
        this.actions.isJumping = false;
        this.vy = 10;
      }
    }

    // if (this.actions.up) {
    //   this.y += this.vy;
    // } else if (this.actions.down) {
    //   this.y -= this.vy;
    // }

    if (this.actions.left) {
      this.x -= this.vx;
    } else if (this.actions.right) {
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
    if (this.actions.canShoot) {
      this.bullets.push(
        new Bullet(
          this.board,
          this.x + this.width / 2,
          this.y + this.height / 2
        )
      );

      this.actions.canShoot = false;

      setTimeout(() => {
        this.actions.canShoot = true;
      }, 1000);
    }
  }

  collideWith(entity) {
    return (
      this.x < entity.x + entity.width &&
      this.x + this.width > entity.x &&
      this.y < entity.y + entity.height &&
      this.height + this.y > entity.y
    );
  }
}
