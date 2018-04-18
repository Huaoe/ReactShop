import React, { Component } from "react";
import PropTypes from "prop-types";
import LoginForm from "./LoginForm";
import api from "../api";

class LoginPage extends Component {
  submit = data =>
    api.users.login(data).then(token => {
       this.props.login(token);
       this.props.history.push("/items");
    });

  render() {
    return (
      <div className="ui segment">
        <LoginForm submit={this.submit} />
      </div>
    );
  }
}

LoginPage.propTypes = {
  login: PropTypes.func.isRequired
};

export default LoginPage;
