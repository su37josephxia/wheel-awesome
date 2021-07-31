require("../index");

const obj = {
    a: 1
};

function f() {
    return this;
}

function g() {
    return [...arguments];
}

describe("myCall 测试", () => {
    it("myCall 的第一个参数为 null 时， this 应为 window", () => {
        expect(f.myCall(null)).toBe(window);
    });

    it("myCall 的第一个参数为 undefined 时， this 应为 window", () => {
        expect(f.myCall(undefined)).toBe(window);
    });

    it("myCall 的第一个参数为 空 时， this 应为 window", () => {
        expect(f.myCall()).toBe(window);
    });

    it("myCall 的第一个参数为 obj 时， this 应为 obj", () => {
        expect(f.myCall(obj)).toBe(obj);
    });

    it("myCall 的 this 参数后面的参数为 1,2,3 时，g 函数返回应值为 [1,2,3] ", () => {
        expect(g.myCall(null, 1, 2, 3)).toEqual([1,2,3]);
    });
});

describe("myApply 测试", () => {
    it("myApply 的第一个参数为 null 时， this 应为 window", () => {
        expect(f.myApply(null)).toBe(window);
    });

    it("myApply 的第一个参数为 undefined 时， this 应为 window", () => {
        expect(f.myApply(undefined)).toBe(window);
    });

    it("myApply 的第一个参数为 空 时， this 应为 window", () => {
        expect(f.myApply()).toBe(window);
    });

    it("myApply 的第一个参数为 obj 时， this 应为 obj", () => {
        expect(f.myApply(obj)).toBe(obj);
    });

    it("myApply 的 this 参数后面的参数为 [1,2,3] 时，g 函数返回应值为 [1,2,3] ", () => {
        expect(g.myApply(null, [1,2,3])).toEqual([1,2,3]);
    });
});

describe("myBind 测试", () => {
    it("bind 的第一个参数为 null 时，this 应为 window", () => {
        const f1 = f.myBind(null);
        expect(f1()).toBe(window);
    });

    it("myBind 的第一个参数为 undefined 时，this 应为 window", () => {
        const f1 = f.myBind(undefined);
        expect(f1()).toBe(window);
    });

    it("myBind 的第一个参数为 空 时，this 应为 window", () => {
        const f1 = f.myBind();
        expect(f1()).toBe(window);
    });

    it("myBind 的第一个参数为 obj 时，直接执行新函数，this 应为 obj", () => {
        const f1 = f.myBind(obj);
        expect(f1()).toEqual(obj);
    });

    it("myBind 的第一个参数为 obj 时，new 新函数， this 应为 实例", () => {
        const f1 = f.myBind(obj);
        const instance1 = new f1();
        expect(instance1).not.toEqual(obj);
        expect(new f1()).toEqual(instance1);
    });

    it("myBind this 后面的参数为 1,2,3 时，直接执行新函数，返回值为 [1,2,3]", () => {
        const g1 = g.myBind(obj, 1, 2, 3);
        expect(g1()).toEqual([1,2,3]);
    });

    it("myBind this 后面的参数为 1,2,3 时，新函数的参数为 4, 5 时，返回值为 [1,2,3,4,5]", () => {
        const g1 = g.myBind(obj, 1, 2, 3);
        expect(g1(4,5)).toEqual([1,2,3,4,5]);
    });

    it("mybind this 后面的参数为 1,2,3 时，new 新函数，返回值为 [1,2,3]", () => {
        const g1 = g.myBind(obj, 1, 2, 3);
        const instance1 = new g1();
        expect(instance1).toEqual([1,2,3]);
    });

    it("mybind this 后面的参数为 1,2,3 时，new 新函数时的参数为 4, 5 时，返回值为 [1,2,3,4,5]", () => {
        const g1 = g.myBind(obj, 1, 2, 3);
        const instance1 = new g1(4,5);
        expect(instance1).toEqual([1,2,3,4,5]);
    });
});

// 以下为对应原生的 call/apply/bind 测试用例，与上面用例是一样的
describe("call 测试", () => {
    it("call 的第一个参数为 null 时， this 应为 window", () => {
        expect(f.call(null)).toBe(window);
    });

    it("call 的第一个参数为 undefined 时， this 应为 window", () => {
        expect(f.call(undefined)).toBe(window);
    });

    it("call 的第一个参数为 空 时， this 应为 window", () => {
        expect(f.call()).toBe(window);
    });

    it("call 的第一个参数为 obj 时， this 应为 obj", () => {
        expect(f.call(obj)).toBe(obj);
    });

    it("call 的 this 参数后面的参数为 1,2,3 时，g 函数返回应值为 [1,2,3] ", () => {
        expect(g.call(null, 1, 2, 3)).toEqual([1,2,3]);
    });
});

describe("apply 测试", () => {
    it("apply 的第一个参数为 null 时， this 应为 window", () => {
        expect(f.apply(null)).toBe(window);
    });

    it("apply 的第一个参数为 undefined 时， this 应为 window", () => {
        expect(f.apply(undefined)).toBe(window);
    });

    it("apply 的第一个参数为 空 时， this 应为 window", () => {
        expect(f.apply()).toBe(window);
    });

    it("apply 的第一个参数为 obj 时， this 应为 obj", () => {
        expect(f.apply(obj)).toBe(obj);
    });

    it("apply 的 this 参数后面的参数为 [1,2,3] 时，g 函数返回应值为 [1,2,3] ", () => {
        expect(g.apply(null, [1,2,3])).toEqual([1,2,3]);
    });
});

describe("bind 测试", () => {
    it("bind 的第一个参数为 null 时，this 应为 window", () => {
        const f1 = f.bind(null);
        expect(f1()).toBe(window);
    });

    it("bind 的第一个参数为 undefined 时，this 应为 window", () => {
        const f1 = f.bind(undefined);
        expect(f1()).toBe(window);
    });

    it("bind 的第一个参数为 空 时，this 应为 window", () => {
        const f1 = f.bind();
        expect(f1()).toBe(window);
    });

    it("bind 的第一个参数为 obj 时，直接执行新函数，this 应为 obj", () => {
        const f1 = f.bind(obj);
        expect(f1()).toEqual(obj);
    });

    it("bind 的第一个参数为 obj 时，new 新函数， this 应为 实例", () => {
        const f1 = f.bind(obj);
        const instance1 = new f1();
        expect(instance1).not.toEqual(obj);
        expect(new f1()).toEqual(instance1);
    });

    it("bind this 后面的参数为 1,2,3 时，直接执行新函数，返回值为 [1,2,3]", () => {
        const g1 = g.bind(obj, 1, 2, 3);
        expect(g1()).toEqual([1,2,3]);
    });

    it("bind this 后面的参数为 1,2,3 时，新函数的参数为 4, 5 时，返回值为 [1,2,3,4,5]", () => {
        const g1 = g.bind(obj, 1, 2, 3);
        expect(g1(4,5)).toEqual([1,2,3,4,5]);
    });

    it("bind this 后面的参数为 1,2,3 时，new 新函数，返回值为 [1,2,3]", () => {
        const g1 = g.bind(obj, 1, 2, 3);
        const instance1 = new g1();
        expect(instance1).toEqual([1,2,3]);
    });

    it("bind this 后面的参数为 1,2,3 时，new 新函数时的参数为 4, 5 时，返回值为 [1,2,3,4,5]", () => {
        const g1 = g.bind(obj, 1, 2, 3);
        const instance1 = new g1(4,5);
        expect(instance1).toEqual([1,2,3,4,5]);
    });
});
