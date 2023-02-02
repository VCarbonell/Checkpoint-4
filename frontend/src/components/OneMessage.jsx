/* eslint-disable react/prop-types */
/* eslint-disable import/no-unresolved */
import api from "@services/api";
import { useState } from "react";
import tick from "@assets/tick-mark.png";
import { useUser } from "../context/userContext";

function OneMessage({
  msg,
  displayCondition,
  index,
  conv,
  setMessage,
  setIsModif,
  allMessage,
}) {
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

  const readCondition = () => {
    const cond = allMessage.findIndex((m) => m.user_id === user.id);
    if (index === cond && msg.isReaded === 0) {
      return 2;
    }
    if (index === cond && msg.isReaded === 1) {
      return 1;
    }
    return 0;
  };

  const modifMessage = () => {
    setMessage(msg.message);
    setIsModif(msg.messageID);
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
          <p
            id="option"
            onClick={modifMessage}
            onKeyDown={modifMessage}
            role="none"
          >
            Modifier
          </p>
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
      {msg.user_id === user.id && readCondition() === 1 && (
        <img src={conv.photo} alt="Read" className="OneMessage_read" />
      )}
      {msg.user_id === user.id && readCondition() === 2 && (
        <img src={tick} alt="Unread" className="OneMessage_unread" />
      )}
      {msg.user_id !== user.id && displayCondition(index) && (
        <img src={conv.photo} alt="Profil" />
      )}
      <p>{msg.message}</p>
    </div>
  );
}

export default OneMessage;
