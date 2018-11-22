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

export default class Lecture {
  constructor() {
    this.container = document.querySelector('.lecture');
    console.log('Lecture');
    const x = window.location.search;
    const y = getUrlParameter('slug');

    this.slug = getUrlParameter('slug');
  }

  load() {
    empty(this.container);
    fetchData(PATH_LIST_LECTURES)
      .then((data) => {
        const filtered = this.filterLectures(data.lectures);
        this.showLectures(filtered);
        this.filterLectures(data);
      }).catch(error => console.error(error));
  }
}
