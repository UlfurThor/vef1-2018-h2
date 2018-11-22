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
 * create element, and addd class and children if they exist
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


/**
 * reads state from local storage
 * @param {string} key key to select value from local storage
 * @param {string} initial optional, sets the initial value in local storeage if empty
 */
export function readLocalStorage(key, initial) {
  const val = localStorage.getItem(key);
  if (val === null) {
    if (initial !== undefined) {
      localStorage.setItem(key, initial);
      return initial;
    }
    return undefined;
  }
  return val;
}

/**
 * reads state from local storage, returns a bollean value if able
 * @param {string} key key to select value from local storage
 * @param {string} initial optional, sets the initial value in local storeage if empty
 */
export function readLocalStorageBoolean(key, initial) {
  let val;
  if (key === undefined) {
    val = readLocalStorage(key, false);
  } else {
    val = readLocalStorage(key, initial);
  }

  if (val === 'true') {
    return true;
  }
  if (val === 'false') {
    return false;
  }

  return val;
}

/**
 * general fetch function for json
 * @param {*} path location of file to be read
 */
export function fetchData(path) {
  return fetch(path)
    .then((result) => {
      if (!result.ok) {
        throw new Error('Non 200 status');
      }
      return result.json();
    })
    .catch(error => console.error(error));
}

/**
 * gets the value of a URL parameter
 * @param {*} name of parameter to get the value of
 */
export function getUrlParameter(paramName) {
  const searchString = window.location.search.substring(1);
  const params = searchString.split('&');

  for (let m = 0; m < params.length; m += 1) {
    const val = params[m].split('=');
    if (val[0] === paramName) {
      return val[1];
    }
  }
  return undefined;
}
