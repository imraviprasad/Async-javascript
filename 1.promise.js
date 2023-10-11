/** @format */
// //how to create a promise
// const myPromise = new Promise((resolve, reject) => {
//   resolve("Hello world");
// });

// //how to use a js promise
// myPromise.then((value) => {
//   //   console.log(value);
// });

function calculateSquare(number) {
  const promise = new Promise(function (resolve, reject) {
    setInterval(() => {
      if (typeof number !== "number") {
        return reject(new Error("Argumnet of type number is expected"));
      }
      const result = number * number;
      resolve(number);
    }, 1000);
  });
  return promise;
}

calculateSquare(2).then(
  (value) => {
    console.log("success:" + value);
  },
  (reason) => {
    console.log("Error:" + reason);
  }
);

// how to promisify a js function

//before promise
function capitalize(text) {
  return text[0].UpperCase() + text.substr(1);
}

//after promise
function capitalize(text) {
  return new Promise((resolve, reject) => {
    if (typeof text !== "string") {
      return reject(new Error("Argument must be a string"));
    }
    const result = text[0].toUpperCase() + text.substr(1);
    return resolve(result);
  });
}

//chaining promises

calculateSquare(1)
  .then(() => {
    console.log(value);
    //need to return something to continue the chained promises or else the next value will be undefined
    return calculateSquare(2);
    //if the promise gets rejected the reason of rejection will go to the reason variable of the next unrejected function
    throw new Error("error");
  })
  .then((value2) => {
    console.log(value2);
  }),
  (reason) => {
    console.log("error happened:" + reason);
  };

//how to make http request using promises
fetch("api")
  .then((response) => response.json())
  .then((data) => console.log(data));

//how to avoid callback hell
// it happens when you have to call multiple async operations one after another

//by using this method each operation will start after getting the return value from the previous function
calculateSquare(1)
  .then((value) => {
    console.log(value);
    return calculateSquare(2);
  })
  .then((value) => {
    console.log(value);
    return calculateSquare(3);
  })
  .then((value) => {
    console.log(value);
    return calculateSquare(5);
  })
  .then((value) => {
    console.log(value);
    return calculateSquare(6);
  })
  .then((value) => {
    console.log(value);
  });

//handling promise rejection

//only successful cases
myPromise.then(onFulfilled);

//only promise rejections
myPromise.then(undefined, onRejected);

calculateSquare(1)
  .then((value) => {
    console.log(value);
    return calculateSquare(2);
  })
  .then((value) => {
    //if any error happens here it will never be caught
    throw new Error("something went wrong");
    console.log(value);
  }),
  (reason) => {
    console.log("error happened" + reason);
  };

// to handle that case

calculateSquare(1)
  .then((value) => {
    console.log(value);
    return calculateSquare(2);
  })
  .then((value) => {
    throw new Error("something went wrong");
    console.log(value);
  })
  .then(undefined, (reason) => {
    console.log("error happened:" + reason);
  });

//we can also use this method for better readability
// it will also do same as the previous function

calculateSquare(1)
  .then((value) => {
    console.log(value);
    return calculateSquare(2);
  })
  .then((value) => {
    throw new Error("something went wrong");
    console.log(value);
  })
  .catch((reason) => {
    console.log("error happened:" + reason);
  });

// So, the promise returned by then gets rejected in 2 cases:
// - throw and error
// - return a rejected promise

// -----
//this function takes promise as a argument and consoles the result
function logToConsole(somePromise) {
  somePromise.then((value) => console.log(value));
}

const somePromise = new Promise((resolve, reject) => {
  resolve("hello");
});

logToConsole(somePromise);
// it will print hello

const value = "string";

logToConsole(value);

// it will throw error like somepromise is not a funciton

// to solve this issue there is method in javascript called promise.resolve
const resolvedPromise = Promise.resolve(anyValue);

const promisifiedValue = Promise.resolve(value);
logToConsole(promisifiedValue);

// like we converted a normal value to a resolved value, we can do that for reject also(promise.reject)

const rejectedPromise = Promise.reject(value);

//-----
// Executing Promises in parallel
// (like giving multiple http request and waiting for the result at a same time)

// for example lets consider this 3 functions as a api giving results and settimeout time as their response time

