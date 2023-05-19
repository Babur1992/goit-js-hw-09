const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const body = document.body;
let taimerlId = null;

startBtn.addEventListener('click', () => {
  startBtn.disabled = true;
  stopBtn.disabled = false;
  taimerlId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
});

stopBtn.addEventListener('click', () => {
  startBtn.disabled = false;
  stopBtn.disabled = true;
  clearInterval(taimerlId);
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
