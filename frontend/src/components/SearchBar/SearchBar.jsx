/* eslint-disable import/no-unresolved */
import PropTypes from "prop-types";
import search from "@assets/search.png";
import "./SearchBar.css";

function SearchBar({ setResearch }) {
  const handleResearch = (e) => {
    setResearch(e.target.value);
  };

  return (
    <div className="SearchBar">
      <img src={search} alt="Search" />
      <input type="text" placeholder="Research" onChange={handleResearch} />
    </div>
  );
}

SearchBar.propTypes = {
  setResearch: PropTypes.func.isRequired,
};

export default SearchBar;
