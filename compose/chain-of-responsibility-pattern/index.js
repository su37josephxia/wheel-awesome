class Handle {
    constructor(middleware) {
        this.middleware = middleware;
        this.next = null;
    }

    setNext(nextHandle) {
        this.next = nextHandle;
    }
}

module.exports.compose = (middlewares = []) => {
    if (!Array.isArray(middlewares)) {
        middlewares = Array.from(arguments);
    }

    if (middlewares.some(fn => typeof fn !== 'function')) {
        throw new TypeError('Middleware must be composed of functions!');
    }

    const handles = [];
    for (let i = 0; i < middlewares.length; i++) {
        const handle = new Handle(middlewares[i]);
        handles.push(handle);
    }

    for (let i = 0; i < handles.length; i++) {
        if (handles[i + 1]) {
            handles[i].setNext(handles[i + 1]);
        }
    }

    return function func() {
        return innerFunc(handles[0]);

        function innerFunc(currentHandle = handles[0]) {
            if (!currentHandle) {
                return Promise.resolve();
            }
            return Promise.resolve(currentHandle.middleware(() => innerFunc(currentHandle.next)));
        }
    };
};
