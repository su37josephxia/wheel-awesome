const less = require("less");
function loader(source) {
    const callback = this.async();
    less.render(source, function (err, res) {
        let { css } = res;
        callback(null, css);
    });
}
module.exports = loader;
