import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import * as recipeService from "../../services/recipeService";
import CommentForm from "../CommentForm/CommentForm";

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
    <main>
      <header>
        <p>{recipe.category?.toUpperCase()}</p>
        <h1>{recipe.title}</h1>
        <p>
          {recipe.author.name} posted on{" "}
          {new Date(recipe.createdAt).toLocaleDateString()}
        </p>
      </header>
      <p>{recipe.description}</p>
      <section>
        <h2>Ingredients</h2>
        <ul>
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </section>
      <section>
        <h2>Instructions</h2>
        <ol>
          {recipe.instructions.map((instruction, index) => (
            <li key={index}>{instruction}</li>
          ))}
        </ol>
      </section>
      {recipe.photo && (
        <section>
          <h2>Recipe Photo</h2>
          <img src={recipe.photo} alt={`${recipe.title} photo`} />
        </section>
      )}
      {recipe.author._id === props.user._id && (
        <>
          <Link to={`/recipes/${recipe._id}/edit`}>Edit Recipe</Link>

          <button onClick={() => props.handleDeleteRecipe(recipeId)}>
            Delete Recipe
          </button>
        </>
      )}
      <section>
        <h2>Comments</h2>
        {!recipe.comments.length && <p>There are no comments.</p>}
      
        {recipe.comments.map((comment) => (
          <article key={comment._id}>
            <header>
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
