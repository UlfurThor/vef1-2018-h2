/**
 * Removes all child elements from a element
 * @param {object} element Element whose cildren will be removed
 */
export function empty(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

/**
 * create element, and addd children if they exist
 *
 * @param {string} name Element name
 * @param {string} className Element class
 * @param  {...any} children Child elements
 */
export function el(name, className, ...children) {
  const element = document.createElement(name);
  if (className !== undefined) {
    element.classList.add(className);
  }
  if (Array.isArray(children)) {
    children.forEach((child) => {
      if (typeof child === 'string') {
        element.appendChild(document.createTextNode(child));
      } else if (child) {
        element.appendChild(child);
      }
    });
  }

  return element;
}


export function elClass(type, className, clickHandler) {
  const element = document.createElement(type);
  if (className) {
    element.classList.add(className);
  }
  if (clickHandler) {
    element.addEventListener('click', clickHandler);
  }
  return element;
}


/**
 * Creates a list of items from a json file that share a key
 * @param {*} jSon file the list is selected from
 * @param {*} key key that is selected based on
 */
export function createListFromKey(jSon, key) {
  const list = [];
  for (let m = 0; m < jSon.length; m += 1) {
    const element = jSon[m][key];
    list.push(element);
  }
  // console.log(list);
  return list;
}