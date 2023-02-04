import PropTypes from "prop-types";
import "./FormButton.css";

function FormButton({ content, myClass, myHandle }) {
  return (
    <div
      className={`FormButton ${myClass}`}
      onClick={myHandle}
      onKeyDown={myHandle}
      role="none"
    >
      {content}
    </div>
  );
}

FormButton.propTypes = {
  content: PropTypes.string.isRequired,
  myClass: PropTypes.string.isRequired,
  myHandle: PropTypes.func.isRequired,
};

export default FormButton;
