class Wheel {
    constructor(brand) {
        this.brand = brand
    }
}

class Container {
    constructor() { this.modules = {} }
    provide(key, object) { this.modules[key] = object }
    get(key) { return this.modules[key] }
}

class Car {
    constructor(container) {
        this.wheel = container.get('wheel');
    }
    run() {
        console.log(`汽车用[${this.wheel.brand}]牌轮子跑`);
    }
}

// 装配过程
const container = new Container();
container.provide('wheel', new Wheel('米其林'))
// container.provide('wheel', new Wheel('马牌'))
new Car(container).run();