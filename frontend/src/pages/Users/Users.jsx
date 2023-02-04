/* eslint-disable import/no-unresolved */
import Header from "@components/Header/Header";
import Navbar from "@components/Navbar/Navbar";
import OneUser from "@components/OneUser/OneUser";
import SearchBar from "@components/SearchBar/SearchBar";
import api from "@services/api";
import { useEffect, useState } from "react";
import { useUser } from "../../context/userContext";
import "./Users.css";

function Users() {
  const [research, setReasearch] = useState("");
  const [allUsers, setAllUsers] = useState();
  const { user, socket } = useUser();

  const getUser = () => {
    api
      .get("/user")
      .then((res) => setAllUsers(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    socket.on("connexion", () => {
      getUser();
    });
  }, [socket]);

  return (
    <div className="Users">
      <Header content="Users" />
      <SearchBar setResearch={setReasearch} />
      <div className="Users_container">
        {allUsers &&
          allUsers
            .filter(
              (check) =>
                check.username.toLowerCase().includes(research.toLowerCase()) &&
                check.username !== user.username
            )
            .map((userr) => <OneUser myUser={userr} />)}
      </div>
      <Navbar />
    </div>
  );
}

export default Users;
