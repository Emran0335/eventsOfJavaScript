// Inheritance and The Prototype Chain
/*
JavaScript is a bit confusing for developers experienced in class-based languages (like Java or C++), as it is dynamic and does not have static types.

When it comes to inheritance, JavaScript only has one construct: objects. Each object has a private property which holds a link to another object called its prototype. That prototype object has a prototype of its own, and so on until an object is reached with null as its prototype. By definition, null has no prototype, and acts as the final link in this prototype chain. It is possible to mutate any member of the prototype chain or even swap out the prototype at runtime, so concepts like static dispatching do not exist in JavaScript.

While this confusion is often considered to be one of JavaScript's weaknesses, the prototypical inheritance model itself is, in fact, more powerful than the classic model. It is, for example, fairly trivial to build a classic model on top of a prototypical model — which is how classes are implemented.

Although classes are now widely adopted and have become a new paradigm in JavaScript, classes do not bring a new inheritance pattern. While classes abstract most of the prototypical mechanism away, understanding how prototypes work under the hood is still useful.

Inheritance with the prototype chain
Inheriting properties
JavaScript objects are dynamic "bags" of properties (referred to as own properties). JavaScript objects have a link to a prototype object. When trying to access a property of an object, the property will not only be sought on the object but on the prototype of the object, the prototype of the prototype, and so on until either a property with a matching name is found or the end of the prototype chain is reached.

Note: Following the ECMAScript standard, the notation someObject.[[Prototype]] is used to designate the prototype of someObject. The [[Prototype]] internal slot can be accessed with the Object.getPrototypeOf() and Object.setPrototypeOf() functions. This is equivalent to the JavaScript accessor __proto__ which is non-standard but de-facto implemented by many JavaScript engines. To prevent confusion while keeping it succinct, in our notation we will avoid using obj.__proto__ but use obj.[[Prototype]] instead. This corresponds to Object.getPrototypeOf(obj).

It should not be confused with the func.prototype property of functions, which instead specifies the [[Prototype]] to be assigned to all instances of objects created by the given function when used as a constructor. We will discuss the prototype property of constructor functions in a later section.

There are several ways to specify the [[Prototype]] of an object, which are listed in a later section. For now, we will use the __proto__ syntax for illustration. It's worth noting that the { __proto__: ... } syntax is different from the obj.__proto__ accessor: the former is standard and not deprecated.

In an object literal like { a: 1, b: 2, __proto__: c }, the value c (which has to be either null or another object) will become the [[Prototype]] of the object represented by the literal, while the other keys like a and b will become the own properties of the object. This syntax reads very naturally, since [[Prototype]] is just an "internal property" of the object.

Here is what happens when trying to access a property:


const o = {
  a: 1,
  b: 2,
  // __proto__sets the [[Prototype]]. It's specified here
  // as another object literal.
  __proto__: {
    b: 3,
    c: 4,
  },
};
// o.[[Prototype]] has properties b and c.
// o.[[Prototype]].[[Prototype]] is Object.prototype (we will explain what that means later).
// Finally, o.[[Prototype]].[[Prototype]].[[Prototype]] is null.
// This is the end of the prototype chain, as null. By definition, has no [[Prototype]].
// Thus the full prototype chain looks like
// {a:1, b:2}--> {b:3, c:4}--> Object.prototype-->null.
console.log(o.a)
// Is there an 'a' own property on o? Yes, and its value is 1.

console.log(o.b); // 2
// Is there a 'b' own property on o? Yes, and its value is 2.
// The prototype also has a 'b' property, but it's not visited.
// This is called Property Shadowing

console.log(o.c); // 4
// Is there a 'c' own property on o? No, check its prototype.
// Is there a 'c' own property on o.[[Prototype]]? Yes, its value is 4.

console.log(o.d); // undefined
// Is there a 'd' own property on o? No, check its prototype.
// Is there a 'd' own property on o.[[Prototype]]? No, check its prototype.
// o.[[Prototype]].[[Prototype]] is Object.prototype and
// there is no 'd' property by default, check its prototype.
// o.[[Prototype]].[[Prototype]].[[Prototype]] is null, stop searching,
// no property found, return undefined.

Setting a property to an object creates an own property. The only exception to the getting and setting behavior rules is when it's intercepted by a getter or setter.

Similarly, you can create longer prototype chains, and a property will be sought on all of them.

const o = {
  a: 1,
  b: 2,
  // __proto__ sets the [[Prototype]]. It's specified here
  // as another object literal.
  __proto__: {
    b: 3,
    c: 4,
    __proto__: {
      d: 5,
    },
  },
};

// { a: 1, b: 2 } ---> { b: 3, c: 4 } ---> { d: 5 } ---> Object.prototype ---> null

console.log(o.d); // 5
*/


