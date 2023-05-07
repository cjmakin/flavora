import { Outlet } from "react-router-dom";
import { Header } from "./components/Header.jsx";
import { createContext, useEffect, useState } from "react";
import { currentUser, getToken } from "./utilities.jsx";
import "./App.css";

export const UserContext = createContext(null);

export const RecipeContext = createContext({
  recipe: {},
  setRecipe: () => {},
});

function App() {
  const [user, setUser] = useState(null);
  const [recipe, setRecipe] = useState({});

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
        <RecipeContext.Provider value={{ recipe, setRecipe }}>
          <Header />
          <Outlet />
        </RecipeContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
