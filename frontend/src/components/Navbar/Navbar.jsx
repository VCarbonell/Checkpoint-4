/* eslint-disable import/no-unresolved */
import PropTypes from "prop-types";
import "./Navbar.css";
import chat from "@assets/chat.png";
import chatActive from "@assets/chatActive.png";
import user from "@assets/user.png";
import userActive from "@assets/userActive.png";
import { useNavigate } from "react-router-dom";

function Navbar({ isChat }) {
  const navigate = useNavigate();

  const goUser = () => {
    navigate("/users");
  };

  const goChat = () => {
    navigate("/home");
  };

  return (
    <div className="Navbar">
      <div
        className="Navbar_chat"
        onClick={goChat}
        onKeyDown={goChat}
        role="none"
      >
        <img src={isChat ? chatActive : chat} alt="chat" />
        <p id={isChat ? "Navbar_blue" : ""}>Discussions</p>
      </div>
      <div
        className="Navbar_user"
        onClick={goUser}
        onKeyDown={goUser}
        role="none"
      >
        <img src={isChat ? user : userActive} alt="user" />
        <p id={isChat ? "" : "Navbar_blue"}>Users</p>
      </div>
    </div>
  );
}

Navbar.propTypes = {
  isChat: PropTypes.bool.isRequired,
};

export default Navbar;
