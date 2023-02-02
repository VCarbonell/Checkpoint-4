/* eslint-disable import/no-unresolved */
import Conversation from "@pages/Conversation/Conversation";
import CreateAccount from "@pages/CreateAccount/CreateAccount";
import Home from "@pages/Home/Home";
import Login from "@pages/Login/Login";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { useUser } from "./context/userContext";

function App() {
  const { user } = useUser();

  if (!user) {
    return <Login />;
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/createaccount" element={<CreateAccount />} />
        <Route path="/home" element={<Home />} />
        <Route path="/conv/:id" element={<Conversation />} />
      </Routes>
    </div>
  );
}

export default App;
