/* eslint-disable import/no-unresolved */
/* eslint-disable react/prop-types */
import "./OneUser.css";
import "../HomeConv/HomeConv.css";
import api from "@services/api";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/userContext";

function OneUser({ myUser }) {
  const { user, socket } = useUser();
  const navigate = useNavigate();

  const goConv = () => {
    api
      .get(`/conv/exist/${user.id}?user=${myUser.id}`)
      .then((res) => {
        if (res.data.length > 0) {
          navigate(`/conv/${res.data[0].id}`);
        } else {
          api
            .post("/conv", {
              user_one_id: user.id,
              user_two_id: myUser.id,
            })
            .then((result) => {
              if (result.status === 201) {
                socket.emit("newConv", true);
                navigate(`/conv/${result.data.id}`);
              }
            })
            .catch((err) => console.error(err));
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="OneUser" onClick={goConv} onKeyDown={goConv} role="none">
      {myUser.isConnected === 1 && <div className="OneUser_online" />}
      <img src={myUser.photo} alt="User" />
      <p>{myUser.username}</p>
    </div>
  );
}

export default OneUser;
