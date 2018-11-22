import {
  empty,
  el,
  createListFromKey,
  elClass,
} from './helpers';
import {
  PATH_PAGE_LIST,
  PATH_LIST_LECTURES,
  PATH_PAGE_LECTURE,
} from './config';


export default class List {
  constructor() {
    this.container = document.querySelector('.list');
    this.enHTML = true;
    this.enCSS = false;
    this.enJS = false;
  }

  filterLectures(data) {
    const filtered = [];
    for (let m = 0; m < data.length; m += 1) {
      const item = data[m];
      if (item.category === 'html' && this.enHTML) {
        filtered.push(item);
      } else if (item.category === 'css' && this.enCSS) {
        filtered.push(item);
      } else if (item.category === 'javascript' && this.enJS) {
        filtered.push(item);
      }
    }
    return filtered;
  }

  cardImage(lecture) {
    const cardImage = el('div', 'card__image');
    let cardImg;
    if (lecture.thumbnail === undefined) {
      cardImg = el('div', 'card__img');
      cardImg.classList.add('img_missing');
    } else {
      cardImg = el('img', 'card__img');
      cardImg.src = lecture.thumbnail;
      cardImg.alt = lecture.title;
    }

    cardImage.appendChild(cardImg);
    return cardImage;
  }


  createItem(lecture) {
    const cardsCol = el(
      'div', 'cards__col',
      el(
        'class', 'card', this.cardImage(lecture),
        el(
          'div', 'card__content',
          el('div', 'card__category', lecture.category.toUpperCase()),
          el('h2', 'card__title', lecture.title),
        ),
      ),
    );
    cardsCol.onclick = () => {
      window.location.href = `${PATH_PAGE_LECTURE}?slug=${lecture.slug}`;
    };

    return cardsCol;
  }

  showLectures(filtered) {
    console.log(filtered);
    const cards = elClass('div', 'cards');
    const cardsRow = elClass('div', 'cards__row');

    for (let m = 0; m < filtered.length; m += 1) {
      const item = this.createItem(filtered[m]);
      cardsRow.appendChild(item);
    }

    cards.appendChild(cardsRow);
    this.container.appendChild(cards);
  }


  fetchData(path) {
    return fetch(path)
      .then((result) => {
        if (!result.ok) {
          throw new Error('Non 200 status');
        }
        return result.json();
      })
      .catch(error => console.error(error));
  }

  load() {
    empty(this.container);
    this.fetchData('lectures.json')
      .then((data) => {
        const d = this.filterLectures(data.lectures);
        this.showLectures(d);
        this.filterLectures(data);
      }).catch(error => console.error(error));

    // this.container
  }

  toggleHTML() {
    this.enHTML = !this.enHTML;
    return this.enHTML;
  }

  returnHTML() {
    return this.enHTML;
  }

  toggleCSS() {
    this.enCSS = !this.enCSS;
    return this.enCSS;
  }

  returnCSS() {
    return this.enCSS;
  }

  toggleJS() {
    this.enJS = !this.enJS;
    return this.enJS;
  }

  returnJS() {
    return this.enJS;
  }

  toggleList(button, list) {
    const buttID = button.id;
    console.log(button);
    button.classList.remove('butt_enabled');
    let enabled = false;
    if (buttID === 'buttID_html') {
      console.log('html');
      enabled = list.toggleHTML();
    } else if (buttID === 'buttID_css') {
      console.log('html');
      enabled = list.toggleCSS();
    } else if (buttID === 'buttID_JS') {
      console.log('html');
      enabled = list.toggleJS();
    }
    if (enabled) {
      button.classList.add('butt_enabled');
    }
    console.log('enabled', enabled);

    list.load();
  }
}