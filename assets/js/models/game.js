class Game {
  constructor(board, character) {
    this.board = board;
    this.background = new Background(this.board);
    this.clouds = new Clouds(this.board, 0.2);
    this.player = new Player(this.board, character);
    this.liveCounter = new LiveCounter(this.board, this.player.lives);
    this.enemies = [];
    this.items = itemsData.map(
      (itemData) => new Item(this.board, itemData.itemType, itemData.x)
    );

    console.log(character);

    this.enemyTick = 100;
    this.tick = 0;
    this.interval = null;
    this.gameOverBoard = document.querySelector("#game-over");
  }

  start() {
    this.interval = setInterval(() => {
      this.move();
      this.draw();
      this.checkCollisions();

      this.tick++;

      if (this.tick % this.enemyTick === 0) {
        this.enemies.push(new Enemy(this.board));
      }
      // this.cleanup();
    }, 1000 / 60);

    this.liveCounter.draw();
  }

  move() {
    this.player.move();
    this.clouds.move(this.player);
    this.background.move(this.player);

    this.enemies.forEach((enemy) => {
      enemy.move();
    });

    this.items.forEach((item) => {
      if (this.player.actions.right && this.player.isMiddle) {
        item.move(this.player.vx);
      }
    });
  }

  cleanup() {}

  draw() {
    this.background.draw();
    this.clouds.draw();
    this.player.draw();

    this.enemies.forEach((enemy) => {
      enemy.draw();
    });

    this.items.forEach((item) => {
      item.draw();
    });
  }

  checkCollisions() {
    const enemy = this.enemies.find((enemy) => {
      return this.player.collideWith(enemy);
    });

    if (enemy) {
      this.enemies = this.enemies.filter(
        (enemyFromArr) => enemyFromArr !== enemy
      );
      enemy.element.remove();
      this.player.lives -= 1;
      this.liveCounter.lives = this.player.lives;
      this.liveCounter.draw();

      if (this.player.lives === 0) {
        window.clearInterval(this.interval);
        this.gameOverBoard.style.display = "flex";
      }
    }

    this.player.bullets.find((bullet) => {
      const enemyCollided = this.enemies.find((enemy) => {
        return bullet.collideWith(enemy);
      });

      if (enemyCollided) {
        enemyCollided.element.remove();
        this.enemies = this.enemies.filter(
          (enemyFromArr) => enemyFromArr !== enemyCollided
        );

        bullet.element.remove();
        this.player.bullets = this.player.bullets.filter(
          (bulletFromArr) => bulletFromArr !== bullet
        );
      }
    });

    this.items.find((item) => {
      if (this.player.collideWith(item)) {
        item.element.remove();
        this.items = this.items.filter((itemFromArr) => itemFromArr !== item);

        if (item.itemType === "potion") {
          this.player.lives++;
          this.liveCounter.lives = this.player.lives;
          this.liveCounter.draw();
        }

        if (item.itemType === "super-potion") {
          this.player.width += 10;
          this.player.height += 20;

          setTimeout(() => {
            this.player.width -= 10;
            this.player.height -= 20;
          }, 5000);
        }
      }
    });
  }
}
