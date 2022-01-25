const tiles = document.querySelectorAll(".tile");
const insertedWords = [];
let currentRow = 0;
insertedWords[0] = [];

const keys = document.querySelectorAll("#keyboard button");
keys.forEach((key) => {
  key.addEventListener("click", () =>
    handleKeyboardClick(key.getAttribute("data-key"))
  );
});

function handleKeyboardClick(key) {
  // Next Row
  if (key == "↵") {
    if (currentRow >= 5) {
      return;
    }
    currentRow++;
    insertedWords[currentRow] = [];
    return;
  }

  // Backspace
  if (key == "←") {
    insertedWords[currentRow].pop();
    const index = currentRow * 5 + insertedWords[currentRow].length;
    tiles[index].textContent = "";
    return;
  }

  // Prevent Exceed 5
  if (insertedWords[currentRow].length >= 5) return;

  // Insert Word
  insertedWords[currentRow].push(key);
  const index = currentRow * 5 + insertedWords[currentRow].length - 1;
  tiles[index].textContent = key;
  console.log(insertedWords[currentRow]);
}
