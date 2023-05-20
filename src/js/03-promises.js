import Notiflix from 'notiflix';

const form = document.querySelector('.form');

function delayPromise(delay) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        const shouldResolve = Math.random() > 0.3;
        if (shouldResolve) {
          resolve({ position, delay });
        } else {
          reject({ position, delay });
        }
      }, delay);
    } catch (error) {
      reject(error);
    }
  });
}

form.addEventListener('submit', evt => {
  evt.preventDefault();
  const delay = Number(evt.target.elements.delay.value);
  const step = Number(evt.target.elements.step.value);
  const amount = Number(evt.target.elements.amount.value);

  let currentDelay = delay;

  try {
    for (let i = 1; i <= amount; i++) {
      (function (i, currentDelay) {
        setTimeout(() => {
          createPromise(i, currentDelay)
            .then(({ position, delay: promiseDelay }) => {
              console.log(
                `✅ Fulfilled promise ${position} in ${promiseDelay}ms`
              );
              Notiflix.Notify.success(
                `Fulfilled promise ${position} in ${promiseDelay}ms`
              );
            })
            .catch(({ position, delay }) => {
              console.log(`❌ Rejected promise ${position} in ${delay}ms`);
              Notiflix.Notify.failure(
                `Rejected promise ${position} in ${delay}ms`
              );
            });
        }, currentDelay);
      })(i, currentDelay);

      currentDelay += step;
    }
  } catch (error) {
    const { position, delay } = error;
    console.log(`❌ Rejected promise ${position} in ${delay}ms`);
    Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
  }
});
