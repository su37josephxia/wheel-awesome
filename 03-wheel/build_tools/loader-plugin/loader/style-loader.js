const { interpolateName } = require("loader-utils");
const path = require('path')
function loader(source, map) {
  // const options = interpolateName(this);

  console.log('options', this.getOptions())

  const p = path.resolve(path.dirname(this.resource), './config.json')
  this.addDependency(p)

  let style = `
      let style = document.createElement('style');
      style.innerHTML = ${JSON.stringify(source)};
      document.head.appendChild(style)
    `;
  return style;
}
module.exports = loader;
