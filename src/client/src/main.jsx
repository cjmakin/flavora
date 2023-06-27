import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { CreateRecipePage } from "./pages/CreateRecipePage";
import { CookbookPage } from "./pages/CookbookPage";
import { PantryPage } from "./pages/PantryPage";
import { RecipePage } from "./pages/RecipePage";
import { getCookbook, getPantry, getRecipe } from "./utilities";
import App from "./App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "create_recipe/",
        element: <CreateRecipePage />,
        loader: getPantry,
      },
      {
        path: "pantry/",
        element: <PantryPage />,
        loader: getPantry,
      },
      {
        path: "cookbook/",
        element: <CookbookPage />,
        loader: getCookbook,
      },
      {
        path: "recipes/:recipe_id/",
        element: <RecipePage />,
        loader: ({ params }) => {
          return getRecipe(params.recipe_id);
        },
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />,
);
