// object constructor syntax
let user = new Object();
console.log(user); // {}

// object literal syntax
let user1 = {};
console.log(user1); //

// name: "Emran" is called property
// name, age are called key and "Emran" and 30 are called value
let user2 = {
  name: "Emran",
  age: 30,
};
console.log(user2.name); // Emran
console.log(user2.age); // 30

// The value can be of any type. Let's add a boolean one
// to add property
user2.isAdmin = true;
console.log(user2); // {name: "Emran", age: 30, isAdmin: true};

// to remove property
delete user2.age;
console.log(user2.age); // undefined

// We can also use multiword property names as key, but then they must be quoted;
let user3 = {
  name: "Hossain",
  age: 34,
  "likes birds": true,
};

console.log(user3); // {name: "Hossain", age: 34, 'likes birds': true }

// the last property in the list may end with a comma but it is not necessary. It is called 'trailling' or 'hanging' comma. Rememeber, it is easier to add/remove/move around properties, becase all lines become alike.

// multiword properties cannot be accessed using dot notation. So we have to use bracket notation.
//console.log(user3["likes birds"]); // true

// Square brackets also provide a way to obtain property name or key as the result of any expression-as opposed to literal string-like from a variable as follows.
let key = "likes birds";
// same as user3["likes birds"]
console.log(user3[key]); // true
// but the dot notation does not in this similar way.
let keydot = "name";
console.log(user2.keydot); // undefined

// computed properties
// we can use square brackets in an object literal, when creating an object. That is called computed properties. But it should be provided with variable from previously declared.
let fruit = "apple";
let bag = {
  [fruit]: 5, // the name of the property is taken from the fruit variable
  name: "Nusaiba", // "name": "Nusaiba" is also correct
};
console.log(bag); // {apple: 5, name: 'Nusaiba'}
console.log(bag.apple); // 5
console.log(bag.name); // Nusaiba

let vegi = "Carrot";
let bag1 = {
  [vegi]: 5,
};
console.log(vegi); // Carrot

// We can use more complex expressions inside square brackets
let fruit3 = "apple";
let bag3 = {
  [fruit3 + "Computers"]: 5,
};
console.log(bag3.appleComputers); // 5
console.log(bag3); // {appleComputers: 5}
// Square barckets are much more powerful than dot notation. They allow any property names and variables. But they are also more cumbersome to write.

// So most of the time, when property names are known and simple, the dot is used. And if we need something more complex, then we switch to square brackets.

// function parameters are variables and function arguments are value of those variables.
// In real code, we often use existing varialbes(function parameters) as values for property names.
function makeUser(name, age) {
  // name and age are variables(parameters)
  return {
    name: name,
    age: age,
  };
}
// "Emran" and 34 are values(arguments) of the variables(parameters)
console.log(makeUser("Emran", 34)); // {name: "Emran", age: 34}

// shorthand way. We can use both normal properties and shorthands in the same object
function makeUser1(name, age) {
  return {
    name,
    age: age, // only age
  };
}
console.log(makeUser1("Hossain", 35)); // {name: "Emran", age: 35}

// As we already know, a variable cannot have a equal to one of the language-reserved words like "for", "let", "return", etc. But for an object property, there is not such restriction.
let objectWithKeywrods = {
  for: 1,
  let: 2,
  const: 3,
  return: 4,
};
console.log(objectWithKeywrods); // {for:1, let:2, const:3, return: 4}
console.log(
  objectWithKeywrods.for +
    objectWithKeywrods.let +
    objectWithKeywrods.const +
    objectWithKeywrods.return
); // 10
// In short, there are no limitaitons on property names. They can be any strings or symbols(a special type for identifiers).
// Other types are automatically converted to strings such as property name 0 will be converted into "0".
let objAnother = {
  0: "test", // same as "0":"test"
};
console.log(objAnother); // {0: 'test'}
console.log(typeof objAnother[0]); // string

// Reading a non-existing property just returns undefined. So we can easily test whether the property exists:
let objectWithoutProperty = {};
console.log(objectWithoutProperty.noSuchProperty === undefined); // true

// There is a special operator in JavaScript to check property keys in objects.
// "key" in object
let userObjPropertyCheck = {
  name: "Nusaiba",
  age: 2,
};
console.log("age" in userObjPropertyCheck); // true
console.log("name" in userObjPropertyCheck); // true
console.log("blabla" in userObjPropertyCheck); // false

