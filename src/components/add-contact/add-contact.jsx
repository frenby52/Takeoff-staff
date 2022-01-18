import React, {createRef} from 'react';

const UserData = {
  NAME: `name`,
  PHONE: `phone`
};

const AddContact = (props) => {
  const {onAddButtonClick, id, onSuccess, contact} = props;
  const formRef = createRef();

  const _handleFormSubmit = (evt) => {
    evt.preventDefault();
    const data = new FormData(formRef.current);

    if (id !== -1) {
      onAddButtonClick({
        name: data.get(UserData.NAME),
        phone: data.get(UserData.PHONE),
      },
      id,
      () => onSuccess(-1));

    } else {
      onAddButtonClick({
        name: data.get(UserData.NAME),
        phone: data.get(UserData.PHONE),
      },
      () => onSuccess(-1));
    }

    formRef.current.reset();
  };

  return (
    <div className="add-contact">
      <form className="add-contact__form" action="#" ref={formRef}>
        <div className="add-contact__new-contact">
          {!contact && <p className="add-contact__title">Fill the form below to add new contact:</p>}
          <input className="add-contact__contact-input" placeholder="Name" name="name" id="name" type="text" defaultValue={contact ? contact.name : ``} required={true} minLength={3}/>
          <input className="add-contact__contact-input" placeholder="Phone" name="phone" id="phone" type="number" defaultValue={contact ? contact.phone : ``} required={true} minLength={3}/>
          <button className="add-contact__btn" type="submit" onClick={_handleFormSubmit} name="Add" >{contact ? `Edit` : `Add`}</button>
        </div>
      </form>
    </div>
  );
};

export default AddContact;
