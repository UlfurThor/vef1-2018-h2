import {
  empty,
  el,
  createListFromKey,
  readLocalStorage,
  readLocalStorageBoolean,
  getUrlParameter,
  fetchData,
} from './helpers';
import {
  PATH_PAGE_LIST,
  PATH_LIST_LECTURES,
  PATH_PAGE_LECTURE,
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

  showTitle(data) {
    const className = document.querySelector('.content__class');
    className.innerHTML = data.category.toUpperCase();
    const titleName = document.querySelector('.content__title');
    titleName.innerHTML = data.title;
  }

  lectVideo(data) {
    const lectVid = el('div', 'lect__vid');
    const vid = el('iframe', 'video');
    vid.src = data.data;
    lectVid.appendChild(vid);
    return lectVid;
  }

  lectText(data) {
    const lectText = el('div', 'lect__text');
    const text = data.data;
    const splitText = text.split('\n');
    for (let m = 0; m < splitText.length; m += 1) {
      const txt = el('p', 'txt', splitText[m]);
      lectText.appendChild(txt);
    }
    return lectText;
  }

  lectImage(data) {
    const lectContImg = el('div', 'lect__contImg');
    const img = el('img', 'lect__img');
    img.src = data.data;
    img.alt = data.data;
    lectContImg.appendChild(img);
    if (data.caption !== undefined) {
      const cap = el('div', 'lect__caption',
        el('p', 'txt', data.caption));
      lectContImg.appendChild(cap);
    }
    return lectContImg;
  }

  lectQuote(data) {
    const quote = el('div', 'quote');
    const blockquote = el('blockquote', 'blockquote', data.data);
    quote.appendChild(blockquote);
    if (data.attribute !== undefined) {
      const cite = el('cite', 'cite', data.attribute);
      quote.appendChild(cite);
    }
    return quote;
  }

  lectCode(data) {
    const div = el('pre', 'code', data.data);
    return div;
  }

  lectList(data) {
    const list = data.data;
    const ul = el('ul', 'list');
    for (let m = 0; m < list.length; m += 1) {
      const li = el('li', 'list_item', list[m]);
      ul.appendChild(li);
    }
    return ul;
  }

  lectHeadding(data) {
    const div = el('h1', 'headding', data.data);
    return div;
  }


  showLecturePart(part) {
    switch (part.type) {
      case 'youtube':
        return el('div', 'youtube', this.lectVideo(part));
      case 'text':
        return this.lectText(part);
      case 'image':
        return this.lectImage(part);
      case 'quote':
        return this.lectQuote(part);
      case 'code':
        return this.lectCode(part);
      case 'list':
        return this.lectList(part);
      case 'heading':
        return this.lectHeadding(part);
      default:
        break;
    }
    return el('div', 'x', part.type);
  }

  finishLecture() {
    this.finished = true;
    localStorage.setItem(this.slug, true);
    this.finishedDOM.innerText = 'Fyrirlestur kláraður';
    this.finishedDOM.classList.replace('finish', 'finished');
  }

  finishLectureListner(data, lecture) {
    if (lecture.finished) {
      console.log('already finished');
    } else {
      console.log('not finished');
      lecture.finishLecture();
    }
  }

  showPageEnd(data) {
    const end = el('div', 'done');
    let finished;
    console.log(this.finished);
    if (this.finished) {
      finished = el('p', 'finished', 'Fyrirlestur kláraður');
    } else {
      finished = el('p', 'finish', 'Klára fyrilestur');
    }
    finished.onclick = (_event) => {
      console.log(_event);
      this.finishLectureListner(data, this);
    };
    this.finishedDOM = finished;
    end.appendChild(finished);
    const returnHome = el('p', 'back', 'Til baka');
    returnHome.onclick = (_event) => {
      console.log(_event);
      window.location.href = PATH_PAGE_LIST;
    };
    end.appendChild(returnHome);
    return end;
  }

  showLecture(data) {
    console.log(data);
    const lect = data.content;
    const lectContent = el('div', 'lect__content');
    for (let m = 0; m < lect.length; m += 1) {
      // console.log(lect[m]);
      lectContent.appendChild(this.showLecturePart(lect[m]));
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
        this.showTitle(filtered);
        this.showLecture(filtered);
      }).catch(error => console.error(error));
  }
}
