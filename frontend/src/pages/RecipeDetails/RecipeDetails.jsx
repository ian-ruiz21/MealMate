import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import * as recipeService from "../../services/recipeService";
import CommentForm from "../CommentForm/CommentForm";
import styles from "./RecipeDetails.module.css";

const RecipeDetails = (props) => {
  const { recipeId } = useParams();

  const [recipe, setRecipe] = useState(null);

  const handleAddComment = async (commentFormData) => {
    const newComment = await recipeService.createComment(
      recipeId,
      commentFormData
    );
    setRecipe({ ...recipe, comments: [...recipe.comments, newComment] });
  };

  useEffect(() => {
    const fetchRecipe = async () => {
      const recipeData = await recipeService.show(recipeId);
      setRecipe(recipeData);
      console.log(recipeData.comments);
    };
    fetchRecipe();
  }, [recipeId]);

  if (!recipe) return <main>Loading...</main>;

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <p className={styles.category}>{recipe.category?.toUpperCase()}</p>
        <h1 className={styles.title}>{recipe.title}</h1>
        <p className={styles.author}>
          {recipe.author.name} posted on{" "}
          {new Date(recipe.createdAt).toLocaleDateString()}
        </p>
      </header>

      <p className={styles.description}>{recipe.description}</p>

      <section className={styles.ingredients}>
        <h2 className={styles.sectionTitle}>Ingredients</h2>
        <ul className={styles.ingredientList}>
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </section>

      <section className={styles.instructions}>
        <h2 className={styles.sectionTitle}>Instructions</h2>
        <ol className={styles.instructionList}>
          {recipe.instructions.map((instruction, index) => (
            <li key={index}>{instruction}</li>
          ))}
        </ol>
      </section>

      {recipe.photo && (
        <section className={styles.photoSection}>
          <h2 className={styles.sectionTitle}>Recipe Photo</h2>
          <img
            className={styles.recipePhoto}
            src={recipe.photo}
            alt={`${recipe.title} photo`}
          />
        </section>
      )}

      {recipe.author._id === props.user._id && (
        <div className={styles.actionButtons}>
          <Link to={`/recipes/${recipe._id}/edit`} className={styles.editButton}>
            Edit Recipe
          </Link>

          <button
            className={styles.deleteButton}
            onClick={() => props.handleDeleteRecipe(recipeId)}
          >
            Delete Recipe
          </button>
        </div>
      )}

      <section className={styles.comments}>
        <h2 className={styles.sectionTitle}>Comments</h2>
        {!recipe.comments.length && <p>There are no comments.</p>}

        {recipe.comments.map((comment) => (
          <article key={comment._id} className={styles.comment}>
            <header className={styles.commentHeader}>
              <p>
                {comment.author.name} posted on &nbsp;
                {new Date(comment.createdAt).toLocaleDateString()}
              </p>
            </header>
            <p>{comment.text}</p>
          </article>
        ))}
        <CommentForm handleAddComment={handleAddComment} />
      </section>
    </main>
  );
};

export default RecipeDetails;
