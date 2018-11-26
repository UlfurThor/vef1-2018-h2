import List from './lib/list';
import Lecture from './lib/lecture';
import HTMLBuilder from './lib/htmlBuilder';

document.addEventListener('DOMContentLoaded', () => {
  const page = document.querySelector('body');
  const isLecturePage = page.classList.contains('lecture-page');
  const htmlBuilder = new HTMLBuilder();
  // console.log(isLecturePage);

  if (isLecturePage) {
    // fill me
    console.log('lecturepage');
    const lecture = new Lecture();

    lecture.load();
  } else {
    const list = new List();

    htmlBuilder.initIndexButtons(page, list);

    list.load();
  }
});
