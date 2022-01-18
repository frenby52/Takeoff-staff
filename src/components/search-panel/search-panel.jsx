import React, {createRef} from 'react';

const SearchPanel = (props) => {
  const {onSearchButtonClick} = props;
  const formRef = createRef();

  const _handleFormSubmit = (evt) => {
    evt.preventDefault();
    const data = new FormData(formRef.current);
    onSearchButtonClick(data.get(`search`));
  };

  const _handleSearchClear = (evt) => {
    evt.preventDefault();
    onSearchButtonClick(``);
    formRef.current.reset();
  };

  return (
    <div className="search-panel">
      <form className="search-panel__form" action="#" ref={formRef}>
        <input className="search-panel__input" placeholder="type name to search" name="search" id="name" type="text" required={true} minLength={2}/>
        <div className="search-panel__wrapper">
          <button className="search-panel__btn" type="submit" onClick={_handleFormSubmit} name="Search" >Search</button>
          <button className="search-panel__btn" type="submit" onClick={_handleSearchClear} name="Reset" >Reset Search</button>
        </div>
      </form>
    </div>
  );
};

export default SearchPanel;
