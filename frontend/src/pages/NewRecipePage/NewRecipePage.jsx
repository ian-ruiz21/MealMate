import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import * as recipeService from "../../services/recipeService";
import styles from "./NewRecipePage.module.css"; 

const NewRecipePage = (props) => {
  const { recipeId } = useParams();
  const ingredientInputRef = useRef(null);
  const instructionInputRef = useRef(null);

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
    setTimeout(() => {
      ingredientInputRef.current?.focus();
    }, 0); 
  };

  const removeIngredient = (index) => {
    const newIngredients = formData.ingredients.filter((_, i) => i !== index);
    setFormData({ ...formData, ingredients: newIngredients });
  };

  const addInstruction = () => {
    setFormData({ ...formData, instructions: [...formData.instructions, ""] });
    setTimeout(() => {
      instructionInputRef.current?.focus();
    }, 0);
  };

  const removeInstruction = (index) => {
    const newInstructions = formData.instructions.filter((_, i) => i !== index);
    setFormData({ ...formData, instructions: newInstructions });
  };

  
  const handleIngredientKeyDown = (e, index) => {
    if (e.key === 'Tab' && index === formData.ingredients.length - 1) {
      e.preventDefault(); 
      addIngredient();
    }
  };

  
  const handleInstructionKeyDown = (e, index) => {
    if (e.key === 'Tab' && index === formData.instructions.length - 1) {
      e.preventDefault(); 
      addInstruction();
    }
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
    <main className={styles.main}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={styles.heading}>{recipeId ? "Edit Recipe" : "New Recipe"}</h1>

        <label className={styles.label} htmlFor="title-input">Title</label>
        <input
          className={styles.input}
          required
          type="text"
          name="title"
          id="title-input"
          value={formData.title}
          onChange={handleChange}
        />

        <label className={styles.label} htmlFor="description-input">Description</label>
        <textarea
          className={styles.textarea}
          required
          name="description"
          id="description-input"
          value={formData.description}
          onChange={handleChange}
        />

        <label className={styles.label}>Ingredients</label>
        {formData.ingredients.map((ingredient, index) => (
          <div key={index} className={styles.inputContainer}>
            <input
              className={styles.input}
              ref={index === formData.ingredients.length - 1 ? ingredientInputRef : null}
              type="text"
              value={ingredient}
              onChange={(e) => handleIngredientChange(index, e.target.value)}
              onKeyDown={(e) => handleIngredientKeyDown(e, index)}
              required
            />
            <button
              className={styles.removeButton}
              type="button"
              onClick={() => removeIngredient(index)}
            >
              Remove
            </button>
          </div>
        ))}
        <button
          className={styles.addButton}
          type="button"
          onClick={addIngredient}
        >
          Add Ingredient
        </button>

        <label className={styles.label}>Instructions</label>
        {formData.instructions.map((instruction, index) => (
          <div key={index} className={styles.inputContainer}>
            <input
              className={styles.input}
              ref={index === formData.instructions.length - 1 ? instructionInputRef : null}
              value={instruction}
              onChange={(e) => handleInstructionChange(index, e.target.value)}
              onKeyDown={(e) => handleInstructionKeyDown(e, index)}
              required
            />
            <button
              className={styles.removeButton}
              type="button"
              onClick={() => removeInstruction(index)}
            >
              Remove
            </button>
          </div>
        ))}
        <button
          className={styles.addButton}
          type="button"
          onClick={addInstruction}
        >
          Add Instruction
        </button>

        <label className={styles.label} htmlFor="photo-input">Photo URL (optional)</label>
        <input
          className={styles.input}
          type="text"
          name="photo"
          id="photo-input"
          value={formData.photo}
          onChange={handleChange}
        />

        <button className={styles.submitButton} type="submit">SUBMIT</button>
      </form>
    </main>
  );
};

export default NewRecipePage;
