const tiles = document.querySelectorAll(".tile");
const insertedWords = [];
let currentRow = 0;
insertedWords[0] = [];
let currentGuess;

const keys = document.querySelectorAll("#keyboard button");
keys.forEach((key) => {
  key.addEventListener("click", () =>
    handleKeyboardClick(key.getAttribute("data-key"))
  );
});

function handleKeyboardClick(key) {
  const currentPile = currentRow * 5 + insertedWords[currentRow].length;

  // Next Row
  if (key == "↵") {
    if (currentRow >= 5 || insertedWords[currentRow].length < 5) {
      return;
    }
    checkGuess();
    currentRow++;
    insertedWords[currentRow] = [];
    return;
  }

  // Backspace
  if (key == "←") {
    tiles[currentPile].textContent = "";
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
  currentGuess = insertedWords[currentRow].join("");
  console.log("Guess: " + currentGuess);
  $.ajax({
    url: "/",
    type: "POST",
    data: { word: currentGuess },
  }).done((data) => {
    console.log(data);
  });
}
