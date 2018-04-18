import React from "react";
import { Route } from "react-router-dom";
import axios from "axios";
import jwtDecode from "jsonwebtoken";
import HomePage from "./HomePage";
import TopNavigation from "./TopNavigation";
import GamesPage from "./GamesPage";
import ShowGamePage from "./ShowGamePage";
import SignupPage from "./SignupPage";
import LoginPage from "./LoginPage";
import PublishersPage from "./PublishersPage";

const setAuthorizationHeader = (token = null) => {
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
};

class App extends React.Component {
  state = {
    user: {
      token: null,
      role: "user"
    },
    message: ""
  };

  componentDidMount() {
    if (localStorage.bgshopToken) {
    const user = jwtDecode.decode(localStorage.bgshopToken).user;
        this.setState({
        user: {
          token: localStorage.bgshopToken,
          role: user.role
        }
      });
      setAuthorizationHeader(localStorage.bgshopToken);
    }
  }

  setMessage = message => this.setState({ message: message });

  logout = () => {
    this.setState({ user: { token: null, role: "user" } });
    setAuthorizationHeader();
    localStorage.removeItem("bgshopToken");
  };

  login = token => {
  const user = jwtDecode.decode(token).user;

    this.setState({
      user: {
        token: token,

        role: user.role
      }
    });
    localStorage.bgshopToken = token;
    setAuthorizationHeader(token);
  };
  render() {
    return (
      <div className="ui container">
        <TopNavigation
          isAuthenticated={!!this.state.user.token}
          logout={this.logout}
          isAdmin={!!this.state.user.token && this.state.user.role === "admin"}
        />
        {this.state.message && (
          <div className="ui info message">
            <i
              className="close icon"
              onClick={() => this.setState({ message: "" })}
            />
            {this.state.message}
          </div>
        )}
        <Route path="/" exact component={HomePage} />
        <Route
          path="/items"
          render={props => <GamesPage {...props} user={this.state.user} />}
        />
        <Route
          path="/signup"
          render={props => (
            <SignupPage {...props} setMessage={this.setMessage} />
          )}
        />
        <Route
          path="/login"
          render={props => <LoginPage {...props} login={this.login} />}
        />
        <Route path="/game/:_id" exact component={ShowGamePage} />
        <Route path="/publishers" render={props => <PublishersPage {...props} user={this.state.user} />}/>
      </div>
    );
  }
}

export default App;
