import React from "react";
import PropTypes from "prop-types";
import GameCard from "./GameCard";
import Message from "./Message";

const InfoBox = {
  type: "info",
  header: "There are no item in your store !",
  text: "you should add some, don't you think ?"
};

const GamesList = ({ items, toggleFeatured,  deleteGame, user}) => (
  <div className="ui four cards stackable doubling">
    {items.length === 0 ? (
      <Message message={InfoBox} />
    ) : (
      items.map(game => (
        <GameCard
          game={game}
          key={game._id}
          toggleFeatured={toggleFeatured}
          deleteGame={deleteGame}
          user={user}
        />
      ))
    )}
  </div>
);
GamesList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  toggleFeatured: PropTypes.func.isRequired,
  deleteGame: PropTypes.func.isRequired,
  user: PropTypes.shape(
    {
      token:PropTypes.string,
      role:PropTypes.string.isRequired
    }
  )
};

GamesList.defaultProps = { items: [] };

export default GamesList;
