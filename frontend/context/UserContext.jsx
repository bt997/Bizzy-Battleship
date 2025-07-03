import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(undefined);

  async function retrieveUserData() {
    try {
      const response = await axios.get("/api/user/isLoggedIn");
      const username = response.data.username;
      if (username) {
        setUser(username);
      } else {
        setUser(undefined);
      }
    } catch (error) {
      console.error("Failed to fetch user", error);
      setUser(undefined);
    }
  }

  useEffect(() => {
    retrieveUserData(); 
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, retrieveUserData }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