/*
Inheriting "methods"
JavaScript does not have "methods" in the form that class-based languages define them. In JavaScript, any function can be added to an object in the form of a property. An inherited function acts just as any other property, including property shadowing as shown above (in this case, a form of method overriding).

When an inherited function is executed, the value of this points to the inheriting object, not to the prototype object where the function is an own property.


const parent = {
  value: 2,
  method() {
    return this.value + 1;
  },
};

console.log(parent.method());       // 3
// when calling parent.method in this case, 'this' refers to parent

// child is an object that inherits from parent
const child = {
    __proto__:parent
}
console.log(child.method());        // 3
// when child.method is called, 'this' refers to child. So, when child inherits the method of parent. The property 'value' is sought on child. However, since child doesn't have an own property called 'value', the property is found on the [[Prototype]], which is parent.value

child.value = 4;        // assign the value 4 to the property 'value' on child.
// This shadows the 'value' property on parent.
// The child object now looks like:  { value: 4, __proto__: { value: 2, method: [Function] } }
console.log(child.method())         // 5
// Since child now has the 'value' property, 'this.value' means the child.value instead
*/

/*
Constructors
The power of prototypes is that we can reuse a set of properties if they should be present on every instance — especially for methods. Suppose we are to create a series of boxes, where each box is an object that contains a value which can be accessed through a getValue function. A naive implementation would be:

const boxes = [
  {
    value: 1,
    getValue() {
      return this.value;
    },
  },
  {
    value: 2,
    getValue() {
      return this.value;
    },
  },
  {
    value: 3,
    getValue() {
      return this.value;
    },
  },
];

 This is subpar, because each instance has its own function property that does the same thing, which is redundant and unnecessary. Instead, we can move getValue to the [[Prototype]] of all boxes:

const boxPrototype = {
  getValue() {
    return this.value;
  },
};

const boxes = [
  { value: 1, __proto__: boxPrototype },
  { value: 2, __proto__: boxPrototype },
  { value: 3, __proto__: boxPrototype },
];
 This way, all boxes' getValue method will refer to the same function, lowering memory usage. However, manually binding the __proto__ for every object creation is still very inconvenient. This is when we would use a constructor function, which automatically sets the [[Prototype]] for every object manufactured. Constructors are functions called with new.

 constructor
function Box(value) {
    this.value = value;
}

// Properties all boxes created from the Box() constructor will have
Box.prototype.getValue = function() {
    return this.value
}

const boxes = [new Box(1), new Box(2), new Box(3)];


We say that new Box(1) is an instance created from the Box constructor function. Box.prototype is not much different from the boxPrototype object we created previously — it's just a plain object. Every instance created from a constructor function will automatically have the constructor's prototype property as its [[Prototype]] — that is, Object.getPrototypeOf(new Box()) === Box.prototype. Constructor.prototype by default has one own property: constructor, which references the constructor function itself — that is, Box.prototype.constructor === Box. This allows one to access the original constructor from any instance.

Note: If a non-primitive is returned from the constructor function, that value will become the result of the new expression. In this case the [[Prototype]] may not be correctly bound — but this should not happen much in practice.

The above constructor function can be rewritten in classes as:
class Box {
  constructor(value) {
    this.value = value;
  }

  // Methods are created on Box.prototype
  getValue() {
    return this.value;
  }
}

Classes are syntax sugar over constructor functions, which means you can still manipulate Box.prototype to change the behavior of all instances. However, because classes are designed to be an abstraction over the underlying prototype mechanism, we will use the more-lightweight constructor function syntax for this tutorial to fully demonstrate how prototypes work.

Because Box.prototype references the same object as the [[Prototype]] of all instances, we can change the behavior of all instances by mutating Box.prototype.

function Box(value) {
  this.value = value;
}
Box.prototype.getValue = function () {
  return this.value;
};
const box = new Box(1);

// Mutate Box.prototype after an instance has already been created
Box.prototype.getValue = function () {
  return this.value + 1;
};
box.getValue(); // 2

A corollary is, re-assigning Constructor.prototype (Constructor.prototype = ...) is a bad idea for two reasons:

1. The [[Prototype]] of instances created before the reassignment is now referencing a different object from the [[Prototype]] of instances created after the reassignment — mutating one's [[Prototype]] no longer mutates the other.
2. Unless you manually re-set the constructor property, the constructor function can no longer be traced from instance.constructor, which may break user expectation. Some built-in operations will read the constructor property as well, and if it is not set, they may not work as expected.

Constructor.prototype is only useful when constructing instances. It has nothing to do with Constructor.[[Prototype]], which is the constructor function's own prototype, which is Function.prototype — that is, Object.getPrototypeOf(Constructor) === Function.prototype.

*/



