/** @format */

// what about task priorities
//call stack
//task queue
//both are data structures used by js engine

//How javascript engine executes code

//advanced version of event loop in the browser
// (every browser have their own types of task  queues to pririotise it better, goggle cchrome and fire fox urrently have 3 task queues )
//call stack
//seperate task queue for timers
//seperate task queue for http request
//seperate task queue for user event handlers

// Task queues
// Rules of task queue

// 1. Task from the same task queues are executed in order they arrived.
// 2. Tasks of the same type should go to the same task queue.

// every browser has a rendering pipeline that runs from time to time in order to paint
// it does this repaint job 60  times per second or every 16ms
// redering pipeline can run only between these tasks, and cannot run with no tasks

//how to handle a long task without freezing the page(like some funcitons will take some time to give input)

function generateNumbers() {
  const arrayOfNumbers = [];
  for (let i = 1; i <= MAX_NUMERS; i++) {
    arrayOfNumbers.push(i);
  }
  return arrayOfNumbers;
}

// function that freezes the browser
const MAX_NUMBER = 27654321;
// straightForward Solution here
function straightforwardSolution() {
  let arrayOfNumbers = generateNumbers();
  const squareRoots = [];
  arrayOfNumbers.forEach((number) => {
    const sqRoot = Math.sqrt(number);
    squareRoots.push(sqRoot);
    const numbersLeft = MAX_NUMBER - number;
    element.textContent = numbersLeft + "items left to process";
  });
}

//optimised solution
//in this function main array is sepearated into multiple small array for better calculation process for the computer
function optimizedSolution() {
  let arrayOfNumbers = generateNumbers();
  const squareRoots = [];
  function processBatch() {
    const BATCH_SIZE = 50000;
    const batch = arrayOfNumbers.slice(0, BATCH_SIZE);
    arrayOfNumbers = arrayOfNumbers.slice(BATCH_SIZE);
    batch.forEach((number) => {
      const sqRoot = Math.sqrt(number);
      squareRoots.push(sqRoot);
      const numbersLeft = MAX_NUMBER - number;
      element.textContent = numbersLeft + "items left to process";
    });
    if (arrayOfNumbers.length > 0) {
      setTimeout(processBatch, 0);
    }
  }
  setTimeout(processBatch, 0);
}

// microtasks

// microtasks are special kind of tasks queue called microtask queue. micrtask are different form regular task

//how to create microtasks
// 1. promises
// every time we add a .then or  .catch block to it, the quote inside it will go to microtask queue
// 2. queueMicroTask (callback)
//  Rules of microtask queue
// 1. javascript engine checks microtask queue everytime a call stack becomes empty
// 2. if there are multiple microtasks in the microtask queue, all of them must be executed before redering pipeline can run.
// 3. If you add more microtasks while previous microtasks are running, these new microtasks will also have to run before the rendering pipeline.

function microtasksSolution() {
  //microtask solution here
  let arrayOfNumbers = generateNumbers();
  const squareRoots = [];

  function processBatch() {
    const BATCH_SIZE = 50000;
    const batch = arrayOfNumbers.slice(0, BATCH_SIZE);
    arrayOfNumbers = arrayOfNumbers.slice(BATCH_SIZE);
    batch.forEach((number) => {
      const sqRoot = Math.sqrt(number);
      squareRoots.push(sqRoot);
      const numbersLeft = MAX_NUMBER - number;
      element.textContent = numbersLeft + "items left to process";
    });
    if (arrayOfNumbers.length > 0) {
      queueMicrotask(processBatch);
    }
  }
  queueMicrotask(processBatch);
}
// in this above method while executing microtask no other task will execute even the rendering pipeline so the function will freeze the window

// rewriting the above method
function microtasksSolution() {
  //microtask solution here
  let arrayOfNumbers = generateNumbers();
  const squareRoots = [];

  function processBatch() {
    const BATCH_SIZE = 50000;
    const batch = arrayOfNumbers.slice(0, BATCH_SIZE);
    arrayOfNumbers = arrayOfNumbers.slice(BATCH_SIZE);
    batch.forEach((number) => {
      const sqRoot = Math.sqrt(number);
      squareRoots.push(sqRoot);
      const numbersLeft = MAX_NUMBER - number;
      element.textContent = numbersLeft + "items left to process";
    });
    if (arrayOfNumbers.length > 0) {
      Promise.resolve().then(processBatch);
    }
  }
  Promise.resolve().then(processBatch);
}
//this funciton will also freeze the window because promise will also add to the microtask queue

// example with settimeout and promises on how call stack and task queue works

console.log(1); // it is added to the call stack

setTimeout(() => console.log(2), 0); // setTimeout will be added to the timer functions Task queue

Promise.resolve().then(() => console.log(3)); // Promises are added to microtask queue, because promises are micro task

console.log(4); // it will be added to cal stack, because it is synchronous

// after executing the both console.logs in call stack will become empty,
// each time call stack becomes empty it will search for task in microtask queue,
//if there is a task in micro task queue js will put it in the call stack and executes it,
//  call stack is empty again and then the js will check microtask now it is also empty ,
// now js will check for task in task queue and put that task in call stack

//Animation frame queue

// 1. you can add tasks to animation frame queue by invoking requestAnimationFrame(callback)
// 2. If there are multiple tasks in the animation queue, all of them will be executed during browser repaint time.
// 3. However, if you add more tasks to the Animation Queue during this process, they will have to wait until the next iteration.

// check course video for code example
