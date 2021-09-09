
const viewLog = false //出现问题，设置为true可追踪函数和输出

module.exports = compose => {
    test(`纯同步函数`, ()=>{
        const fns = [x=>x+'s1', x=>x+'s2', x=>x+'s3', x=>x+'s4']
        const func = compose(...fns)
        return func("bb-").then(data=>{
            expect(data).toBe("bb-s1s2s3s4")
        })
    })
    test(`纯Promise函数`, ()=>{
        const p1 = (x)=>{
            x=x||""
            return new Promise(resolve=>{
                setTimeout(resolve(x+"p1"), 1000)
            })
        }
        const p2 = (x)=>{
            x=x||""
            return new Promise(resolve=>{
                setTimeout(resolve(x+"p2"), 1000)
            })
        }
        const p3 = (x)=>{
            x=x||""
            return new Promise(resolve=>{
                setTimeout(resolve(x+"p3"), 1000)
            })
        }
        const fns = [p1, p2, p3]
        const func = compose(...fns)
        return func("bb-").then(data=>{
            expect(data).toBe("bb-p1p2p3")
        })
    })
    test(`同步函数和promise函数混合`, ()=>{
        const s1 = x=>x+'s1'
        const s2 = x=>x+'s2'
        const p1 = (x)=>{
            x=x||""
            return new Promise(resolve=>{
                setTimeout(resolve(x+"p1"), 1000)
            })
        }
        const p2 = (x)=>{
            x=x||""
            return new Promise(resolve=>{
                setTimeout(resolve(x+"p2"), 1000)
            })
        }
        const fns = [p1,s1,s2,p2]
        const func = compose(...fns)
        return func("mm-").then(data=>{
            expect(data).toBe("mm-p1s1s2p2")
        })
    })
}
