/* eslint-disable import/no-unresolved */
import { useNavigate, useParams } from "react-router-dom";
import "./Conversation.css";
import OneMessage from "@components/OneMessage";
import { useEffect, useState } from "react";
import api from "@services/api";
import { useUser } from "../../context/userContext";

function Conversation() {
  const [allMessage, setAllMessage] = useState([]);
  const [message, setMessage] = useState("");
  const { id } = useParams();
  const [conv, setConv] = useState();
  const navigate = useNavigate();
  const { user, socket } = useUser();

  const getMessage = () => {
    api
      .get(`/message/${id}`)
      .then((res) => setAllMessage(res.data))
      .catch((err) => console.error(err));
  };

  const getConv = () => {
    api
      .get(`/conv/one/${id}?user=${user.id}`)
      .then((res) => setConv(res.data[0]))
      .catch((err) => console.error(err));
  };

  const handleMessage = (e) => {
    setMessage(e.target.value);
  };

  const sendMessage = () => {
    if (message.length > 0) {
      socket.emit("message", {
        conversation_id: conv.id,
        user_id: user.id,
        message,
        isReaded: conv.isConnected === 0 ? 0 : 1,
      });
    }
    setMessage("");
  };

  const displayCondition = (index) => {
    if (index > 0 && allMessage[index - 1].user_id === user.id) {
      return true;
    }
    if (index === 0 && allMessage[index] !== user.id) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    socket.on("connexion", () => {
      getConv();
    });
    socket.on("message", () => {
      getMessage();
    });
  }, [socket, allMessage, conv]);

  useEffect(() => {
    getMessage();
    getConv();
  }, []);

  return (
    <div className="Conversation">
      {conv && (
        <div className="Conversation_header">
          <div
            onClick={() => navigate(-1)}
            onKeyDown={() => navigate(-1)}
            role="none"
          />
          <div className="Conversation_header_picture">
            <img src={conv.photo} alt="Profil" id="header_picture" />
            {conv.isConnected === 1 && <div />}
          </div>
          <div className="Conversation_header_user">
            <p>{conv.username}</p>
            {conv.isConnected === 0 ? <p>Hors Ligne</p> : <p>En ligne</p>}
          </div>
        </div>
      )}
      {conv && (
        <div className="Conversation_message_container">
          {allMessage.map((msg, index) => {
            return (
              <OneMessage
                msg={msg}
                displayCondition={displayCondition}
                conv={conv}
                index={index}
              />
            );
          })}
        </div>
      )}
      <div className="Conversation_footer">
        <input
          type="text"
          onChange={handleMessage}
          placeholder="Aa"
          value={message}
        />
        <button type="button" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}

export default Conversation;
