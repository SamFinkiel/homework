function Vehicle(color) {
    this.color = color;
    this.speed = 0;
}

Vehicle.prototype.go = function (speed) {
    this.speed = speed;
    console.log(`the ${this.color} car is going ${speed} mph`);
};

Vehicle.prototype.print = function () {
    console.log(`color is ${this.color}, speed is ${this.speed} mph`);
};

const blueCar = new Vehicle('blue');
blueCar.go(16);
blueCar.print();
console.log(blueCar);

////////////////////////////////////////

function Plane(color) {
    this.color = color;
    this.speed = 0; 
}

Plane.prototype = Object.create(Vehicle.prototype);
Plane.prototype.constructor = Plane;

Plane.prototype.go = function (speed) {
    this.speed = speed;
    console.log(`the ${this.color} plane is FLYING ${speed} mph`);
};

const whitePlane = new Plane('white');

whitePlane.go(160);
whitePlane.print();
console.log(whitePlane);

blueCar.go(16);
