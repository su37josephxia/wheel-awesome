function loader(source) {
    // source
    //  html {
    //    background-color: red;
    // }  => js

    const style = `var style = document.createElement('style');
    style.innerHTML = ${JSON.stringify(source)};
    document.head.appendChild(style);
    `
    return style;
}
module.exports = loader;