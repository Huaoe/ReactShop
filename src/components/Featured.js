import React from "react";
import PropTypes from "prop-types";

const Featured = ({ featured, toggleFeatured, gameId }) => (
  <span>
    {featured ? (
      <a
        onClick={() => toggleFeatured(gameId)}
        className="ui right yellow corner label"
      >
        <i className="star icon" />
      </a>
    ) : (
      <a
        onClick={() => toggleFeatured(gameId)}
        className="ui right corner label"
      >
        <i className="star icon" />
      </a>
    )}
  </span>
);

Featured.propTypes = {
  featured: PropTypes.bool.isRequired,
  toggleFeatured: PropTypes.func.isRequired,
  gameId: PropTypes.string.isRequired
};

export default Featured;
