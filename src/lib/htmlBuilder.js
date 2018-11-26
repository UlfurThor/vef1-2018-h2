import {
  empty,
  el,
  createListFromKey,
  readLocalStorage,
  readLocalStorageBoolean,
  fetchData,
} from './helpers';
import {
  PATH_PAGE_LIST,
  PATH_LIST_LECTURES,
  PATH_PAGE_LECTURE,
} from './config';

export default class HTMLBuilder {
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

  createCard(lecture) {
    const title = el('div', 'card__title_container',
      el('h2', 'card__title', lecture.title));
    if (readLocalStorageBoolean(lecture.slug)) {
      title.appendChild(el('div', 'card__title_finished', '✓'));
    }
    const cardsCol = el(
      'div', 'cards__col',
      el(
        'class', 'card', this.cardImage(lecture),
        el(
          'div', 'card__content',
          el('div', 'card__category', lecture.category.toUpperCase()),
          title,
        ),
      ),
    );
    cardsCol.firstChild.onclick = () => {
      window.location.href = `${PATH_PAGE_LECTURE}?slug=${lecture.slug}`;
    };

    return cardsCol;
  }
}
