export default class User {
  constructor(user) {
    this.id = user[`user`][`id`] || ``;
    this.email = user[`user`][`email`] || ``;
    this.name = user[`name`] || ``;
  }

  static parseUser(user) {
    return new User(user);
  }
}
