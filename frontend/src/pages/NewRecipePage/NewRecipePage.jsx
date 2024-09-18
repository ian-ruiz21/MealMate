import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as recipeService from "../../services/recipeService";
import "./NewRecipePage.css";

const NewRecipePage = (props) => {
  const { recipeId } = useParams();

  useEffect(() => {
    const fetchRecipe = async () => {
      const recipeData = await recipeService.show(recipeId);
      setFormData(recipeData);
    };
    if (recipeId) fetchRecipe();
  }, [recipeId]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    ingredients: [""],
    instructions: [""],
    photo: "",
  });

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...formData.ingredients];
    newIngredients[index] = value;
    setFormData({ ...formData, ingredients: newIngredients });
  };

  const handleInstructionChange = (index, value) => {
    const newInstructions = [...formData.instructions];
    newInstructions[index] = value;
    setFormData({ ...formData, instructions: newInstructions });
  };

  const addIngredient = () => {
    setFormData({ ...formData, ingredients: [...formData.ingredients, ""] });
  };

  const removeIngredient = (index) => {
    const newIngredients = formData.ingredients.filter((_, i) => i !== index);
    setFormData({ ...formData, ingredients: newIngredients });
  };

  const addInstruction = () => {
    setFormData({ ...formData, instructions: [...formData.instructions, ""] });
  };

  const removeInstruction = (index) => {
    const newInstructions = formData.instructions.filter((_, i) => i !== index);
    setFormData({ ...formData, instructions: newInstructions });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (recipeId) {
      props.handleUpdateRecipe(recipeId, formData);
    } else {
      props.handleAddRecipe(formData);
    }
  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <h1>{recipeId ? "Edit Recipe" : "New Recipe"}</h1>
        
        <label htmlFor="title-input">Title</label>
        <input
          required
          type="text"
          name="title"
          id="title-input"
          value={formData.title}
          onChange={handleChange}
        />
        
        <label htmlFor="description-input">Description</label>
        <textarea
          required
          type="text"
          name="description"
          id="description-input"
          value={formData.description}
          onChange={handleChange}
        />

        <label>Ingredients</label>
        {formData.ingredients.map((ingredient, index) => (
          <div key={index}>
            <input
              type="text"
              value={ingredient}
              onChange={(e) => handleIngredientChange(index, e.target.value)}
              required
            />
            <button type="button" onClick={() => removeIngredient(index)}>
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={addIngredient}>
          Add Ingredient
        </button>

        <label>Instructions</label>
        {formData.instructions.map((instruction, index) => (
          <div key={index}>
            <input
              value={instruction}
              onChange={(e) => handleInstructionChange(index, e.target.value)}
              required
            />
            <button type="button" onClick={() => removeInstruction(index)}>
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={addInstruction}>
          Add Instruction
        </button>

        <label htmlFor="photo-input">Photo URL (optional)</label>
        <input
          type="text"
          name="photo"
          id="photo-input"
          value={formData.photo}
          onChange={handleChange}
        />

        <button type="submit">SUBMIT</button>
      </form>
    </main>
  );
};

export default NewRecipePage;
