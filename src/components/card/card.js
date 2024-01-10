import { DivComponent } from "../../common/div-component.js";
import './card.css';

export class Card extends DivComponent {
  constructor(appState, cardState) {
    super();
    this.appState = appState;
    this.cardState = cardState;
  }

  #addToFavorites() {
    this.appState.favorites.push(this.cardState)
  }

  #deleteFromFavorites() {
    const index = this.appState.favorites.findIndex(n => n.key === this.cardState.key)
    this.appState.favorites.splice(index, 1)
  }

  render() {
    this.el.classList.add('card');
    const existInFavorites = this.appState.favorites.find(b => b.key === this.cardState.key)
    this.el.innerHTML = `
      <a class="card__image" href="#book?id=${this.cardState.key}">
        <img src="https://covers.openlibrary.org/b/olid/${this.cardState.cover_edition_key}-M.jpg" alt="Обложка" />
      </a>
      <div class="card__info">
        <a href="#book?id=${this.cardState.key}" class="card__a">
          <div class="card__tag">
            ${this.cardState.subject ? this.cardState.subject[0] : 'Не задано'}
          </div>
          <div class="card__name">
            ${this.cardState.title}
          </div>
          <div class="card__author">
            ${this.cardState.author_name ? this.cardState.author_name[0] : 'Не задано'}
          </div>
        </a>
        <div class="card__footer">
          <button class="button__add ${existInFavorites ? 'button__active' : 'button__passive'}">
            ${existInFavorites
              ? '<img src="./static/favorites.svg" />' 
              : '<img src="./static/favorite-white.svg" />' 
            }
          </button>
        </div>
      </div>
    `;
    if (existInFavorites) {
      this.el.querySelector('.button__active').addEventListener('click', this.#deleteFromFavorites.bind(this));
    } else {
      this.el.querySelector('.button__passive').addEventListener('click', this.#addToFavorites.bind(this));
    }
    return this.el
  }

}