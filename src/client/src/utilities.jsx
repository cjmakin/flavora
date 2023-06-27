import axios from "axios";

// User Account Functions
export const currentUser = async () => {
  try {
    const response = await axios.get("/api/users/current_user/");
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
    setUser(response.data.user);
    return response.data;
  } catch (error) {
    console.log(error);
    return response.data;
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

// Pantry Functions

export const getPantry = async () => {
  const token = localStorage.getItem("authToken");
  if (token) {
    const headers = { Authorization: `Token ${token}` };
    try {
      const response = await axios.get("/api/pantries/");
      return response.data.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
};

export const addIngredients = async (ingredients) => {
  try {
    const response = await axios.post("/api/pantries/", {
      "ingredient_ids": ingredients.map((ingredient) => ingredient.id),
    });
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
    return response;
  } catch (error) {
    console.log(error);
    return false;
  }
};

// Cookbook / Recipe Functions

export const getCookbook = async () => {
  const token = localStorage.getItem("authToken");
  if (token) {
    try {
      const response = await axios.get("/api/recipes/cookbook/");
      return response.data.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
};

export const removeRecipe = async (recipe) => {
  try {
    const response = await axios.post("/api/recipes/remove_recipe/", {
      "recipe_id": recipe.id,
    });
    return response;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getRecipe = async (recipe_id) => {
  try {
    const response = await axios.get(`/api/recipes/${recipe_id}/`);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// Create Recipe Functions

export const createRecipe = async (
  ingredients,
  food_preferences,
  cooking_time,
) => {
  try {
    const response = await axios.post("/api/recipes/create_recipe/", {
      "ingredients": ingredients,
      "food_preferences": food_preferences,
      "cooking_time": cooking_time,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const createImage = async (recipe_description) => {
  try {
    const response = await axios.post("/api/recipes/create_image/", {
      "recipe_description": recipe_description,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const saveRecipe = async (
  name,
  description,
  ingredients,
  food_preferences,
  cooking_time,
  img_url,
  instructions,
) => {
  try {
    const response = await axios.post("/api/recipes/save/", {
      "name": name,
      "description": description,
      "ingredients": ingredients,
      "food_preferences": food_preferences,
      "cooking_time": cooking_time,
      "img_url": img_url,
      "instructions": instructions,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return false;
  }
};
