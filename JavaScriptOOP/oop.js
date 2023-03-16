Object-oriented Programming (OOP) in JavaScript
Object-oriented programming (OOP) is a programming paradigm that involves organising code into objects that can interact with each other. JavaScript is a language that supports OOP, and in this article, we’ll explore some of the key concepts of OOP in JavaScript, along with examples to help illustrate these concepts.


Object-oriented Programming in JavaScript
Objects in JavaScript
In JavaScript, an object is a collection of properties, where each property is a key-value pair. The keys are strings that represent the names of the properties, and the values can be of any data type, including other objects.

Here’s an example of an object in JavaScript:

const person = {
  name: 'Brendan Eich',
  age: 60,
  address: {
    street: '123 JavaScript Street',
    city: 'Web',
    state: 'Programming',
    zip: '12345'
  }
};
In this example, the person object has three properties: name, age, and address. The address property is itself an object, with four properties of its own.

We can access the properties of an object using either dot notation or bracket notation:

console.log(person.name); // Output: 'Brendan Eich'
console.log(person['age']); // Output: 60
console.log(person.address.city); // Output: 'Web'
Classes in JavaScript
In OOP, a class is a blueprint for creating objects. It defines the properties and methods that objects of that class will have. In JavaScript, we can define a class using the class keyword.

Here’s an example of a Person class:

class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
  }
}
In this example, we define a Person class with a constructor that takes two arguments: name and age. The constructor initialises two properties of the object: name and age. We also define a greet method that logs a greeting to the console, using the name and age properties.

To create an object of the Person class, we use the new keyword:

const person = new Person('Brendan Eich', 60);
person.greet(); // Output: 'Hello, my name is Brendan Eich and I am 60 years old.'
Inheritance in JavaScript
Inheritance is the process of creating a new class based on an existing class. The new class, known as the subclass, inherits the properties and methods of the existing class, known as the superclass.

In JavaScript, we can implement inheritance using the extends keyword. Here's an example:

class Student extends Person {
  constructor(name, age, grade) {
    super(name, age);
    this.grade = grade;
  }

  study() {
    console.log(`${this.name} is a ${this.grade} in JavaScript.`);
  }
}
In this example, we define a Student class that extends the Person class. The Student class has a constructor that takes three arguments: name, age, and grade. The constructor calls the super method, which calls the constructor of the Person class and initialises the name and age properties. The Student class also has a study method that logs a message to the console.

To create an object of the Student class, we use the new keyword:

const student = new Student('Sumit', 38, 'beginner');
student.greet(); // Output: 'Hello, my name is Sumit and I am 38 years old.'
student.study(); // Output: 'Sumit is a beginner in JavaScript.'
We can see that the `Student` class has inherited the `greet` method from the `Person` class, and it has its own `study` method.

Encapsulation in JavaScript
Encapsulation is the practice of hiding the internal details of an object and providing a public interface for interacting with it. This helps to prevent outside code from directly modifying the internal state of an object, which can lead to bugs and other issues. In JavaScript, we can use closures to achieve encapsulation. Here’s an example:

function createCounter() {
  let count = 0;

  return {
    increment() {
      count++;
    },

    decrement() {
      count--;
    },

    getCount() {
      return count;
    }
  };
}

const counter = createCounter();
console.log(counter.getCount()); // Output: 0
counter.increment();
console.log(counter.getCount()); // Output: 1
counter.decrement();
console.log(counter.getCount()); // Output: 0
In this example, we define a createCounter function that returns an object with three methods: increment, decrement, and getCount. The count variable is declared inside the createCounter function and is not accessible from outside the object. The increment and decrement methods modify the count variable, while the getCount method returns its current value.

Polymorphism in JavaScript
Polymorphism is the ability of objects of different classes to be treated as if they were objects of the same class. In JavaScript, we can achieve polymorphism using interfaces.

Here’s an example:

class Shape {
  draw() {
    console.log('Drawing shape...');
  }
}

class Circle extends Shape {
  draw() {
    console.log('Drawing circle...');
  }
}

class Square extends Shape {
  draw() {
    console.log('Drawing square...');
  }
}

function drawShapes(shapes) {
  shapes.forEach(shape => {
    shape.draw();
  });
}

const shapes = [
  new Circle(),
  new Square(),
  new Circle(),
  new Square()
];

drawShapes(shapes);
In this example, we define a Shape class with a draw method. We also define Circle and Square classes that extend the Shape class and override the draw method with their own implementations.

We then define a drawShapes function that takes an array of Shape objects and calls their draw methods. We create an array of Circle and Square objects and pass it to the drawShapes function. We can see that even though the objects are of different classes, they can be treated as if they were objects of the same Shape class.

Example that matters
Here’s an example that demonstrates objects, classes, inheritance, and polymorphism in JavaScript:

// define a base class called Animal
class Animal {
  constructor(name) {
    this.name = name;
  }

  eat() {
    console.log(`${this.name} is eating.`);
  }

  sleep() {
    console.log(`${this.name} is sleeping.`);
  }
}

// define a subclass called Cat that inherits from Animal
class Cat extends Animal {
  constructor(name) {
    super(name);
  }

  meow() {
    console.log(`${this.name} says meow.`);
  }

  // override the sleep method of Animal
  sleep() {
    console.log(`${this.name} is taking a cat nap.`);
  }
}

// define another subclass called Dog that also inherits from Animal
class Dog extends Animal {
  constructor(name) {
    super(name);
  }

  bark() {
    console.log(`${this.name} says woof.`);
  }

  // override the eat method of Animal
  eat() {
    console.log(`${this.name} is eating from a bowl.`);
  }
}

// create an array of animals
let animals = [
  new Cat("Mumu"),
  new Dog("Laltu"),
  new Cat("Miaow"),
  new Dog("Boltu")
];

// loop through the array and call methods on each animal
for (let animal of animals) {
  animal.eat();
  animal.sleep();

  // check if the animal is a cat and call the meow method if it is
  if (animal instanceof Cat) {
    animal.meow();
  }

  // check if the animal is a dog and call the bark method if it is
  if (animal instanceof Dog) {
    animal.bark();
  }
}
In this example, we define a base class called Animal with a constructor method that takes a name parameter and sets it as an instance variable. The Animal class also has two methods: eat and sleep.

We then define two subclasses: Cat and Dog. Both of these classes inherit from Animal using the extends keyword. They also have their own constructor methods that call super to call the constructor of the parent class and set the name instance variable.

The Cat class has a meow method that prints a message to the console, and it also overrides the sleep method of the parent class. The Dog class has a bark method that prints a message to the console, and it also overrides the eat method of the parent class.

We then create an array of Animal objects, including both Cat and Dog objects. We loop through the array and call the eat and sleep methods on each object. We also use the instanceof operator to check if each object is an instance of Cat or Dog and call the appropriate methods (meow for Cat objects and bark for Dog objects).

This demonstrates how we can use objects, classes, inheritance, and polymorphism in JavaScript to create reusable and extensible code.

Conclusion
In this article, we’ve explored some of the key concepts of OOP in JavaScript, including objects, classes, inheritance, encapsulation, and polymorphism. By understanding these concepts and how to use them, we can write more maintainable and reusable code in our JavaScript applications.
