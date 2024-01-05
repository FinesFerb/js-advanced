'use strict';
class User {
  #login
  #_password

  constructor(login, password) {
    this.#login = login
    this.#password = password
  }

  get login() {
    return this.#login
  }

  checkPass(pass) {
    return String(pass) === String(this.#_password).split('').reverse().join('')
  }

  set #password(pass) {
    this.#_password = String(pass).split('').reverse().join('')
  }

  changePass(oldPass, newPass) {
    if (!this.checkPass(oldPass)) {
      return
    }
    this.#password = String(newPass)
  }
}

const user1 = new User('Daniil', 12345)

console.log(user1.checkPass(12345));
user1.changePass(12345, 6789)
console.log(user1);