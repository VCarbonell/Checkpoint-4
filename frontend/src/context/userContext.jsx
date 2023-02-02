import PropTypes from "prop-types";
import { createContext, useContext, useState, useEffect } from "react";
import socketIO from "socket.io-client";

const userContext = createContext();
const socket = socketIO.connect(import.meta.env.VITE_BACKEND_URL);

function UserProvider({ children }) {
  const { Provider } = userContext;
  const [user, setUser] = useState();

  useEffect(() => {
    if (user) {
      socket.emit("connexion", user.id);
    }
  }, [user]);

  return <Provider value={{ user, setUser, socket }}>{children}</Provider>;
}

UserProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export const useUser = () => useContext(userContext);
export default UserProvider;
