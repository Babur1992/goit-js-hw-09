import Notiflix from 'notiflix';

const form = document.querySelector('.form');

async function createPromise(position, delay) {
  try {
    const promiseResult = await new Promise((resolve, reject) => {
      setTimeout(() => {
        const shouldResolve = Math.random() > 0.3;
        if (shouldResolve) {
          resolve({ position, delay });
        } else {
          reject({ position, delay });
        }
      }, delay);
    });
    return promiseResult;
  } catch (error) {
    throw error;
  }
}
form.addEventListener('submit', async event => {
  event.preventDefault();
  const delay = Number(event.target.elements.delay.value);
  const step = Number(event.target.elements.step.value);
  const amount = Number(event.target.elements.amount.value);
  try {
    for (let i = 1; i <= amount; i++) {
      const { delay: promiseDelay } = await createPromise(
        i,
        delay + step * (i - 1)
      );
      console.log(`Fulfilled promise ${i} in ${promiseDelay}ms`);
      Notiflix.Notify.success(`Fulfilled promise ${i} in ${promiseDelay}ms`);
    }
  } catch (error) {
    const { position, delay } = error;
    console.log(`Rejected promise ${position} in ${delay}ms`);
    Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
  }
});
