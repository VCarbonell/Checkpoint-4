/* eslint-disable import/no-unresolved */
import api from "@services/api";
import PropTypes from "prop-types";
import { useState } from "react";
import { useUser } from "../context/userContext";

function OneMessage({ msg, displayCondition, index, conv }) {
  const { user, socket } = useUser();
  const [option, setOption] = useState(false);

  const handleOption = () => {
    setOption(!option);
  };

  const deleteMessage = () => {
    api
      .delete(`/message/${msg.messageID}`)
      .then((res) => {
        if (res.status === 200) {
          socket.emit("message", null);
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div
      id={msg.user_id !== user.id ? "message_left" : "message_right"}
      onClick={handleOption}
      onKeyDown={handleOption}
      role="none"
    >
      {option && (
        <div className="option_container">
          <p id="option">Modifier</p>
          <p
            id="option"
            onClick={deleteMessage}
            onKeyDown={deleteMessage}
            role="none"
          >
            Supprimer
          </p>
        </div>
      )}
      {msg.user_id !== user.id && displayCondition(index) && (
        <img src={conv.photo} alt="Profil" />
      )}
      <p>{msg.message}</p>
    </div>
  );
}

OneMessage.propTypes = {
  displayCondition: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  msg: PropTypes.objectOf(PropTypes.string).isRequired,
  conv: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default OneMessage;
