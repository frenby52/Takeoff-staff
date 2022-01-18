import React from 'react';

const UserData = {
  EMAIL: `user-email`,
  PASSWORD: `user-password`
};

const SignIn = (props) => {
  const {onSignInButtonClick} = props;
  const formRef = React.createRef();

  const _handleFormSubmit = (evt) => {
    evt.preventDefault();
    const data = new FormData(formRef.current);

    onSignInButtonClick({
      email: data.get(UserData.EMAIL),
      password: data.get(UserData.PASSWORD),
    });
  };

  return (
    <div className="sign-in">
      <div className="sign-in__content">
        <form action="#" className="sign-in__form" ref={formRef}>
          <div className="sign-in__fields">
            <div className="sign-in__field">
              <input className="sign-in__input" type="email" placeholder="Email address" name="user-email" id="user-email" defaultValue="" required={true}/>
              <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
            </div>
            <div className="sign-in__field">
              <input className="sign-in__input" type="password" placeholder="Password" name="user-password" id="user-password" defaultValue="" required={true}/>
              <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
            </div>
          </div>
          <button className="sign-in__btn" type="submit" name="Sign-in" onClick={_handleFormSubmit}>Sign in</button>
        </form>
      </div>

      <footer className="page-footer">
        <div className="copyright">
          <p>© 2022 PhoneBook App</p>
        </div>
      </footer>
    </div>
  );
};

export default SignIn;
