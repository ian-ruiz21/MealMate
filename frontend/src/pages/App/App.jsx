import { useState, createContext, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { getUser } from "../../services/authService";
import "./App.css";
import NavBar from "../../components/NavBar/NavBar";
import HomePage from "../HomePage/HomePage";
import RecipeList from "../RecipeList/RecipeList";
import RecipeDetails from "../RecipeDetails/RecipeDetails";
import NewRecipePage from "../NewRecipePage/NewRecipePage";
import SignUpPage from "../SignUpPage/SignUpPage";
import LogInPage from "../LogInPage/LogInPage";
import * as recipeService from "../../services/recipeService";

function App() {
  const [user, setUser] = useState(getUser());

  const [recipes, setRecipes] = useState([]);

  const navigate = useNavigate();

  const handleAddRecipe = async (recipeFormData) => {
    const newRecipe = await recipeService.create(recipeFormData);
    setRecipes([newRecipe, ...recipes]);
    navigate("/recipes");
  };

  const handleDeleteRecipe = async (recipeId) => {
    const deletedRecipe = await recipeService.deleteRecipe(recipeId);
    setRecipes(recipes.filter((recipe) => recipe._id !== deletedRecipe._id));
    navigate("/recipes");
  };

  const handleUpdateRecipe = async (recipeId, recipeFormData) => {
    const updatedRecipe = await recipeService.update(recipeId, recipeFormData);

    setRecipes(recipes.map((recipe) => (recipe._id === updatedRecipe._id ? updatedRecipe : recipe)));

    navigate(`/recipes/${recipeId}`);
  }

  useEffect(() => {
    const fetchAllRecipes = async () => {
      const recipesData = await recipeService.index();
      setRecipes(recipesData);
    };
    if (user) fetchAllRecipes();
  }, [user]);

  return (
    <main id="react-app">
      <NavBar user={user} setUser={setUser} />
      <section id="main-section">
        {user ? (
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/recipes" element={<RecipeList recipes={recipes} />} />
            <Route
              path="/recipes/:recipeId"
              element={
                <RecipeDetails
                  user={user}
                  handleDeleteRecipe={handleDeleteRecipe}
                />
              }
            />
            <Route
              path="/recipes/new"
              element={<NewRecipePage handleAddRecipe={handleAddRecipe} />}
            />
            <Route path="/recipes/:recipeId/edit" element={<NewRecipePage handleUpdateRecipe={handleUpdateRecipe}/>} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LogInPage setUser={setUser} />} />
            <Route path="/signup" element={<SignUpPage setUser={setUser} />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        )}
      </section>
    </main>
  );
}

export default App;
