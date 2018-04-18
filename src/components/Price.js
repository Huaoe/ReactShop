import React from "react";
import PropTypes from "prop-types";

const Price = ({ cents }) => (
  <span className="ui green ribbon label">$ {cents / 100} {cents < 1000 && '!'}</span>
);

Price.propTypes = {
  cents: PropTypes.number.isRequired
};

export default Price;
