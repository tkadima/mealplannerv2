import { gql } from '@apollo/client';

export const ADD_RECIPE = gql` 
	mutation Mutation($name: String!, $instructions: String, $prepTime: Int, $cookTime: Int, $serves: Float, $ingredients: [createIngredientInput]) {
  createRecipe(name: $name, instructions: $instructions, prepTime: $prepTime, cookTime: $cookTime, serves: $serves, ingredients: $ingredients) {
    id
  }
}
`;