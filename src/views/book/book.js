import { AbstractView } from "../../common/view.js";
import { Header } from "../../components/header/header.js"
import './book.css'

export class BookView extends AbstractView {
  state = {
    book: {},
    author: {},
    loading: true
  }
  
  constructor (appState) {
    super()
    this.appState = appState
    this.loadbook(location.hash.split('=')[1])
  }

  async loadbook(isbn) {
    const res = await fetch(`https://openlibrary.org${isbn}.json`)
    this.state.book = await res.json()
    const res1 = await fetch(`https://openlibrary.org${this.state.book.authors[0].author.key}.json`)
    this.state.author = await res1.json()
    this.state.loading = false
    this.render()
  }

  render() {
    const main = document.createElement('div');
    if (this.state.loading === true) {
      // main.innerHTML = `<h1>Загрузкаs...</h1>`
      this.app.append(main);
    } else {
      this.app.innerHTML = ''
      main.classList.add('book_list')
      main.innerHTML = `
        <h1>${this.state.book.title}</h1>
        <div class="info__wrapper">
          <img src="https://covers.openlibrary.org/b/id/${this.state.book.covers[0]}-M.jpg" alt="Обложка"/>
          <div class="info__flex">
            <p>Автор:<span> ${this.state.author.name}</span></p>
            <p>Категория:<span>${this.state.book.subjects ? this.state.book.subjects[0] : 'Не задано'}</span></p>
            <p>Первая публикация:<span>${this.state.book.first_publish_date ? this.state.book.first_publish_date : 'Не задано'}</span></p>
            <p>Число страниц:<span>Не заданно</span></p>
          </div>         
        </div>
        <h2>
          Описание:
        </h2>
        <p>
        ${this.state.book.description.value ? this.state.book.description.value : this.state.book.description}
        </p>
        <h2>
          Теги:
        </h2>
        <div class="tags">

        </div>
      `
      const wrapperTag = main.querySelector('.tags')
      if (this.state.book.subject_places) {
         const len = this.state.book.subject_places.length
        for (let i = 0; i < len; i++) {
          if (i === 4) {
            break
          } else {
            const tag = document.createElement('div')
            tag.classList.add('tag')
            tag.innerText = `${this.state.book.subject_places[i]}`
            wrapperTag.append(tag)
          }
        }
      }
      this.app.innerHTML = '';
      this.app.append(main);
      this.renderHeader();
    }
  }

  renderHeader() {
    const header = new Header(this.appState).render();
    this.app.prepend(header);
  }
} 