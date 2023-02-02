/* eslint-disable import/no-unresolved */
import PropTypes from "prop-types";
import defaultPic from "@assets/profilPicture0.png";
import { useUser } from "../../context/userContext";
import "./Header.css";

function Header({ content }) {
  const { user } = useUser();

  return (
    <div className="Header">
      <img src={user.photo ?? defaultPic} alt="Profil" />
      <p>{content}</p>
    </div>
  );
}

Header.propTypes = {
  content: PropTypes.string.isRequired,
};

export default Header;
