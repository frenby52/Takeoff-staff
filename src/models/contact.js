class Contact {
  constructor(data) {
    this.id = data[`id`] || ``;
    this.name = data[`name`] || ``;
    this.phone = data[`phone`] || ``;
  }

  static parseContact(contact) {
    return new Contact(contact);
  }

  static parseContacts(contacts) {
    return contacts.map(Contact.parseContact);
  }

}

export default Contact;
