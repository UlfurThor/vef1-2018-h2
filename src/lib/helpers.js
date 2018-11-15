/**
 * Removes all child elements from a element
 * @param {object} element Element whose cildren will be removed
 */
export function empty(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

export function tester(asd) {
  console.error(asd);
}

/**
 * create element, and addd children if they exist
 *
 * @param {string} name Element name
 * @param  {...any} children Child elements
 */
export function el(name, ...children) {
  const element = document.createElement(name);

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