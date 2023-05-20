import Notiflix from 'notiflix';

const form = document.querySelector('.form');

function delayPromise(delay) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

 function createPromise(position, delay) {
  try {
    // await delayPromise(delay);
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      return { position, delay };
    } else {
      throw { position, delay };
    }
  } catch (error) {
    throw error;
  }
}
form.addEventListener('submit',  event => {
  event.preventDefault();
  const delay = Number(event.target.elements.delay.value);
  const step = Number(event.target.elements.step.value);
  const amount = Number(event.target.elements.amount.value);
  try {
    for (let i = 1; i <= amount; i++) {
      const { delay: promiseDelay } = createPromise(i, delay);
      console.log(`Fulfilled promise ${i} in ${promiseDelay}ms`);
      Notiflix.Notify.success(`Fulfilled promise ${i} in ${promiseDelay}ms`);
    }
  } catch (error) {
    const { position, delay } = error;
    console.log(`Rejected promise ${position} in ${delay}ms`);
    Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
  }
});


// const form = document.querySelector('.form');

// function promiceDelay(delay) {
//   return new Promise(resolve => {
//     setTimeout(resolve, delay);
//   });
// }

// function createPromise(position, delay) {
//   try {
//     const shouldResolve = Math.random() > 0.3;
//     if (shouldResolve) {
//       return { position, delay };
//     } else {
//       throw { position, delay };
//     }
//   } catch (error) {
//     throw error;
//   }
// }

// form.addEventListener('submit', evt => {
//   evt.preventDefault();
//   const delay = Number(evt.target.elements.delay.value);
//   const step = Number(evt.target.elements.step.value);
//   const amount = Number(evt.target.elements.amount.value);
//   try {
//     for (let i = 1; i <= amount; i++) {
//       const { delay: promiseDelay } = createPromise(i, delay);
//       console.log(`Fulfilled promise ${i} in ${promiseDelay}ms`);
//       Notiflix.Notify.success(`Fulfilled promise ${i} in ${promiseDelay}ms`);
//     }
//   } catch (error) {
//     const { position, delay } = error;
//     console.log(`Rejected promise ${position} in ${delay}ms`);
//     Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
//   }
// });
