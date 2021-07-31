module.exports = fn => 
    (...args,oldCallback) => 
        callback => fn.apply(this,...[args,callback])
 