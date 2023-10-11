/** @format */

async function f() {
  return "Hello world";
}

//it will return a promise resolved as Hello world

async function f() {
  return newPromise((resolve, reject) => {
    setTimeout(() => resolve(true), 10000);
  });
}

const var1 = f();
// if i call var imediatly i will get a pending status
// if i call it after 10 seconds(that is set in the function) it will get a resolved status.

async function f() {
  return Promise.reject(404);
}
// it will give a status rejected  and value 404

// Await keyword
// it is used to wait for the promsie

function getSpecificNumber() {
  return new promises((resolve, reject) => {
    setTimeout(() => resolve(42), 2000);
  });
}

async function f() {
  const specificNumber = await getSpecificNumber();
  console.log(specificNumber);
}
// await keyword only make this function wait until the promsie is completed and rest operation with carry out as usual

//rewrite tha above funciton little bit

function f() {
  getSpecificNumber().then((specificNumber) => console.log(specificNumber));
}

//
function getRandomDogImage() {
  fetch("https://dog.ceo/api/breeds/image/random")
    .then((response) => response.json())
    .then((value) => console.log(value.message));
}

// same using await

async function getRandomDogImage() {
  let response = await fetch("https://dog.ceo/api/breeds/image/random");
  let value = await response.json();
  console.log(value.message);
}

// Handling errors using async await

async function f() {
  const response = await fetch("wrong url");
}

// it will thown an uncaught error
// it this type of case we can use try catch block

async function f() {
  try {
    const response = await fetch("wrong url");
  } catch (e) {
    console.log("come error:" + e);
  }
}

// we can also use this method in another way
async function f() {
  const response = await fetch("wrong url");
}
f().catch((e) => console.log("custom error:" + e));

// the above function will return a promise we can also use this method

// ----
// sequential and parallel Execution

async function oneByOne() {
  const number1 = await printNumber1();
  const number2 = await printNumber2();
  console.log(number1, number2);
}

// in this function after completing the number1 then will be nuber 2 will run and print the result

async function inParallel() {
  const promise1 = printNumber1();
  const promise2 = printNumber2();
  const number1 = await promise1();
  const number2 = await promise2();
  console.log(number1, number2);
}

// it this case we will get two results at a same time
// it means both function run in parallel waiting for each other

//we can do a small refactor here

async function inParallel() {
  const promise1 = printNumber1();
  const promise2 = printNumber2();
  const [number1, number2] = [await promise1, await promise2];
  console.log(number1, number2);
}
