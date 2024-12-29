class Car{
    #brand;
    #model;
    #speed;
    isTrunkOpen;
    topSpeed; 

    constructor(brand, model){
        this.#brand = brand;
        this.#model = model;
        this.#speed = 0;
        this.isTrunkOpen = false;
        this.topSpeed = 200;
    };
    
    displayInfo(){
        console.log(`${this.#brand} ${this.#model} speed:${this.speed} km/h   Trunk open: ${this.isTrunkOpen}`);
    };
    go(){
        if (this.speed >= 0 && this.#speed <= this.topSpeed && !this.isTrunkOpen){
            this.#speed += 5;
        };
    };
    break() {
        if (this.#speed > 0 && this.#speed <= this.topSpeed){
            this.#speed -= 5;
        };
    };
    openTrunk(){
        if (this.#speed === 0){
            this.isTrunkOpen = true;
        } else {
            console.log('cannot open trunk, car is moving');
        }
    };
    closeTrunk() {
        this.isTrunkOpen = false;
    }
};

class RacingCar extends Car{
    acceleration;

    constructor(brand, model, acceleration) {
        super(brand, model);
        this.acceleration = acceleration;    
        this.topSpeed = 300;
    };
    openTrunk(){
        console.log('Racing car cannot open truck. It do not have.')
    };
    closeTrunk() {
        console.log('Racing car cannot close truck. it do not have.');
    };
    go(){
        if (this.speed >= 0 && this.speed <= this.topSpeed && !this.isTrunkOpen){
            this.speed += this.acceleration;
        };
    };
}

const car = new Car('Tesla', 'model 3');
const car2 =  new Car('Toyota', 'Corrola');

console.log(car);
console.log(car2);
car.displayInfo();
car2.displayInfo();

car.go();
car.go();
car.go();
car2.go();
car2.go();
car2.go();


car.break();
car.break();
car2.break();
console.log('\n');
car.displayInfo();
car2.displayInfo();


car.openTrunk();
car.break();
car.openTrunk();
car.displayInfo();

console.log('\n')

car2.displayInfo();
car2.break();
car2.break();
car2.displayInfo();
car2.openTrunk();
car2.displayInfo();

console.log('\n\n\n\n\n');

const raceCar = new RacingCar('McLaren', 'F1', 20);
raceCar.displayInfo();
raceCar.go();
raceCar.go();
raceCar.openTrunk();
raceCar.displayInfo();
console.log(raceCar);


