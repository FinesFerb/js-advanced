import { DivComponent } from "../../common/div-component.js";
import { Card } from "../card/card.js";
import './card-list.css';

export class CardList extends DivComponent {
  constructor (appState, state) {
    super ()
    this.appState = appState
    this.state = state
  }

  paginationRight() {
    this.state.offset += 6
  }

  paginationLeft() {
    if (this.state.offset !== 0) {
      this.state.offset -= 6
    }
  }

  render() {
    if (this.state.loading === true) {
      this.el.innerHTML = '<div class="card_list__loader">Загрузка...</div>'
      return this.el
    } else {
      const cardGrid = document.createElement('div')
      cardGrid.classList.add('card_grid')
      this.el.append(cardGrid)
      for (let card of this.state.list) {
        cardGrid.append(new Card(this.appState, card).render())
      }
      if (this.state.list.length !== 0) {
        const pagination = document.createElement('div')
        pagination.classList.add('pagination')
        pagination.innerHTML = `
          <div class="pagination_left">
            <img src="./static/arrow_back.svg" />
            <p>Предыдущая страница</p>
          </div>
          <div class="pagination_right">         
            <p>Следующая страница</p>
            <img src="./static/arrow_back.svg" />
          </div>
        `
        this.el.append(pagination)
        this.el.querySelector('.pagination_left').addEventListener('click', this.paginationLeft.bind(this))
        this.el.querySelector('.pagination_right').addEventListener('click', this.paginationRight.bind(this))
      }
      return this.el
    }
    
  }
}