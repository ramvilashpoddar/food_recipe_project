// import { useState } from 'react';
// import { useGetUserID } from '../hooks/useGetUserID'; 
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import "./styles/create-recipe.css";
// import { useCookies } from 'react-cookie';

// export const CreateRecipe = () => {
//     const userID = useGetUserID();
//     const navigate = useNavigate();

//     const [cookies, _] = useCookies(["access_token"]);

//     const [recipe, setRecipe] = useState({
//         name: "",
//         ingredients: [],
//         description: "",
//         instructions: "",
//         imageUrl: "",
//         cookingTime: 0,
//         userOwner: userID
//     });

//     const handleChange = (event) => {
//         const {name, value} = event.target;
//         setRecipe({ ...recipe, [name]: value });
//     }

//     // function to add ingredient
//     const addIngredient = () => {
//         setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] });
//     }

//     const handleIngredientChange = (event, index) => {
//         const { value } = event.target;
//         const ingredients = recipe.ingredients;
//         ingredients[index] = value;
//         setRecipe({ ...recipe, ingredients });
//     }

//     const onSubmit = async (event) => {
//         event.preventDefault();

//         try {
//             await axios.post("http://localhost:3000/recipes", recipe, {
//                 headers: { authorization: cookies.access_token }
//             })
//             alert("Recipe Created");
//             navigate("/home")

//         } catch (error) {
//             console.log(error);
//         }
//     }

//     return (
//         <div className="container">
//             <h2 className="page-heading">Create Recipe</h2>

//             <form className='create-recipe-form' onSubmit={onSubmit}>
//                 <div className="input-details">
//                     <div className="input-box">
//                         <span className="details">Recipe Name</span>
//                         <input 
//                             id="name" 
//                             name="name" 
//                             type="text" 
//                             placeholder="Enter recipe name" 
//                             onChange={handleChange}
//                         />
//                     </div>

//                     <div className="input-box">
//                         <span className="details">Ingredients</span>

//                         {recipe.ingredients.map((ingredient, index) => (
//                             <div className='details' key={index}>
//                             <input 
//                                 type='text' 
//                                 name='ingredient' 
//                                 value={ingredient}
//                                 placeholder= {"Ingredient " + (index + 1)}
//                                 onChange={(event) => handleIngredientChange(event, index)}
//                             />
//                             </div>
//                         ))}

//                         <div className="button">
//                         <button type='button' onClick={addIngredient}>Add Ingredient</button>
//                         </div>
//                     </div>

//                     <div className="input-box">
//                         <span className="details">Mini Description</span>
//                         <input 
//                             id="description" 
//                             name="description" 
//                             type="text" 
//                             placeholder="Enter a mini description" 
//                             onChange={handleChange}
//                         />
//                     </div>

//                     <div className="input-box">
//                         <span className="details">Instructions</span>
//                         <textarea 
//                             name="instructions" 
//                             id="instructions" 
//                             cols="30" 
//                             rows="10" 
//                             placeholder="Enter the steps" 
//                             onChange={handleChange}>
//                         </textarea>
//                     </div>

//                     <div className="input-box">
//                         <span className="details">Image URL</span>
//                         <input 
//                             id="imageUrl" 
//                             name="imageUrl" 
//                             type="text" 
//                             placeholder="Copy paste the image url" 
//                             onChange={handleChange}
//                         />
//                     </div>

//                     <div className="input-box">
//                         <span className="details">Cooking Time (minutes)</span>
//                         <input 
//                             id="cookingTime" 
//                             name="cookingTime" 
//                             type="text" placeholder="Enter cooking time in minutes" 
//                             onChange={handleChange}
//                         />
//                     </div>
//                 </div>
//                 <div className="button">
//                     <button type='submit'>Create Recipe</button>
//                 </div>
//             </form>
//             <div className='spacer'>Space to the footer </div>
//         </div>
        
//     );
// }
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useGetUserID } from '../hooks/useGetUserID'; // Assuming this hook retrieves the userID
import './styles/create-recipe.css';

export const CreateRecipe = () => {
    const userID = useGetUserID(); // Custom hook to fetch user ID
    const navigate = useNavigate();
    const [cookies, _] = useCookies(['access_token']);

    const [recipe, setRecipe] = useState({
        name: '',
        ingredients: [],
        description: '',
        instructions: '',
        imageUrl: '',
        cookingTime: 0,
        userOwner: userID,
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setRecipe({ ...recipe, [name]: value });
    };

    const addIngredient = () => {
        setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ''] });
    };

    const handleIngredientChange = (event, index) => {
        const { value } = event.target;
        const updatedIngredients = [...recipe.ingredients];
        updatedIngredients[index] = value;
        setRecipe({ ...recipe, ingredients: updatedIngredients });
    };

    const onSubmit = async (event) => {
        event.preventDefault();

        try {
            await axios.post('http://localhost:3000/recipes', recipe, {
                headers: { Authorization: cookies.access_token },
            });
            alert('Recipe Created');
            navigate('/home');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-center">Create Recipe</h2>

            <form className="create-recipe-form" onSubmit={onSubmit}>
                <div className="grid grid-cols-1 gap-4">
                    <div className="input-box">
                        <label htmlFor="name" className="text-gray-700">
                            Recipe Name
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Enter recipe name"
                            className="input-field"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="input-box">
                        <label htmlFor="ingredients" className="text-gray-700">
                            Ingredients
                        </label>
                        {recipe.ingredients.map((ingredient, index) => (
                            <div key={index}>
                                <input
                                    type="text"
                                    name="ingredient"
                                    value={ingredient}
                                    placeholder={`Ingredient ${index + 1}`}
                                    className="input-field"
                                    onChange={(event) => handleIngredientChange(event, index)}
                                    required
                                />
                            </div>
                        ))}
                        <button
                            type="button"
                            className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                            onClick={addIngredient}
                        >
                            Add Ingredient
                        </button>
                    </div>

                    <div className="input-box">
                        <label htmlFor="description" className="text-gray-700">
                            Mini Description
                        </label>
                        <input
                            id="description"
                            name="description"
                            type="text"
                            placeholder="Enter a mini description"
                            className="input-field"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="input-box">
                        <label htmlFor="instructions" className="text-gray-700">
                            Instructions
                        </label>
                        <textarea
                            name="instructions"
                            id="instructions"
                            cols="30"
                            rows="5"
                            placeholder="Enter the steps"
                            className="input-field"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="input-box">
                        <label htmlFor="imageUrl" className="text-gray-700">
                            Image URL
                        </label>
                        <input
                            id="imageUrl"
                            name="imageUrl"
                            type="text"
                            placeholder="Copy paste the image URL"
                            className="input-field"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="input-box">
                        <label htmlFor="cookingTime" className="text-gray-700">
                            Cooking Time (minutes)
                        </label>
                        <input
                            id="cookingTime"
                            name="cookingTime"
                            type="number"
                            placeholder="Enter cooking time in minutes"
                            className="input-field"
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="mt-4">
                    <button
                        type="submit"
                        className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
                    >
                        Create Recipe
                    </button>
                </div>
            </form>

            <div className="spacer"></div>
        </div>
    );
};
