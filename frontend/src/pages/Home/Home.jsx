/* eslint-disable import/no-unresolved */
import Header from "@components/Header/Header";
import HomeConv from "@components/HomeConv/HomeConv";
import SearchBar from "@components/SearchBar/SearchBar";
import api from "@services/api";
import { useState, useEffect } from "react";
import { useUser } from "../../context/userContext";
import "./Home.css";

function Home() {
  const { user, socket } = useUser();
  const [research, setResearch] = useState("");
  const [allConv, setAllConv] = useState([]);

  const getAllConv = () => {
    api
      .get(`/conv/${user.id}`)
      .then((res) => setAllConv(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    socket.on("connexion", () => {
      getAllConv();
    });
  }, [socket, allConv]);

  useEffect(() => {
    getAllConv();
  }, []);

  return (
    <div className="Home">
      <Header content="Conversations" />
      <SearchBar setResearch={setResearch} />
      <div className="Home_conv_container">
        {allConv
          .filter((check) =>
            check.username.toLowerCase().includes(research.toLowerCase())
          )
          .map((conv) => (
            <HomeConv conv={conv} />
          ))}
      </div>
    </div>
  );
}

export default Home;
