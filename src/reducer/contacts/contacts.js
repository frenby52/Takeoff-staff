import Contact from "../../models/contact.js";
import {AppRoute} from "../../const.js";

const initialState = {
  contacts: [],
  isContactsLoaded: false,
  searchQuery: ``
};

const ActionType = {
  GET_CONTACTS: `GET_CONTACTS`,
  SET_CONTACTS_LOADER_STATE: `SET_CONTACTS_LOADER_STATE`,
  ADD_CONTACT: `ADD_CONTACT`,
  DELETE_CONTACT: `DELETE_CONTACT`,
  EDIT_CONTACT: `EDIT_CONTACT`,
  CHANGE_SEARCH_QUERY: `CHANGE_SEARCH_QUERY`,
};

const ActionCreator = {
  getContacts: (contacts) => ({type: ActionType.GET_CONTACTS, payload: contacts}),
  setContactsLoaderState: (isContactsLoaded) => ({type: ActionType.SET_CONTACTS_LOADER_STATE, payload: isContactsLoaded}),
  addContact: (contact) => ({type: ActionType.ADD_CONTACT, payload: contact}),
  deleteContact: (id) => ({type: ActionType.DELETE_CONTACT, payload: id}),
  editContact: (contact) => ({type: ActionType.EDIT_CONTACT, payload: contact}),
  changeSearchQuery: (searchQuery) => ({type: ActionType.CHANGE_SEARCH_QUERY, payload: searchQuery}),
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ActionType.GET_CONTACTS:
      return Object.assign({}, state, {contacts: action.payload});

    case ActionType.SET_CONTACTS_LOADER_STATE:
      return Object.assign({}, state, {isContactsLoaded: action.payload});

    case ActionType.ADD_CONTACT:
      return Object.assign({}, state, {contacts: [...state.contacts, action.payload]});

    case ActionType.DELETE_CONTACT:
      return Object.assign({}, state, {contacts: [...state.contacts.filter((contact) => contact.id !== action.payload)]});

    case ActionType.EDIT_CONTACT:
      const idx = state.contacts.findIndex((contact) => contact.id === action.payload.id);
      return Object.assign({}, state, {contacts: [...state.contacts.slice(0, idx), action.payload, ...state.contacts.slice(idx + 1)]});

    case ActionType.CHANGE_SEARCH_QUERY:
      return Object.assign({}, state, {searchQuery: action.payload});
  }

  return state;
};

const Operation = {
  getContacts: () => (dispatch, getState, api) => {

    return api.get(AppRoute.PHONEBOOK)
      .then((response) => response.data)
      .then(Contact.parseContacts)
      .then((response) => {
        dispatch(ActionCreator.getContacts(response));
        dispatch(ActionCreator.setContactsLoaderState(true));
      })
      .catch((err) => {
        throw err;
      });
  },
  createContact: (contactData, onSuccess) => (dispatch, getState, api) => {
    const contact = {
      name: contactData.name,
      phone: contactData.phone
    };

    return api.post(AppRoute.PHONEBOOK, contact)
      .then((response) => response.data)
      .then(Contact.parseContact)
      .then((response) => {
        dispatch(ActionCreator.addContact(response));
        onSuccess();
      })
      .catch((err) => {
        throw err;
      });
  },
  deleteContact: (id) => (dispatch, getState, api) => {

    return api.delete(AppRoute.PHONEBOOK + `/${id}`)
      .then(() => {
        dispatch(ActionCreator.deleteContact(id));
      })
      .catch((err) => {
        throw err;
      });
  },
  editContact: (contactData, id, onSuccess) => (dispatch, getState, api) => {
    const contact = {
      name: contactData.name,
      phone: contactData.phone
    };

    return api.put(AppRoute.PHONEBOOK + `/${id}`, contact)
      .then((response) => response.data)
      .then(Contact.parseContact)
      .then((response) => {
        dispatch(ActionCreator.editContact(response));
        onSuccess();
      })
      .catch((err) => {
        throw err;
      });
  }
};

export {reducer, Operation, ActionType, ActionCreator};
