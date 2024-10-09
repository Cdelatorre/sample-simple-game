window.addEventListener("load", function () {
  const characterCards = document.querySelectorAll(".character-card");
  const characterSelector = document.getElementById("character-selector");
  const startButton = document.getElementById("start-btn");
  const bgSound = document.getElementById("bg-sound");
  const board = document.getElementById("game-board");
  let datacharacter = null;

  characterCards.forEach((characterCard) => {
    characterCard.addEventListener("click", function (event) {
      const character = event.currentTarget;
      datacharacter = character.dataset.character;

      characterCards.forEach((characterCard) => {
        characterCard.style.border = "none";
      });

      character.style.border = "2px solid red";
      startButton.style.display = "block";
    });
  });

  startButton.addEventListener("click", function () {
    startButton.style.display = "none";
    characterSelector.remove();
    const game = new Game(board, datacharacter);
    game.start();
    bgSound.play();
  });
});
