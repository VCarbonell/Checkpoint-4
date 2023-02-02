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
  const [isModif, setIsModif] = useState();
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

  const setActiveConv = (convID) => {
    api
      .put(`/user/${user.id}`, {
        active_conversation: convID,
      })
      .then((res) => {
        if (res.status === 200 && convID) {
          socket.emit("join", {
            conv_id: id,
            user_id: user.id,
          });
        } else if (res.status === 200) {
          socket.emit("leave", {
            conv_id: id,
            user_id: user.id,
          });
          navigate(-1);
        }
      })
      .catch((err) => console.error(err));
  };

  const handleMessage = (e) => {
    setMessage(e.target.value);
  };

  const handleNavigate = () => {
    setActiveConv(null);
  };

  const sendMessage = () => {
    if (message.length > 0 && !isModif) {
      socket.emit("message", {
        conversation_id: conv.id,
        user_id: user.id,
        message,
        isReaded: conv.active_conversation === Number(id) ? 1 : 0,
      });
      setMessage("");
    } else if (message.length > 0 && isModif) {
      api
        .put(`/message/${isModif}`, {
          message,
        })
        .then((res) => {
          if (res.status === 200) {
            socket.emit("message", null);
            setMessage("");
            setIsModif();
          }
        })
        .catch((err) => console.error(err));
    }
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
    socket.on("userjoin", (info) => {
      if (info.conv_id === id && info.user_id !== user.id) {
        api
          .put(`/message/read/${id}?user=${user.id}`, {
            isReaded: 1,
          })
          .then((res) => {
            if (res.status === 200) {
              getMessage();
              getConv();
            }
          })
          .catch((err) => console.error(err));
      }
    });
    socket.on("userleave", () => {
      getConv();
    });
  }, [socket]);

  useEffect(() => {
    getMessage();
    getConv();
    setActiveConv(id);
  }, []);
  return (
    <div className="Conversation">
      {conv && (
        <div className="Conversation_header">
          <div
            onClick={handleNavigate}
            onKeyDown={handleNavigate}
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
                setMessage={setMessage}
                setIsModif={setIsModif}
                allMessage={allMessage}
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
