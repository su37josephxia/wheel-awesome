const http = require('http')
const server = http.createServer((req,res) => {
    res.end('I am a HTTP Server ')
})
server.listen(3000, () => {
    console.log('HTTP Server at 3000')
})