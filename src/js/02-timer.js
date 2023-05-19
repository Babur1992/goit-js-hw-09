import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const input = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const days = document.querySelector('[ data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
   alert("Please choose a date in the future");
      document.querySelector('[data-start]').disabled = true;
    } else {
      document.querySelector('[data-start]').disabled = false;
    }
  },
};



flatpickr("#datetime-picker", options);


function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function startTimer(endTime) {
  function update() {
    const timeLeft = endTime - new Date();
    if (timeLeft <= 0) {
      clearInterval(timer);
      days.textContent = "00";
      hours.textContent = "00";
      minutes.textContent = "00";
      seconds.textContent = "00";
      return;
    }
    const { days: d, hours: h, minutes: m, seconds: s } = convertMs(timeLeft);
    days.textContent = addLeadingZero(d);
    hours.textContent = addLeadingZero(h);
    minutes.textContent = addLeadingZero(m);
    seconds.textContent = addLeadingZero(s);
  }
  update();
  const timer = setInterval(update, 1000);
}

function convertMs(ms) {
    const minute = 60 * 1000;
    const hour = 60 * minute;
    const day = 24 * hour;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor((ms % hour) / minute);
    const seconds = Math.floor((ms % minute) / 1000);

  return { days, hours, minutes, seconds };
}

document.querySelector('[data-start]').disabled = true;
document.querySelector('[data-start]').addEventListener('click', () => {
  const selectedDate = new Date(document.querySelector('#datetime-picker').value);
  startTimer(selectedDate);
});

