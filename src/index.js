import List from './lib/list';
import {
  initButtons,
} from './lib/indexHelper';
/*
function initButtons(page, list) {
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
*/

document.addEventListener('DOMContentLoaded', () => {
  const page = document.querySelector('body');
  const isLecturePage = page.classList.contains('lecture-page');
  // console.log(isLecturePage);

  if (isLecturePage) {
    // fill me
    console.log('lecturepage');
  } else {
    const list = new List();

    initButtons(page, list);

    list.load();
  }
});

fetch('../lectures.json');