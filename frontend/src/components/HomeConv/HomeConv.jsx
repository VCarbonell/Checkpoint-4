/* eslint-disable import/no-unresolved */
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "@services/api";
import "./HomeConv.css";
import { useUser } from "../../context/userContext";

function HomeConv({ conv }) {
  const { user, socket } = useUser();
  const [message, setMessage] = useState([]);
  const [lastMsg, setLastMsg] = useState("");
  const [isRead, setIsRead] = useState(true);

  const getMessage = () => {
    api
      .get(`/message/${conv.id}`)
      .then((res) => setMessage(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getMessage();
  }, []);

  useEffect(() => {
    if (message.length > 0) {
      const find = message.findIndex((msg) => msg.user_id !== user.id);
      if (find !== -1) {
        setLastMsg(message[find].message);
        if (message[find].isReaded === 0) {
          setIsRead(false);
        }
      }
    }
  }, [message]);

  useEffect(() => {
    socket.on("message", () => {
      getMessage();
    });
  }, [socket]);

  return (
    <Link to={`/conv/${conv.id}`}>
      <div className="HomeConv">
        {conv.isConnected === 1 && <div className="HomeConv_online" />}
        <img src={conv.photo} alt="Profil" />
        <div className="HomeConv_info">
          <p>{conv.username}</p>
          <p id={isRead ? "" : "HomeConv_bold"}>{lastMsg}</p>
        </div>
      </div>
    </Link>
  );
}

HomeConv.propTypes = {
  conv: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default HomeConv;
