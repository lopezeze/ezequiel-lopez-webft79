const palette = document.querySelector("#palette");
const generateButton = document.querySelector("#generate-btn");
const paletteSize = document.querySelector("#palette-size");
const paletteStatus = document.querySelector("#palette-status");
const toast = document.querySelector("#toast");
const formatInputs = document.querySelectorAll('input[name="format"]');

function randomNumber(max) {
  return Math.floor(Math.random() * max);
}

function generateHex() {
  const characters = "0123456789ABCDEF";
  let hex = "#";

  for (let i = 0; i < 6; i++) {
    hex += characters[randomNumber(characters.length)];
  }

  return hex;
}

function generateRgba() {
  const red = randomNumber(256);
  const green = randomNumber(256);
  const blue = randomNumber(256);

  return `rgba(${red}, ${green}, ${blue}, 1)`;
}

function getSelectedFormat() {
  const selected = document.querySelector('input[name="format"]:checked');
  return selected.value;
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(showToast.timeout);
  showToast.timeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 1800);
}

async function copyColor(color) {
  try {
    await navigator.clipboard.writeText(color);
    showToast(`${color} copiado al portapapeles`);
  } catch (error) {
    showToast("No se pudo copiar el color");
  }
}

function createColorCard(color, index) {
  const card = document.createElement("article");
  card.className = "color-card";
  card.style.backgroundColor = color;
  card.style.animationDelay = `${index * 40}ms`;

  const colorButton = document.createElement("button");
  colorButton.className = "color-value";
  colorButton.type = "button";
  colorButton.textContent = color;
  colorButton.setAttribute("aria-label", `Copiar color ${color}`);

  colorButton.addEventListener("click", () => copyColor(color));

  card.appendChild(colorButton);
  return card;
}

function generatePalette() {
  const amount = Number(paletteSize.value);
  const format = getSelectedFormat();

  palette.innerHTML = "";

  for (let i = 0; i < amount; i++) {
    const color = format === "hex" ? generateHex() : generateRgba();
    palette.appendChild(createColorCard(color, i));
  }

  paletteStatus.textContent = `${amount} colores generados en formato ${format.toUpperCase()}.`;
  showToast("Nueva paleta generada");
}

generateButton.addEventListener("click", generatePalette);

// La aplicación empieza con una paleta visible para que el usuario
// entienda cómo funciona sin tener que descubrir primero el botón.
generatePalette();
