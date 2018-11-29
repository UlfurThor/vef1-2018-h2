import {
  empty,
  el,
  readLocalStorageBoolean,
  getUrlParameter,
  fetchData,
} from './helpers';
import {
  PATH_PAGE_LIST,
  PATH_LIST_LECTURES,
} from './config';
import HTMLBuilder from './htmlBuilder';

export default class Lecture {
  constructor() {
    this.container = document.querySelector('.lect');
    this.slug = getUrlParameter('slug');
    this.HTML = new HTMLBuilder();
    this.finished = readLocalStorageBoolean(this.slug);
  }

  filterLectures(data) {
    for (let m = 0; m < data.length; m += 1) {
      if (this.slug === data[m].slug) {
        return data[m];
      }
    }
    return undefined;
  }


  finishLecture() {
    this.finished = true;
    localStorage.setItem(this.slug, true);
    this.finishedDOM.innerText = '✔ Fyrirlestur kláraður';
    this.finishedDOM.classList.replace('finish', 'finished');
  }

  finishLectureListner(data, lecture) {
    if (lecture.finished) {
      // do nothing
    } else {
      lecture.finishLecture();
    }
  }

  showPageEnd(data) {
    const end = el('div', 'done');
    let finished;
    if (this.finished) {
      finished = el('p', 'finished', '✔ Fyrirlestur kláraður');
    } else {
      finished = el('p', 'finish', 'Klára fyrilestur');
    }
    finished.onclick = () => {
      this.finishLectureListner(data, this);
    };
    this.finishedDOM = finished;
    end.appendChild(finished);
    const returnHome = el('p', 'back', 'Til baka');
    returnHome.onclick = () => {
      window.location.href = PATH_PAGE_LIST;
    };
    end.appendChild(returnHome);
    return end;
  }

  showLecture(data) {
    const lect = data.content;
    const lectContent = el('div', 'lect__content');
    for (let m = 0; m < lect.length; m += 1) {
      lectContent.appendChild(this.HTML.showLectureSelect(lect[m]));
    }
    this.container.appendChild(lectContent);

    const end = this.showPageEnd(data);
    this.container.appendChild(end);
  }

  load() {
    empty(this.container);
    fetchData(PATH_LIST_LECTURES)
      .then((data) => {
        const filtered = this.filterLectures(data.lectures);
        this.HTML.showTitle(filtered);
        this.showLecture(filtered);
      }).catch(error => console.error(error));
  }
}
