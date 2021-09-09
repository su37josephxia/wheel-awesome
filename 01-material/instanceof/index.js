function myInstanceOf(child, parent) {
    const proto = child.__proto__;
    const prototype = parent.prototype;

    if (proto === null) {
        return false;
    } else if (proto === prototype) {
        return true;
    } else {
        return myInstanceOf(proto, parent);
    }
}

module.exports = myInstanceOf;