import List from './lib/list';
import Lecture from './lib/lecture';
import {
  initButtons,
} from './lib/indexHelper';

document.addEventListener('DOMContentLoaded', () => {
  const page = document.querySelector('body');
  const isLecturePage = page.classList.contains('lecture-page');
  // console.log(isLecturePage);

  if (isLecturePage) {
    // fill me
    console.log('lecturepage');
    const lecture = new Lecture();

    lecture.load();
  } else {
    const list = new List();

    initButtons(page, list);

    list.load();
  }
});
