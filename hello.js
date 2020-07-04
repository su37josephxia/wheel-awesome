

async function FnA (next) {
    console.log('FnA start')
    await next()
    console.log('FnA end')
}

async function FnB (next) {
    return new Promise(
        resolve => {
            console.log('FnB start')
            next().then(() => {
                console.log('FnB end')
                resolve()
            })
        }
    )
   
}

process.nextTick(async () => {
    const fn = () => FnA(() => FnB(async () => {}))
    fn()
})