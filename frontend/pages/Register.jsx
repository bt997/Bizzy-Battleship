import { useState } from "react";
import axios from "axios";
import EntryField from "../components/EntryField";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [username, setUsernameState] = useState("");
  const [password, setPasswordState] = useState("");
  const [verifyPassword, setVerifyPasswordState] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  function updateUsername(event) {
    setUsernameState(event.target.value);
  }

  function updatePassword(event) {
    setPasswordState(event.target.value);
  }

  function updateVerifyPassword(event) {
    setVerifyPasswordState(event.target.value);
  }

  async function register() {
    const req = {
      username: username,
      password: password,
      verifyPassword: verifyPassword,
    };
    try {
      await axios.post("/api/user/register", req);
      navigate("/")
    } catch (error) {
      if (error.response && error.response.data) {
        setMessage(error.response.data);
      } else {
        setMessage("An unexpected error occurred.");
      }
    }
  }

  return (
    <>
      <h1> User Registration</h1>

      <EntryField label="Username" onChange= {updateUsername}/>
      <EntryField label="Password" onChange= {updatePassword} />
      <EntryField label="Re-Enter Password" onChange={updateVerifyPassword} />
      <Button label="Register" className="button" onClick={register} />

      <h2>{message}</h2>
    </>
  );
}
