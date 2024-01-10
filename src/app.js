import { BookView } from "./views/book/book.js";
import { FavoriteView } from "./views/favorites/favorites.js";
import { MainView } from "./views/main/main.js";

class App {
  routes = [
    {path: '', view: MainView},
    {path: '#favorites', view: FavoriteView},
    {path: '#book', view: BookView}
  ]

  appState = {
    favorites: []
  }

  constructor () {
    window.addEventListener('hashchange', this.route.bind(this))
    this.route()
  }

  route() {
    if (this.currentView) {
      this.currentView.destroy()
    }
    const view = this.routes.find(r => r.path == location.hash.split('?')[0]).view;
    this.currentView = new view(this.appState)
    this.currentView.render()
  }
}

new App()