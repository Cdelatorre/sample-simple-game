window.addEventListener("load", function () {
  const startButton = document.getElementById("start-btn");
  const board = document.getElementById("game-board");
  const game = new Game(board);

  startButton.addEventListener("click", function () {
    startButton.style.display = "none";
    game.start();
  });
});
