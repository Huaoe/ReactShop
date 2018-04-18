import React from "react";
import PropTypes from "prop-types";

const Message = ({ message }) => (
  <div //className= "ui icon message error"
    className={
      message.type === "info"
        ? "ui icon message info"
        : message.type === "success"
          ? "ui icon message success"
          : message.type === "error"
            ? "ui icon message error"
            : "ui icon message error"
    }
  >
    <i
      className={
        message.type === "info"
          ? "icon bullhorn"
          : message.type === "success"
            ? "icon hand spock outline"
            : message.type === "error" ? "icon bug " : "icon bug"
      }
    />
    <div className="content">
      <div className="header">{message.header}</div>
      <p>{message.text}</p>
    </div>
  </div>
);

Message.propTypes = {
  header: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["info", "success", "error"])
};

Message.defaultProps = {
  header: "Internal error",
  text: "Specify a correct message",
  type: "error"
};

export default Message;
