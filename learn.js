let manufacturers = [
  "Acura",
  "Alfa Romeo",
  "Aston Martin",
  "Audi",
  "Bentley",
  "BMW",
  "Buick",
  "Cadillac",
  "Chevrolet",
  "Chrysler",
  "Citroen",
  "Dodge",
  "Ferrari",
  "Fiat",
  "Ford",
  "GMC",
  "Honda",
  "Hyundai",
  "INfiniti",
  "Jaguar",
  "Jeep",
  "Kia",
  "Lamborghini",
  "Land Rover",
  "Lexus",
  "Lincoln",
  "Maserati",
  "Mazda",
  "McLaren",
  "Mercedes-Benz",
  "MINI",
  "Mitsubishi",
  "Nissan",
  "Porsche",
  "Ram",
  "Rolls-Royce",
  "Subara",
  "Tesla",
  "Toyota",
  "Volkswagan",
  "Volvo",
];
let query = "";

let filteredManufacturers = manufacturers.filter((item) =>
  item
    .toLowerCase()
    .replace(/\s+/g, "")
    .includes(query.toLowerCase().replace(/\s+/g, ""))
);
console.log(filteredManufacturers);

const arrayOne = [1, 2, 3, 4, 5];
const finalResult = arrayOne.reduce((store, each) => Math.max(store, each), -1);
console.log(finalResult);

// Sometimes we literally have to remove a property from an object. The rest(...) operator to the rescue! Destructure the property you don't want, and asign a variable for the rest of the properties we do want!

const exampleObject = {
  text: "Hello World",
  onChange: () => "example",
  age: 35,
};

// destructure it and add everythingElse as a varible of newly form object.
const { onChange, ...everythingElse } = exampleObject;
console.log(everythingElse); // {text: "Hello World, age:35"}
// everythingElse = {text: "Hello World", age: 35}
console.log(exampleObject.onChange()) // example
console.log(onChange()) // example

