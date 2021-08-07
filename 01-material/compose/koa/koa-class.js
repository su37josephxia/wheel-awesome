class ComposeClass {
    constructor() {
        this.middlewares = [];
        this.index = 0;
    }

    middleware(middlewares) {
        this.middlewares = middlewares;
        return this.dispatch(this.index);
    }

    dispatch(index) {
        const fn = this.middlewares[index];
        if (!fn) {
            return Promise.resolve();
        }
        this.index += 1;
        return Promise.resolve(fn(this.next.bind(this)));
    }

    next() {
        return this.dispatch(this.index);
    }
}

module.exports.compose = (middlewares = []) => {
    if (!Array.isArray(middlewares)) {
        middlewares = Array.from(arguments);
    }

    if (middlewares.some(fn => typeof fn !== 'function')) {
        throw new TypeError('Middleware must be composed of functions!');
    }

    return () => {
        return new ComposeClass().middleware(middlewares);
    };
};
