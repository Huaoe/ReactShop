import React from "react";
import PropTypes from "prop-types";
import SignupForm from "./SignupForm";
import api from "../api";

class SignupPage extends React.Component {
  submit = data =>
    api.users.create(data).then(() => {
      this.props.setMessage("You have been successfully signup!");
      this.props.history.push("/login");
    });

  render() {
    return (
      <div className="ui segment">
        <SignupForm submit={this.submit} />
      </div>
    );
  }
}

SignupPage.propTypes = {
  setMessage: PropTypes.func.isRequired
};
export default SignupPage;
