import React from "react";
import logo from "../images/logo.svg";
import { Link, Route } from 'react-router-dom';
import "../App.css";


function Header({onRegister, signOut, email}) {

  return (
    <header className="header">
      <img src={logo} className="header__logo" alt="logo" />
      <Route path="/signup">

      <Link className="header__button" to="/signin">Вход</Link>

      </Route>
    <Route path="/signin">

    <Link className="header__button"  to="/signup"  onClick={onRegister}>Регистрация</Link>

    </Route>
    <Route exact path="/">
      <div className="header__profile">
      <p className="header__email">{email}</p>
      <Link className="header__button" to='/signin' onClick={signOut}>Выйти</Link>
      </div>
    </Route>
    </header>

  );
}

export default Header;
