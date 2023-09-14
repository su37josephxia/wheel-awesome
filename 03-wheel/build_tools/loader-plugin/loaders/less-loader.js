const less = require('less')
function loader(source) {
    const callback = this.async();
    less.render(source, (err, res) => {
        const { css, map } = res
        callback(null, css, map)
    })
}
module.exports = loader;