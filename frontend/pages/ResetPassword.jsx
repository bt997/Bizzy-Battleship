import { useState } from "react";
import axios from "axios";
import EntryField from "../components/EntryField";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";


export default function ResetPassword() {
  const [username, setUsernameState] = useState("");
  const [password, setPasswordState] = useState("");
  const [newPassword, setNewPasswordState] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const userData = useUser();

  function updateUsername(event) {
    setUsernameState(event.target.value);
  }

  function updatePassword(event) {
    setPasswordState(event.target.value);
  }

  function updateNewPassword(event) {
    setNewPasswordState(event.target.value);
  }

  async function reset() {
    const req = {
      username: username,
      password: password,
      newPassword: newPassword,
    };
    try {
      await axios.post("/api/user/reset", req);
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

  return (
    <>
      <h1>Reset Password</h1>

      <EntryField label="Username" onChange={updateUsername} />
      <EntryField label="Password" onChange={updatePassword} />
      <EntryField label="New Password" onChange={updateNewPassword} />
      <Button label="Reset Password" className="button" onClick={reset} />
    
       <h2>{message}</h2>
      
    </>
  );
}
