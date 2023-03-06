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

