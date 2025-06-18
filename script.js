const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

let currentInput = "0";

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.getAttribute("data-value");
    handleInput(value);
  });
});

function handleInput(value) {
  if (value === "C") {
    currentInput = "0";
  } else if (value === "←") {
    if (currentInput.length > 1) {
      currentInput = currentInput.slice(0, -1);
    } else {
      currentInput = "0";
    }
  } else if (value === "=") {
    try {
      // Evaluate safely by replacing any accidental invalid endings
      const sanitized = currentInput.replace(/[^-()\d/*+.]/g, "");
      currentInput = eval(sanitized).toString();
    } catch {
      currentInput = "Error";
    }
  } else {
    if (currentInput === "0" && !["+", "-", "*", "/", "."].includes(value)) {
      currentInput = value;
    } else {
      const lastChar = currentInput.slice(-1);
      // Prevent two operators in a row
      if (
        ["+", "-", "*", "/"].includes(lastChar) &&
        ["+", "-", "*", "/"].includes(value)
      ) {
        currentInput = currentInput.slice(0, -1) + value;
      } else {
        currentInput += value;
      }
    }
  }
  updateDisplay();
}

function updateDisplay() {
  display.textContent = currentInput;
}

// Optional: Keyboard support
document.addEventListener("keydown", (e) => {
  const key = e.key;
  if (key === "Enter") {
    handleInput("=");
  } else if (key === "Backspace") {
    handleInput("←");
  } else if (key.toLowerCase() === "c") {
    handleInput("C");
  } else if (
    (key >= "0" && key <= "9") ||
    ["+", "-", "*", "/", "."].includes(key)
  ) {
    handleInput(key);
  }
});
