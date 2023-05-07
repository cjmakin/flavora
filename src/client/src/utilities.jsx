import axios from "axios";

export const getPantry = async () => {
  const token = localStorage.getItem("authToken");
  if (token) {
    const headers = { Authorization: `Token ${token}` };
    try {
      const response = await axios.get("/api/pantries/");
      console.log(response.data);
      return response.data.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
};

export const getCookbook = async () => {
  const token = localStorage.getItem("authToken");
  if (token) {
    const headers = { Authorization: `Token ${token}` };
    try {
      const response = await axios.get("/api/recipes/cookbook/");
      console.log(response.data);
      return response.data.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
};

export const getToken = () => {
  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();

        if (cookie.substring(0, name.length + 1) === name + "=") {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }
  const csrftoken = getCookie("csrftoken");

  axios.defaults.headers.common["X-CSRFToken"] = csrftoken;
};

export const currentUser = async () => {
  try {
    const response = await axios.get("/api/users/current_user/");
    console.log(response.data);
    return response.data.user;
  } catch (error) {
    console.log(error);
  }
};

export const signIn = async (email, password, setUser) => {
  try {
    const response = await axios.post("/api/users/sign_in/", {
      "email": email,
      "password": password,
    });
    console.log(response.data.token);
    setUser(response.data.user);
    localStorage.setItem("authToken", response.data.token);
  } catch (error) {
    setUser(null);
    console.log(error);
  }
};

export const signOut = async (setUser) => {
  try {
    const response = await axios.post("/api/users/sign_out/");
    if (response.data.success) {
      console.log(response.data);
      setUser(null);
      localStorage.removeItem("authToken");
    }
  } catch (error) {
    console.log(error);
  }
};

export const createAccount = async (
  firstName,
  lastName,
  email,
  password,
  setUser,
) => {
  try {
    const response = await axios.post("/api/users/sign_up/", {
      "first_name": firstName,
      "last_name": lastName,
      "email": email,
      "password": password,
    });
    console.log(response.data);
    setUser(response.data.user);
    return response.data;
  } catch (error) {
    console.log(error);
    return response.data;
  }
};

export const createRecipe = async (
  ingredients,
  food_preferences,
  cooking_time,
) => {
  try {
    const response = await axios.post("/api/recipes/", {
      "ingredients": ingredients,
      "food_preferences": food_preferences,
      "cooking_time": cooking_time,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return response.data;
  }
};

export const addIngredients = async (ingredients) => {
  try {
    const response = await axios.post("/api/pantries/", {
      "ingredient_ids": ingredients.map((ingredient) => ingredient.id),
    });
    console.log(response.data);
    return response;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const removeIngredients = async (ingredients) => {
  try {
    const response = await axios.post("/api/pantries/remove_ingredient/", {
      "ingredient_ids": ingredients.map((ingredient) => ingredient.id),
    });
    console.log(response.data);
    return response;
  } catch (error) {
    console.log(error);
    return false;
  }
};
