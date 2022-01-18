import React from "react";
import {getAuthStatus, getAuthUserData} from "../../reducer/user/selectors";
import {connect} from "react-redux";
import {getFilteredContacts, isContactsLoaded} from "../../reducer/contacts/selectors";
import {Operation as ContactsOperation} from "../../reducer/contacts/contacts";
import AddContact from "../add-contact/add-contact.jsx";
import SearchPanel from "../search-panel/search-panel.jsx";
import {ActionCreator} from "../../reducer/contacts/contacts";

class ContactsPage extends React.PureComponent {
  componentDidMount() {
    const {isContactsLoaded, loadContacts} = this.props;
    if (!isContactsLoaded) {
      loadContacts();
    }
  }

  render() {
    const {contacts, isContactsLoaded, activeItem, onActiveItemChange, isAuthed, authUserData, onAddButtonClick, onEditButtonClick, onDeleteButtonClick, onSearchButtonClick} = this.props;

    return !isContactsLoaded || !authUserData ? <h2>Loading...</h2> : (
      <div className="wrapper">
        <div className="contacts-page__wrap">
          <h1 className="contacts-page__title">PhoneBook App</h1>
          <header className="contacts-page__header">
            {isAuthed && <div className="contacts-page__user-block">Current user: {authUserData.email}</div>}
            <div className="contacts-page__search">
              <SearchPanel onSearchButtonClick={onSearchButtonClick}/>
            </div>
          </header>

          <div className="contacts-page__contacts-wrap">
            <AddContact id={-1} contact={null} onAddButtonClick={onAddButtonClick} onSuccess={onActiveItemChange}/>
            <div className="contacts-page__contacts">
              <h2 className="contacts-page__contacts-title">Contacts list:</h2>
              {isContactsLoaded && !contacts.length ? <div>No data to show, try again</div> : contacts.map((contact, i) => {

                return (
                  <>
                    <div className="contact" key={contact.id}>
                      <div className="contact__wrapper">
                        <div className="contact__id">Contact №{i + 1}</div>
                        <div className="contact__content-controls">
                          <button className="contact__btn" type="button" onClick={()=>onActiveItemChange(contact.id)} data-id={contact.id} name="Edit" >Edit</button>
                          <button className="contact__btn" type="button" onClick={()=>onDeleteButtonClick(contact.id)} name="Delete" >Delete</button>
                        </div>
                      </div >
                      <div className="contact__content">
                        <p className="contact__text"><span className="contact__text-title">Name:</span> {contact.name}</p>
                        <p className="contact__text"><span className="contact__text-title">Phone:</span> {contact.phone}</p>
                      </div>
                      {activeItem === contact.id && <AddContact id={activeItem} onAddButtonClick={onEditButtonClick} onSuccess={onActiveItemChange} contact={contact}/>}
                    </div>
                  </>);
              })}
            </div>
          </div>
          <footer className="page-footer">
            <div className="copyright">
              <p>© 2022 PhoneBook App</p>
            </div>
          </footer>
        </div>
      </div>);
  }
}

const mapStateToProps = (state) => {

  return {
    isAuthed: getAuthStatus(state),
    contacts: getFilteredContacts(state),
    isContactsLoaded: isContactsLoaded(state),
    authUserData: getAuthUserData(state),
  };
};

const mapDispatchToProps = (dispatch) => ({
  loadContacts() {
    dispatch(ContactsOperation.getContacts());
  },
  onAddButtonClick(contactData, onSuccess) {
    dispatch(ContactsOperation.createContact(contactData, onSuccess));
  },
  onEditButtonClick(contactData, id, onSuccess) {
    dispatch(ContactsOperation.editContact(contactData, id, onSuccess));
  },
  onDeleteButtonClick(id) {
    dispatch(ContactsOperation.deleteContact(id));
  },
  onSearchButtonClick(searchQuery) {
    dispatch(ActionCreator.changeSearchQuery(searchQuery));
  },
});

export {ContactsPage};
export default connect(mapStateToProps, mapDispatchToProps)(ContactsPage);
