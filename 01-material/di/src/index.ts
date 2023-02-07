import 'reflect-metadata'

type Constructor<T = any> = new (...args: any[]) => T;

function Injectable() {
    return (target) => {
        // console.log('注入:', target)
    }
}

@Injectable()
class Wheel {
    public size = 19;
}

@Injectable()
class Car {
    constructor(public wheel: Wheel) { }

    run() {
        console.log(this.wheel.size);
    }
}

class Injector extends Map {
    resolve<T>(target: Constructor<T>) {
        const deps = Reflect.getMetadata('design:paramtypes', target) || [];

        const depsInstance = deps.map((ctor: Constructor<unknown>) => {
            return this.resolve(ctor);
        })

        const classInstance = this.get(target);
        if (classInstance) {
            return classInstance;
        }

        const newClassInstance = new target(...depsInstance);

        this.set(target, newClassInstance)

        return newClassInstance;
    }
}


function bootstrap<T>(target: Constructor<T>): T {
    const container = new Injector();
    return container.resolve(target);
}

const car = bootstrap<Car>(Car)
car.run()

