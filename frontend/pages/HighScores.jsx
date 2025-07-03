import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../context/UserContext";
import "../styles/button.css";
import "../styles/highScores.css";


function HighScores() {
  const [users, setUsers] = useState([]);
  const { user} = useUser();

  useEffect(() => {
    async function retrieveHighScores() {
      const res = await axios.get("/api/user/highScores");
      setUsers(res.data); 
    }

    retrieveHighScores();
  }, []);

  function checkUserFormatting(username){
    return user === username ? "currUser" : "";
  }

  function output(){
    return(
      <>
      {users.map((user, index) => (
        <h2 key={index} className ={checkUserFormatting(user.username)}>
          {index + 1}. {user.username} -- Wins: {user.wins} -- Losses: {user.losses}
        </h2>
      ))}
      </>
    )
  }

  return (
    <div>
      <h1> High Scores </h1>
      {output()}
    </div>
  );
}

export default HighScores;
