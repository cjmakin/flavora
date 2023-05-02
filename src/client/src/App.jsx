import { Outlet } from "react-router-dom";
import { Header } from "./components/Header.jsx";
import { createContext, useEffect, useState } from "react";
import { currentUser, getToken } from "./utilities.jsx";
import "./App.css";

export const UserContext = createContext(null);

function App() {
  const [user, setUser] = useState(null);

  getToken();

  useEffect(() => {
    const getCurrentUser = async () => {
      setUser(await currentUser());
    };
    getCurrentUser();
  }, []);

  return (
    <div className="App">
      <UserContext.Provider value={{ user, setUser }}>
        <Header />
        <Outlet />
      </UserContext.Provider>
    </div>
  );
}

export default App;
