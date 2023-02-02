/* eslint-disable import/no-unresolved */
import "./Login.css";
import logo from "@assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import api from "@services/api";
import FormButton from "@components/FormButton/FormButton";
import { useState } from "react";
import loginData from "./loginData";
import { useUser } from "../../context/userContext";

function Login() {
  const navigate = useNavigate();
  const [input, setInput] = useState();
  const { setUser } = useUser();

  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (input.username && input.password) {
      api
        .post("/user/login", input)
        .then((res) => {
          if (res.status === 200) {
            navigate("/home");
            setUser(res.data.user);
          }
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <div className="Login">
      <img src={logo} alt="Logo" className="Login_logo" />
      <div className="Login_form">
        {loginData.map((data) => (
          <input
            type={data.type}
            className="Login_form_input"
            placeholder={data.placeholder}
            id={data.id}
            name={data.name}
            onChange={handleInput}
          />
        ))}
      </div>
      <FormButton
        content="Login"
        myClass="Login_button"
        myHandle={handleSubmit}
      />
      <div className="Login_noaccount">
        <p>Don't have an account ?</p>
        <Link to="/createaccount">Create One !</Link>
      </div>
    </div>
  );
}

export default Login;