/*
Implicit constructors of literals
Some literal syntaxes in JavaScript create instances that implicitly set the [[Prototype]]. For example:

// Object literals (without the `__proto__` key) automatically
// have `Object.prototype` as their `[[Prototype]]`
const object = { a: 1 };
Object.getPrototypeOf(object) === Object.prototype; // true

// Array literals automatically have `Array.prototype` as their `[[Prototype]]`
const array = [1, 2, 3];
Object.getPrototypeOf(array) === Array.prototype; // true

// RegExp literals automatically have `RegExp.prototype` as their `[[Prototype]]`
const regexp = /abc/;
Object.getPrototypeOf(regexp) === RegExp.prototype; // true
Copy to Clipboard
We can "de-sugar" them into their constructor form.




// ** The most used Concept of JavaScript **//
/*
Functional programming is a paradigm that has gained popularity in recent years due to its ability to write more modular, reusable, and maintainable code. JavaScript, being a versatile programming language, is also well-suited for functional programming. In this article, we will explore essential concepts in functional programming with JavaScript and how they can help you write better code:

Functions as First-Class Citizens
Higher-Order Functions
Pure Functions
Immutability
Recursion
✓ Functions as First-Class Citizens
In functional programming, functions are treated as first-class citizens, which means that they can be assigned to variables, passed as arguments to other functions, and returned as values. This concept is crucial in functional programming, as it allows us to write more modular and reusable code.

Here are some examples of how functions are treated as first-class citizens in JavaScript:

Assigning Functions to Variables:
In JavaScript, you can assign a function to a variable just like you would assign any other value. For example:

const add = function(x, y) {
  return x + y;
}
Here, we are assigning a function that adds two numbers to the variable add. We can then call this function by invoking the variable add.

2. Passing Functions as Arguments:

Functions can also be passed as arguments to other functions. This allows for a more modular approach to programming, as it allows us to reuse the same function with different input and output. For example:

function greet(name, callback) {
  const message = "Hello, " + name + "!";
  callback(message);
}

function logMessage(message) {
  console.log(message);
}

greet("Sumit", logMessage); // Logs "Hello, Sumit!"
Here, we are defining a function greet that takes a name and a callback function as arguments. The callback function is then called with the message "Hello, Sumit!" as its argument. We are passing the logMessage function as the callback, which logs the message to the console.

3. Returning Functions as Values:

Functions can also be returned as values from other functions. This allows for more advanced techniques like closures and currying. For example:

function add(x) {
  return function(y) {
    return x + y;
  };
}

const addFive = add(5);
console.log(addFive(3)); // Logs 8
Here, we are defining a function add that takes a number x and returns another function that takes a number y and adds it to x. We then assign the result of calling add(5) to the variable addFive, which is a function that adds 5 to its argument. Finally, we call addFive(3) which logs the result of adding 5 and 3, which is 8.

✓ Higher-Order Functions
Higher-order functions are functions that take other functions as arguments or return functions as values. They allow us to write more abstract and general-purpose code that can be applied to different use cases. Some common higher-order functions in JavaScript are map(), filter(), and reduce().

Here are some examples of higher-order functions in JavaScript:

Array.prototype.map():
The map() method is a higher-order function that takes a callback function as an argument and returns a new array with the results of applying the callback to each element of the original array. For example:

const numbers = [1, 2, 3, 4];
const doubled = numbers.map(function(num) {
  return num * 2;
});
console.log(doubled); // Logs [2, 4, 6, 8]
Here, we are using map() to create a new array doubled that contains each element of numbers multiplied by 2.

2. Array.prototype.filter():

The filter() method is another higher-order function that takes a callback function as an argument and returns a new array with only the elements that pass the test specified in the callback. For example:

const numbers = [1, 2, 3, 4];
const even = numbers.filter(function(num) {
  return num % 2 === 0;
});
console.log(even); // Logs [2, 4]
Here, we are using filter() to create a new array even that contains only the even numbers from numbers.

3. Function.prototype.bind():

The bind() method is a higher-order function that returns a new function with a specific this value and initial arguments. It is often used to create a new function with a specific context or to create a partially applied function. For example:

const person = {
  firstName: "Sumit",
  lastName: "Saha",
  fullName: function() {
    return this.firstName + " " + this.lastName;
  }
};

const logName = function(greeting) {
  console.log(greeting + " " + this.fullName());
};

const boundLogName = logName.bind(person, "Hello");
boundLogName(); // Logs "Hello Sumit Saha"
Here, we are using bind() to create a new function boundLogName that has the context of the person object and an initial argument of "Hello". When we call boundLogName(), it logs "Hello Sumit Saha" to the console.

These are just a few examples of the many higher-order functions available in JavaScript. By using higher-order functions, you can write more generic and reusable code that can be applied to different use cases.

✓ Pure Functions
Pure functions are functions that do not have side effects, meaning they do not modify any external state or variables outside of their scope. They always return the same output for the same input, making them deterministic. Pure functions are essential in functional programming, as they promote code predictability, testability, and maintainability.

Here are some examples of pure functions in JavaScript:

Addition function:
function add(a, b) {
  return a + b;
}
This function takes two arguments and returns their sum. It is a pure function because it does not modify any external state and always returns the same result for the same input.

2. Array concatenation function:

function concatenateArrays(arr1, arr2) {
  return arr1.concat(arr2);
}
This function takes two arrays and returns a new array that contains the elements of both arrays. It is a pure function because it does not modify any external state and always returns the same result for the same input.

3. Date formatting function:

function formatDate(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}-${month}-${day}`;
}
This function takes a date object and returns a string in the format “YYYY-MM-DD”. It is a pure function because it does not modify any external state and always returns the same result for the same input.

4. String capitalisation function:

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
This function takes a string and returns a new string with the first letter capitalised. It is a pure function because it does not modify any external state and always returns the same result for the same input.

In general, pure functions are functions that do not have any side effects and always return the same result for the same input. They are predictable and easier to reason about, making them ideal for writing maintainable and reusable code.

✓ Immutability
Immutability is a concept that involves avoiding modifying data structures or variables once they are created. Instead of changing an object or array, we create a new one with the desired changes. This approach prevents unintended side effects and makes code more predictable and easier to reason about.

Here are some examples of immutability in JavaScript:

Using the spread operator to create a new array or object:
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4];
// arr1 is still [1, 2, 3], arr2 is [1, 2, 3, 4]

const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1, c: 3 };
// obj1 is still { a: 1, b: 2 }, obj2 is { a: 1, b: 2, c: 3 }
In these examples, we are using the spread operator (...) to create a new array or object that contains the elements or properties of the original array or object. This creates a new copy of the data, rather than modifying the original data.

2. Using the concat() method to create a new array:

const arr1 = [1, 2, 3];
const arr2 = arr1.concat(4);
// arr1 is still [1, 2, 3], arr2 is [1, 2, 3, 4]
Here, we are using the concat() method to create a new array that contains the elements of the original array and the new element. This creates a new copy of the data, rather than modifying the original data.

3. Using Object.assign() to create a new object:

const obj1 = { a: 1, b: 2 };
const obj2 = Object.assign({}, obj1, { c: 3 });
// obj1 is still { a: 1, b: 2 }, obj2 is { a: 1, b: 2, c: 3 }
In this example, we are using Object.assign() to create a new object that contains the properties of the original object and the new property. This creates a new copy of the data, rather than modifying the original data.

4. Using Object.freeze() to prevent modification of an object:

const obj1 = Object.freeze({ a: 1, b: 2 });
obj1.c = 3;
// obj1 is still { a: 1, b: 2 }, the assignment is ignored
Here, we are using Object.freeze() to prevent modification of the obj1 object. Any attempt to modify the object will be ignored, preserving the immutability of the object.

In general, immutability means that the data is not changed directly, but rather new copies are created when changes are made. This can help prevent unintended side effects and make the code more predictable and maintainable.

✓ Recursion
Recursion is a technique where a function calls itself to solve a problem. It is a powerful tool in functional programming, as it allows us to solve complex problems by breaking them down into smaller, simpler ones. However, recursion can be tricky to use, as it can lead to stack overflow errors and performance issues if not used properly.

Here are some examples of recursion in JavaScript:

Factorial function:
function factorial(n) {
  if (n === 0) {
    return 1;
  } else {
    return n * factorial(n - 1);
  }
}

factorial(5); // returns 120 (5! = 5 * 4 * 3 * 2 * 1)
In this example, the factorial() function calculates the factorial of a number using recursion. If the input is 0, it returns 1. Otherwise, it multiplies the input by the result of calling factorial() with one less than the input.

2. Sum function:

function sum(arr) {
  if (arr.length === 0) {
    return 0;
  } else {
    return arr[0] + sum(arr.slice(1));
  }
}

sum([1, 2, 3, 4, 5]); // returns 15 (1 + 2 + 3 + 4 + 5)
In this example, the sum() function calculates the sum of an array using recursion. If the array is empty, it returns 0. Otherwise, it adds the first element of the array to the result of calling sum() with the rest of the array.

3. Fibonacci function:

function fibonacci(n) {
  if (n === 0 || n === 1) {
    return n;
  } else {
    return fibonacci(n - 1) + fibonacci(n - 2);
  }
}

fibonacci(6); // returns 8 (0, 1, 1, 2, 3, 5, 8)
In this example, the fibonacci() function calculates the nth number in the Fibonacci sequence using recursion. If the input is 0 or 1, it returns the input. Otherwise, it returns the sum of calling fibonacci() with the previous two numbers in the sequence.

Recursion can be a powerful tool in solving problems that involve repeating patterns or structures. However, it can also lead to performance issues and stack overflow errors if not implemented carefully. It’s important to understand the concept of recursion and use it judiciously in your code.

Conclusion
In conclusion, functional programming is an important paradigm that can help you write more modular, reusable, and maintainable code. By understanding essential concepts like functions as first-class citizens, higher-order functions, pure functions, immutability, and recursion, you can start writing more functional code in JavaScript. Functional programming is not the only way to write good code, but it is a powerful tool that can help you solve complex problems and make your code more predictable and easier to reason about.
*/
