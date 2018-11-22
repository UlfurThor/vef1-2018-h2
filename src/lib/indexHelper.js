export function initButtons(page, list) {
  const buttHTML = page.querySelector('#buttID_html');
  // buttHTML.addEventListener('click', list.toggleHTML);
  buttHTML.onclick = (_event) => {
    list.toggleList(_event.srcElement, list);
  };
  if (list.enHTML) {
    buttHTML.classList.add('butt_enabled');
  }
  const buttCSS = page.querySelector('#buttID_css');
  buttCSS.onclick = (_event) => {
    list.toggleList(_event.srcElement, list);
  };
  if (list.enCSS) {
    buttCSS.classList.add('butt_enabled');
  }
  const buttJS = page.querySelector('#buttID_JS');
  buttJS.onclick = (_event) => {
    list.toggleList(_event.srcElement, list);
  };
  if (list.enJS) {
    buttJS.classList.add('butt_enabled');
  }
}

export function empty(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}