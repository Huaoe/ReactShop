import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const TopNavigation = ({ isAuthenticated, logout, isAdmin }) => {
  return (
    <div className="ui secondary pointing menu">
      <NavLink exact to="/" className="item">
        Shop
      </NavLink>

      <NavLink exact to="/items" className="item">
        Items
      </NavLink>
      {isAdmin && (
        <NavLink exact to="/items/new" className="item">
          <i className="icon plus" />Add New Item
        </NavLink>
      )}
      {isAdmin && (
        <NavLink exact to="/publishers" className="item">
          <i className="icon industry" />Manage publishers
        </NavLink>
      )}
      {isAuthenticated ? (
        <div className="right menu">
          <a className="item" onClick={logout}>
            Logout
          </a>
        </div>
      ) : (
        <div className="right menu">
          <NavLink exact to="/login" className="item">
            Login
          </NavLink>
          <NavLink exact to="/signup" className="item">
            Signup
          </NavLink>
        </div>
      )}
    </div>
  );
};

TopNavigation.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired
};

export default TopNavigation;
