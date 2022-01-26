const tiles = document.querySelectorAll(".tile");
const insertedWords = [];
let currentRow = 0;
insertedWords[0] = [];
let currentGuess;
let waiting = false;
const maxRow = 6;

const keys = document.querySelectorAll("#keyboard button");
keys.forEach((key) => {
  key.addEventListener("click", () =>
    handleKeyboardClick(key.getAttribute("data-key"))
  );
});

function handleKeyboardClick(key) {
  if (waiting) return;
  const currentPile = currentRow * 5 + insertedWords[currentRow].length;

  // Next Row
  if (key == "↵") {
    if (currentRow >= maxRow) {
      return;
    }
    if (insertedWords[currentRow].length < 5) {
      displayMessage("Not enough letters");
      return;
    }
    checkGuess();
    return;
  }

  // Backspace
  if (key == "←") {
    if (insertedWords[currentRow] <= 0) return;
    tiles[currentPile - 1].textContent = "";
    insertedWords[currentRow].pop();
    return;
  }

  // Prevent Exceed 5
  if (insertedWords[currentRow].length >= 5) return;

  // Insert Word
  insertedWords[currentRow].push(key);
  tiles[currentPile].textContent = key;
  console.log(insertedWords[currentRow]);
}

function checkGuess() {
  // Disable Keyboard
  waiting = true;
  displayLoading(true);

  currentGuess = insertedWords[currentRow].join("");
  console.log("Guess: " + currentGuess);

  $.ajax({
    url: "/",
    type: "POST",
    data: { word: currentGuess },
  }).done((data) => {
    if (data.valid) {
      console.log("valid");
      const result = data.correctness;

      setColor(result);
      currentRow++;
      insertedWords[currentRow] = [];
    } else {
      console.log("invalid");
      displayMessage("Not in word list");
    }

    // Enable Keyboard
    waiting = false;
    displayLoading(false);
  });
}

function setColor(data) {
  for (let i = 0; i < 5; i++) {
    const pileIndex = currentRow * 5 + i;
    const key = document.querySelector(
      `[data-key=${insertedWords[currentRow][i]}]`
    );
    switch (data[i]) {
      case 0:
        tiles[pileIndex].dataset.state = "notExist";
        if (key.dataset.state != "correct" && key.dataset.state != "exist") {
          key.dataset.state = "notExist";
        }
        break;
      case 1:
        tiles[pileIndex].dataset.state = "exist";
        if (key.dataset.state != "correct") {
          key.dataset.state = "exist";
        }
        break;
      case 2:
        tiles[pileIndex].dataset.state = "correct";
        key.dataset.state = "correct";
        break;
      default:
        break;
    }
  }
}

function displayMessage(msg) {
  const msgContainer = document.getElementById("messageContainer");
  const msgBox = document.createElement("div");
  msgBox.classList.add("message");
  msgBox.appendChild(document.createTextNode(msg));
  msgContainer.prepend(msgBox);

  setTimeout(() => {
    msgBox.classList.add("fading");
  }, 800);
  setTimeout(() => {
    msgBox.remove();
  }, 1600);
}

function displayLoading(isLoading) {
  const loader = document.getElementById("loader");
  loader.dataset.loading = isLoading;
}
