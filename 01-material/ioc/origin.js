class Wheel {
    constructor(brand) {
        this.brand = brand
    }
}

class Car {
    constructor() {
        this.wheel = new Wheel('米其林')
    }
    run() {
        console.log(`汽车用[${this.wheel.brand}]牌轮子跑`);
    }
}

new Car().run();