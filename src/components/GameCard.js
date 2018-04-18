import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Price from "./Price";
import Featured from "./Featured";
//sample img https://i.pinimg.com/564x/78/f5/53/78f55330e8819b2b692df8dfcb16d63a.jpg
class GameCard extends React.Component {
  state = {
    descriptionShown: false,
    showConfirmation: false
  };

  showConfirmation = () => this.setState({ showConfirmation: true });
  hideConfirmation = () => this.setState({ showConfirmation: false });

  componentDidMount() {
    this.setState({ descriptionShown: false });
  }

  toggleDescription(descriptionShown) {
    this.setState({ descriptionShown: !descriptionShown });
  }

  render() {
    const { game, toggleFeatured, deleteGame, user } = this.props;
    const adminActions = (
      <div className="extra content">
        {this.state.showConfirmation ? (
          <div className="ui two buttons">
            <a className="ui red basic button" onClick={() => deleteGame(game)}>
              <i className="ui icon check" />YES
            </a>
            <a className="ui grey basic button" onClick={this.hideConfirmation}>
              <i className="ui icon close" />NO
            </a>
          </div>
        ) : (
          <div className="ui two buttons">
            <Link
              to={`/items/edit/${game._id}`}
              className="ui green basic button"
            >
              <i className="ui icon edit" />
            </Link>
            <a className="ui red basic button" onClick={this.showConfirmation}>
              <i className="ui icon trash" />
            </a>
          </div>
        )}
      </div>
    );
    const addToCart = (
      <div className="extra">
        <a className="ui green basic button">Add to cart</a>
      </div>
    );

    return (
      <div className="ui link card">
        {this.state.descriptionShown ? (
          <div className="content">{game.description}</div>
        ) : (
          <div className="image">
            <Featured
              featured={game.featured}
              toggleFeatured={toggleFeatured}
              gameId={game._id}
            />
            <img src={game.thumbnail} alt="Game Cover" />
            <Price cents={game.price} />
          </div>
        )}

        <div className="extra content">
          <Link to={`/item/${game._id}`} className="header">
            {game.name}
          </Link>
          <div className="meta">
            <i className="icon users" /> {game.players} &nbsp;
            <i className="icon wait" /> {game.duration}
            <a
              className="ui floated right"
              onClick={() =>
                this.toggleDescription(this.state.descriptionShown)
              }
            >
              {this.state.descriptionShown ? (
                <i className="ui icon eye yellow right floated" />
              ) : (
                <i className="ui icon eye right floated" />
              )}
            </a>
          </div>
        </div>
        {user.token && user.role === "user" && addToCart}
        {user.token && user.role === "admin" && adminActions}
      </div>
    );
  }
}

GameCard.propTypes = {
  game: PropTypes.shape({
    name: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    players: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    duration: PropTypes.number.isRequired,
    featured: PropTypes.bool.isRequired,
    description: PropTypes.string.isRequired
  }).isRequired,
  toggleFeatured: PropTypes.func.isRequired,
  deleteGame: PropTypes.func.isRequired,
  user: PropTypes.shape({
    token: PropTypes.string,
    role: PropTypes.string.isRequired
  })
};

export default GameCard;
