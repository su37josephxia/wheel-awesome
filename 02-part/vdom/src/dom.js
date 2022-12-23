export function createText(text) {
  console.log("createText...");
  return new Text(text);
}

export function replaceElement(oldElement,newElement) {
  oldElement.replaceWith(newElement);
}

export function remove(el, parent) {
  parent.remove(el);
}

export function createElement(type) {
  console.log("createElement...");
  return document.createElement(type);
}

export function setText(el, text) {
  console.log("setText...");
  el.textContent = text;
}


export function setInnerHtml(el, text) {
  el.innerHTML = text
}

export function insert(el, parent) {
  console.log("insert...");
  parent.append(el);
}

export function patchProp(el, key, prevValue, nextValue) {
  // onClick
  // 1. 如果前面2个值是 on 的话
  // 2. 就认为它是一个事件
  // 3. on 后面的就是对应的事件名
  if (key.startsWith("on")) {
    const eventName = key.slice(2).toLocaleLowerCase();
    el.addEventListener(eventName, nextValue);
  } else {
    if (nextValue === null) {
      el.removeAttribute(key, nextValue);
    } else {
      el.setAttribute(key, nextValue);
    }
  }
}