function askFirstDealer() {
  return newPromise((resolve, reject) => {
    setTimeout(() => resolve(8000), 3000);
  });
}
function askSecondDealer() {
  return newPromise((resolve, reject) => {
    setTimeout(() => resolve(12000), 5000);
  });
}
function askThirdDealer() {
  return newPromise((resolve, reject) => {
    setTimeout(() => resolve(10000), 8000);
  });
}

//it will accept one argument that is array of values
Promise.all([askFirstDealer(), askSecondDealer(), askThirdDealer()]).then(
  (prices) => {
    console.log(prices);
  }
);
// result will come after 8 seconds as [3000,12000,10000]

//How promise.all rejections
// promise.all rejects when the first promise rejects, it rejects with the reason of the first promise

function askSecondDealer() {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject("Not Suitable Car"), 5000);
  });
}

Promise.all([askFirstDealer(), askSecondDealer(), askThirdDealer()])
  .then((prices) => {
    console.log(prices);
  })
  .catch((error) => {
    console.log(error);
  });
//the promise returned by it will be a rejected with the reason not suitable car

//to avoid that we rewriting the same function with a cage block so the result as follow

Promise.all([
  askFirstDealer().catch((error) => {
    return error;
  }),
  askSecondDealer().catch((error) => {
    return error;
  }),
  askThirdDealer().catch((error) => {
    return error;
  }),
])
  .then((prices) => {
    console.log(prices);
  })
  .catch((error) => {
    console.log(error);
  });

//the result will be [8000, "not suitable card", 10000]
//so the promise is reoslved for correct http and reject for false one

Promise.all([
  askFirstDealer().catch((error) => {
    return error;
  }),
  askSecondDealer().catch((error) => {
    return error;
  }),
  askThirdDealer().catch((error) => {
    return error;
  }),
  Promise.reject("reject for some reason"),
])
  .then((prices) => {
    console.log(prices);
  })
  .catch((error) => {
    console.log(error);
  });

// in this case the promise.all will not wait for other promises, it will directly return the error

// Promise.all vs promise.all settled

function askFirstDealer() {
  return newPromise((resolve, reject) => {
    setTimeout(() => resolve(8000), 3000);
  });
}
function askSecondDealer() {
  return newPromise((resolve, reject) => {
    setTimeout(() => resolve(12000), 5000);
  });
}
function askThirdDealer() {
  return newPromise((resolve, reject) => {
    setTimeout(() => resolve(10000), 8000);
  });
}

Promise.all[(askFirstDealer(), askSecondDealer(), askThirdDealer())]
  .then((prices) => console.log(prices))
  .catch((error) => console.log(error));

//if any one promise rejected result will be reject

Promise.all[
  (askFirstDealer().catch((error) => {
    return error;
  }),
  askSecondDealer().catch((error) => {
    return error;
  }),
  askThirdDealer().catch((error) => {
    return error;
  }))
]
  .then((prices) => console.log(prices))
  .catch((error) => console.log(error));

//doesnt matter if any one succeded or failed, it will show result of all of them

//we can also use promise.allsettled

Promise.allSettled([askFirstDealer(), askSecondDealer(), askThirdDealer()]);
//it will show values as same as promise.all but with promise status fullfillled status

//promise.allsettled
//when you don't care whether one of your promises fails

//promise.all
//when failure of one promise means failure of al the promises

// Executing Promises in parallel. which one is faster?

var askJohn = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve("yep, i got one extra pen"), 3000);
  });
};

var askEugene = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve("sorry man, gt only one"), 5000);
  });
};

var askSusy = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve("sure, i have a pen for you"), 2000);
  });
};

// promise.race will catch the first response it can either be resolve or reject
Promise.race([askJohn(), askEugene(), askSusy()])
  .then((values) => {
    console.log(value);
  })
  .catch((reason) => {
    console.log("Rejected: " + reason);
  });

// Promise.any getting first successfull promise
//  it will given only the first successfull promise, only way it throws reject is when all promises are rejected
Promise.any([askJohn(), askEugene(), askSusy()])
  .then((values) => {
    console.log(value);
  })
  .catch((reason) => {
    console.log("Rejected: " + reason);
  });
