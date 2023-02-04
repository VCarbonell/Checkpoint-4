/* eslint-disable import/no-unresolved */
import Conversation from "@pages/Conversation/Conversation";
import CreateAccount from "@pages/CreateAccount/CreateAccount";
import Home from "@pages/Home/Home";
import Login from "@pages/Login/Login";
import Users from "@pages/Users/Users";
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import { useUser } from "./context/userContext";

function App() {
  const { user } = useUser();
  const location = useLocation();

  if (!user && location.pathname !== "/createaccount") {
    return <Login />;
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/createaccount" element={<CreateAccount />} />
        <Route path="/home" element={<Home />} />
        <Route path="/conv/:id" element={<Conversation />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </div>
  );
}

export default App;
