import {createSelector} from "reselect";
import NameSpace from "../name-space.js";

export const getContacts = (state) => state[NameSpace.CONTACTS].contacts;

export const isContactsLoaded = (state) => state[NameSpace.CONTACTS].isContactsLoaded;

export const getSearchQuery = (state) => state[NameSpace.CONTACTS].searchQuery;

export const getFilteredContacts = createSelector(
    getContacts,
    getSearchQuery,
    (contacts, searchQuery) => {
      if (searchQuery !== ``) {

        return contacts.filter((contact) => {
          return contact.name.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1;
        });
      }

      return contacts;
    }
);
