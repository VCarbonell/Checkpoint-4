import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./HomeConv.css";

function HomeConv({ conv }) {
  return (
    <Link to={`/conv/${conv.id}`}>
      <div className="HomeConv">
        {conv.isConnected === 1 && <div className="HomeConv_online" />}
        <img src={conv.photo} alt="Profil" />
        <div className="HomeConv_info">
          <p>{conv.username}</p>
          <p>blablablabla</p>
        </div>
      </div>
    </Link>
  );
}

HomeConv.propTypes = {
  conv: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default HomeConv;
