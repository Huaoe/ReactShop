import React from "react";
import orderBy from "lodash/orderBy";
import _find from "lodash/find";

import PropTypes from "prop-types";
import GamesList from "./GamesList";
import GameForm from "./GameForm";
import AdminRoute from "./AdminRoute"
import api from "../api";

class GamesPage extends React.Component {
  state = {
    items: [],
    publishers: [],
    selectedGame: {},
    loading: true
  };

  componentDidMount() {
    api.items
      .fetchAll()
      .then(items =>
        this.setState({ items: this.sortGames(items), loading: false })
      );
    api.publishers
      .fetchAll()
      .then(publishers => this.setState({ publishers: publishers }));
  }

  sortGames(items) {
    return orderBy(items, ["featured", "name"], ["desc", "asc"]);
  }

  //***********
  //GAME FORM
  //***********

  saveGame = gameData =>
    gameData._id ? this.updateGame(gameData) : this.addGame(gameData);
  // .then(
  //   () => this.props.history.push("/items")
  // );

  addGame = gameData =>
    api.items.create(gameData).then(game =>
      this.setState({
        items: this.sortGames([...this.state.items, game]),
        showGameForm: false
      })
    );

  updateGame = gameData =>
    api.items.update(gameData).then(game =>
      this.setState({
        items: this.sortGames(
          this.state.items.map(item => (item._id === game._id ? game : item))
        ),
        showGameForm: false
      })
    );
  deleteGame = game =>
    api.items.delete(game).then(() =>
      this.setState({
        items: this.state.items.filter(item => item._id !== game._id)
      })
    );

  toggleFeatured = gameId => {
    const game = _find(this.state.items, { _id: gameId });
    return this.updateGame({
      ...game,
      featured: !game.featured
    });
  };

  render() {
    const numberOfcolumns =
      this.props.location.pathname === "/items" ? "sixteen" : "ten";

    return (
      <div className="ui container">
        {
          <div className="ui stackable grid">
            <div>
              <AdminRoute
                path="/items/new"
                user={this.props.user}
                render={() => (
                  <div className="six wide column">
                    <GameForm
                      publishers={this.state.publishers}
                      submit={this.saveGame}
                      game={{}}
                    />
                  </div>
                )}
              />
            <AdminRoute
                path="/items/edit/:_id"
                user={this.props.user}
                render={props => (
                  <div className="six wide column">
                    <GameForm
                      publishers={this.state.publishers}
                      submit={this.saveGame}
                      game={
                        _find(this.state.items, {
                          _id: props.match.params._id
                        }) || {}
                      }
                    />
                  </div>
                )}
              />
            </div>

            <div className={`${numberOfcolumns} wide column`}>
              {this.state.loading ? (
                <div className="ui icon message">
                  <i className="notched circle loading icon" />
                  <div className="content">
                    <div className="header">Wait a second</div>
                    <p>Loading item collection...</p>
                  </div>
                </div>
              ) : (
                <GamesList
                  items={this.state.items}
                  toggleFeatured={this.toggleFeatured}
                  deleteGame={this.deleteGame}
                  user={this.props.user}
                />
              )}
            </div>
          </div>
        }
      </div>
    );
  }
}
GamesPage.propTypes = {
  user: PropTypes.shape(
    {
      token:PropTypes.string,
      role:PropTypes.string.isRequired
    }
  )
};
export default GamesPage;
