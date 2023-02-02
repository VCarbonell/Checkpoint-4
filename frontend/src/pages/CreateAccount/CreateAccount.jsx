/* eslint-disable import/no-unresolved */
import "./CreateAccount.css";
import logo from "@assets/logo.png";
import fakePic from "@assets/profilPicture0.png";
import FormButton from "@components/FormButton/FormButton";
import { useRef, useState } from "react";
import api from "@services/api";
import { useNavigate } from "react-router-dom";
import createData from "./createData";

function CreateAccount() {
  const inputRef = useRef();
  const [input, setInput] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const navigate = useNavigate();

  const handleInput = (e) => {
    if (e.target.name !== "confirmPassword") {
      setInput({ ...input, [e.target.name]: e.target.value });
    } else {
      setConfirmPassword(e.target.value);
    }
  };

  const handleSubmit = () => {
    if (
      inputRef.current.files.length > 0 &&
      input.username &&
      input.password &&
      input.password === confirmPassword
    ) {
      const formData = new FormData();
      formData.append("userPicture", inputRef.current.files[0]);
      formData.append("body", JSON.stringify(input));
      api
        .post("/user", formData)
        .then((res) => {
          if (res.status === 201) {
            navigate("/login");
          }
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <div className="CreateAccount">
      <div className="CreateAccount_header">
        <img src={logo} alt="Logo" />
        <p>Create your Account</p>
      </div>
      <div className="CreateAccount_form">
        {createData.map((data) =>
          data.type !== "file" ? (
            <input
              type={data.type}
              name={data.name}
              placeholder={data.placeholder}
              id={data.id}
              onChange={handleInput}
            />
          ) : (
            <label
              htmlFor={data.name}
              id={data.id}
              className="CreateAccount_form_label"
            >
              <img src={fakePic} alt="Profil" />
              <input
                type="file"
                name={data.name}
                id={data.name}
                accept="image/*"
                ref={inputRef}
              />
            </label>
          )
        )}
      </div>
      <FormButton
        content="Submit"
        myClass="CreateAccount_submit"
        myHandle={handleSubmit}
      />
    </div>
  );
}

export default CreateAccount;
