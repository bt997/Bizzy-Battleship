import { useState } from "react";
import axios from "axios";
import EntryField from "../components/EntryField";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";


export default function Login() {
  const [username, setUsernameState] = useState("");
  const [password, setPasswordState] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const userData = useUser();

  function updateUsername(event) {
    setUsernameState(event.target.value);
  }

  function updatePassword(event) {
    setPasswordState(event.target.value);
  }

  async function login() {
    const req = {
      username: username,
      password: password,
    };
    try {
      await axios.post("/api/user/login", req);
      await userData.retrieveUserData();
      navigate("/");

    } catch (error) {
        console.log(error)
      if (error.response && error.response.data) {
        setMessage(error.response.data);
      } else {
        setMessage("An unexpected error occurred.");
      }
    }
  }

  async function navigateToReset() {
    navigate("/reset");
  }

  return (
    <>
      <h1>User Login</h1>

      <EntryField label="Username" onChange={updateUsername} />
      <EntryField label="Password" onChange={updatePassword} />
      <Button label="Log In" className="button" onClick={login} />
      <Button label="Forgot Password" className="button" onClick={navigateToReset} />
    
       <h2>{message}</h2>
      
    </>
  );
}
