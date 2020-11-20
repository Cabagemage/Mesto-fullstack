import React from "react";
import "../App.css";
import {withRouter} from 'react-router-dom'
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const {name, value} = e.target;
    this.setState({
      [name]: value
    });
  }
  handleSubmit(e){
        e.preventDefault()
        const {email, password} = this.state;
        this.props.handleLogin(email, password)

  }


  render() {
  return (
    <div className="login">
      <h1 className="login__title">Вход</h1>
      <form onSubmit={this.handleSubmit} className="login__form">
        <input
        name="email"
        type="email"
        onChange={this.handleChange}
        value={this.state.email}
        className="login__email"
        required
        placeholder="email"></input>
        <input
        name="password"
        type="password"
        onChange={this.handleChange}
        value={this.state.password}
        className="login__password"
        required
        placeholder="пароль"></input>
        <button className="login__button">Войти</button>
      </form>
    </div>
  );
  }
}

export default withRouter(Login);

