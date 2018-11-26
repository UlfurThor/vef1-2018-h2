import {
  empty,
  el,
  readLocalStorageBoolean,
  fetchData,
} from './helpers';
import {
  PATH_LIST_LECTURES,
} from './config';
import HTMLBuilder from './htmlBuilder';


export default class List {
  constructor() {
    this.container = document.querySelector('.list');
    this.enHTML = readLocalStorageBoolean('enHTML', true);
    this.enCSS = readLocalStorageBoolean('enCSS', true);
    this.enJS = readLocalStorageBoolean('enJS', true);

    this.HTML = new HTMLBuilder();
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
      } else if (!this.enCSS && !this.enHTML && !this.enJS) {
        filtered.push(item);
      }
    }
    return filtered;
  }

  showLectures(filtered) {
    const cards = el('div', 'cards');
    const cardsRow = el('div', 'cards__row');

    for (let m = 0; m < filtered.length; m += 1) {
      const item = this.HTML.createCard(filtered[m]);
      cardsRow.appendChild(item);
    }

    cards.appendChild(cardsRow);
    this.container.appendChild(cards);
  }

  load() {
    empty(this.container);
    fetchData(PATH_LIST_LECTURES)
      .then((data) => {
        const filtered = this.filterLectures(data.lectures);
        this.showLectures(filtered);
      }).catch(error => console.error(error));
  }

  toggleHTML() {
    this.enHTML = !this.enHTML;
    localStorage.setItem('enHTML', this.enHTML);
    return this.enHTML;
  }

  returnHTML() {
    return this.enHTML;
  }

  toggleCSS() {
    this.enCSS = !this.enCSS;
    localStorage.setItem('enCSS', this.enCSS);
    return this.enCSS;
  }

  returnCSS() {
    return this.enCSS;
  }

  toggleJS() {
    this.enJS = !this.enJS;
    localStorage.setItem('enJS', this.enJS);
    return this.enJS;
  }

  returnJS() {
    return this.enJS;
  }

  toggleList(button, list) {
    const buttID = button.id;
    button.classList.remove('butt_enabled');
    let enabled = false;
    if (buttID === 'buttID_html') {
      enabled = list.toggleHTML();
    } else if (buttID === 'buttID_css') {
      enabled = list.toggleCSS();
    } else if (buttID === 'buttID_JS') {
      enabled = list.toggleJS();
    }
    if (enabled) {
      button.classList.add('butt_enabled');
    }

    list.load();
  }
}
