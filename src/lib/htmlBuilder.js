import {
  el,
  readLocalStorageBoolean,
} from './helpers';
import {
  PATH_PAGE_LECTURE,
} from './config';

export default class HTMLBuilder {
  /**
   * Creates the dom object for a image on a card,
   *  handles missing images
   * @param {*} lecture the lecture in jSon format
   */
  cardImage(lecture) {
    const cardImage = el('div', 'card__image');
    let cardImg;
    if (lecture.thumbnail === undefined) {
      cardImg = el('div', 'card__img');
      cardImg.classList.add('img__missing');
    } else {
      cardImg = el('img', 'card__img');
      cardImg.src = lecture.thumbnail;
      cardImg.alt = lecture.title;
    }

    cardImage.appendChild(cardImg);
    return cardImage;
  }

  /**
   * Creates the dom object for a card
   * @param {*} lecture the lecture in jSon format
   */
  createCard(lecture) {
    const title = el('div', 'card__title_container',
      el('h2', 'card__title', lecture.title));
    if (readLocalStorageBoolean(lecture.slug)) {
      title.appendChild(el('div', 'card__title_finished', '✔'));
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


  //* *********************************************************** */
  //* *********************************************************** */
  //* *********************************************************** */
  //* *********************************************************** */


  /**
   * Ads the click listeners to the buttons index page,
   * and formats them
   * @param {*} page the index page
   * @param {*} list the list containing functions/events for the listeners
   */
  initIndexButtons(page, list) {
    const buttHTML = page.querySelector('#buttID_html');
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

  //* *********************************************************** */
  //* *********************************************************** */
  //* *********************************************************** */
  //* *********************************************************** */

  /**
   * creates the dom object for a youtube video
   * @param {*} lecture the lecture in jSon format
   */
  lectVideo(lecture) {
    const lectVid = el('div', 'lect__video');
    const vid = el('iframe', 'video_frame');
    vid.src = lecture.data;
    vid.frameborder = '0';
    vid.allowfullscreen = '0';
    lectVid.appendChild(vid);
    return lectVid;
  }

  /**
   * creates the dom object for a block of text
   * @param {*} lecture the lecture in jSon format
   */
  lectText(lecture) {
    const lectText = el('div', 'lect__text');
    const text = lecture.data;
    const splitText = text.split('\n');
    for (let m = 0; m < splitText.length; m += 1) {
      const txt = el('p', 'txt', splitText[m]);
      lectText.appendChild(txt);
    }
    return lectText;
  }

  /**
   * creates the dom object for a image,
   * can have a caption
   * @param {*} lecture the lecture in jSon format
   */
  lectImage(lecture) {
    const lectContImg = el('div', 'lect__image');
    const img = el('img', 'img');
    img.src = lecture.data;
    img.alt = lecture.data;
    lectContImg.appendChild(img);
    if (lecture.caption !== undefined) {
      const cap = el('div', 'caption',
        el('p', 'txt', lecture.caption));
      lectContImg.appendChild(cap);
    }
    return lectContImg;
  }

  /**
   * creates the dom object for a quote,
   * can contain a atribution
   * @param {*} lecture the lecture in jSon format
   */
  lectQuote(lecture) {
    const quote = el('div', 'lect__quote');
    const blockquote = el('blockquote', 'blockquote', lecture.data);
    quote.appendChild(blockquote);
    if (lecture.attribute !== undefined) {
      const cite = el('cite', 'cite', lecture.attribute);
      quote.appendChild(cite);
    }
    return quote;
  }

  /**
   * Creates the dom object for a block of code/preformatet text.
   * Since the createElement/createTextNode functions seam to hndle
   *    the translation hrom html tags to save characters there
   *    seems to me that there is no need to format the text myself
   * @param {*} lecture the lecture in jSon format
   */
  lectCode(lecture) {
    const div = el('pre', 'lect__code', lecture.data);
    return div;
  }

  /**
   * Creates the dom object for a list of strings
   * @param {*} lecture the lecture in jSon format
   */
  lectList(lecture) {
    const list = lecture.data;
    const ul = el('ul', 'lect__list');
    for (let m = 0; m < list.length; m += 1) {
      const li = el('li', 'item', list[m]);
      ul.appendChild(li);
    }
    return ul;
  }

  /**
   * Creates the dom object for a heading
   * @param {*} lecture the lecture in jSon format
   */
  lectHeadding(lecture) {
    const div = el('h1', 'lect__heading', lecture.data);
    return div;
  }


  /**
   * Selects how to handle a lecture based on its .type tag
   * @param {*} lecture the lecture in jSon format
   */
  showLectureSelect(lecture) {
    switch (lecture.type) {
      case 'youtube':
        return this.lectVideo(lecture);
      case 'text':
        return this.lectText(lecture);
      case 'image':
        return this.lectImage(lecture);
      case 'quote':
        return this.lectQuote(lecture);
      case 'code':
        return this.lectCode(lecture);
      case 'list':
        return this.lectList(lecture);
      case 'heading':
        return this.lectHeadding(lecture);
      default:
        break;
    }
    return el('div', 'ERROR', lecture.type);
  }


  showTitle(data) {
    const className = document.querySelector('.content__class');
    className.innerHTML = data.category.toUpperCase();
    const titleName = document.querySelector('.content__title');
    titleName.innerHTML = data.title;
  }
}