// Please note that on the left side of in operator, there must be a property name. That is usually a quoted string. If we omit quotes, that means a variable should contain the actual name to be tested.
let userWithKeyVariable = { age: 35 };
let keyAge = "age";
console.log(keyAge in userWithKeyVariable); // true

// The "for ... in" loop
// To walk over all keys of an object, there exists a special form of the loop: for ..in. This is a completely different thing from the for(;;) construct that we studied before.
let forKeyInObject = {
  name: "Farjana",
  age: 23,
  isAdmin: false,
};

for (let key in forKeyInObject) {
  console.log(key); // name, age, isAdmin
  console.log(forKeyInObject[key]); // Farjana, 23, false
}
/*
Note that all "for" constructs allow us to declare the looping variable inside the loop, like (let key) here.
Also, we could use another variable name here instead of key. For instance "for (let prop in obj)" is also widely used.
*/

// Ordered like an object
/*
Are objects oredered? In other words, if we loop over an object, do we get all properties in the same order they were added? Can we rely on this?
Answer: The short answer is: "ordered in a special fashion": integer properties are sorted, others appear in creation order. The details follow.
*/
let numberCodesObj = {
  "49": "Germany",
  "41": "Switzerland",
  "44": "Great Britain",
  // ...
  "1": "USA",
};
for (let code in numberCodesObj) {
  console.log(code); // 1, 41, 44, 49
}
/*
The object may be used to suggest a list of options to the user. If we are making a site maily for a German audience then we probably want 49 to be the first.

But if we run the code, we see a totally different picture.
1. USA(1) goes first
2. Then Switzerland(41)

The phone codes go in the ascending sorted order, bacause they are integers. So we see 1, 41, 44, 49
*/

/*
Integer properties? What is that?
The "integer property" term here means a string that can be converted to and from an integer without a change.
So, "49" is an integer property name, because when it's transformed to an integer number and back, it's still the same. But "+49" and "1.2" are not.
Let's see
*/
console.log(String(Math.trunc(Number("49")))); // 49, 49=>49 is same
console.log(String(Math.trunc(Number("+49")))); // 49, +49=> 49 is not same
console.log(String(Math.trunc(Number("1.2")))); // 1, 1.2=> 1 is not same

/*
 On the other hand, if the keys are non-integer, then they are listed in the creation order, for instance.
*/
let objectPropertiesCreationOrder = {
  name: "Emran",
  surname: "Hossain",
};
objectPropertiesCreationOrder.age = 35; // add one more
for (let prop in objectPropertiesCreationOrder) {
  console.log(prop); // name, surname, age
}

/*
So, to fix the issues with the phone codes, we can "cheat" by making the codes non-integer by adding a plus "+" sign before each code is enough.
*/
let phoneCodesWithFor = {
  "+49": "Germany",
  "+41": "Switzerland",
  "+44": "Great Britain",
  // ...
  "+1": "USA",
};
for (let code in phoneCodesWithFor) {
    console.log(code); // +49, +41, +44, +1
}

/*
Write the function isEmpty(obj) which returns true if the object has no properties false otherwise
*/
let schedule = {};
function isEmpty(obj) {
   for(let prop in obj) {
    return false;
   }
   return true
}
console.log(isEmpty(schedule)); // true, as it is empty
schedule["8.30"] = "get up";
console.log(isEmpty(schedule)) // false, as it isnot empty

let salaries = {
    Emran: 100,
    Farjana: 200,
    Nusaiba: 300,
}
let totalSalaries = 0;
for (let prop in salaries) {
    totalSalaries += salaries[prop]
}
console.log(totalSalaries) // 600

let menu = {
    width: 200,
    height: 300,
    title: "My menu"
}
function mytiplyNumericWithReturnObj(obj) {
    for(let key in obj) {
        if (typeof obj[key] == "number") {
            obj[key] *= 2
        }
    }
    return obj
}
function mytiplyNumeric(obj) {
    for(let key in obj) {
        if (typeof obj[key] == "number") {
            obj[key] *= 2
        }
    }
}
mytiplyNumeric(menu)
console.log(menu) // {width: 400, height: 600, title: "My menu"}
console.log(mytiplyNumericWithReturnObj(menu)) // {width: 800, height: 1200, title: "My menu"}