import {
  empty,
  // el,
  createListFromKey,
  elSimple,
} from './helpers';


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

  showLectures(filtered) {
    for (let m = 0; m < filtered.length; m += 1) {
      const element = filtered[m];
      console.log(element);
    }
    const titleList = createListFromKey(filtered, 'title');
    for (let m = 0; m < titleList.length; m += 1) {
      console.log(titleList[m]);

      const item = this.createItem(filtered[m]);
      this.container.appendChild(item);
    }
  }

  createItem(lecture) {
    console.log('createItem: ', lecture);
    const item = elSimple('div', 'item');
    const title = elSimple('h3', 'title');
    title.innerHTML = lecture.title;
    item.appendChild(title);
    const category = elSimple('div', 'cat');
    category.innerHTML = lecture.category;
    item.appendChild(category);
    return item;
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