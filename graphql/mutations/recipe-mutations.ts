import { gql } from '@apollo/client';

export const ADD_RECIPE = gql` 
mutation Mutation($name: String!, $instructions: String, $prepTime: Int, $cookTime: Int, $serves: Float, 
$ingredients: [ingredientInput], $requiresOven: Boolean!, $requiresStovetop: Boolean!) {
  createRecipe(name: $name, instructions: $instructions, prepTime: $prepTime, cookTime: $cookTime, serves: $serves, 
  ingredients: $ingredients, requiresOven: $requiresOven, requiresStovetop: $requiresStovetop) {
    id
  }
}
`;

export const EDIT_RECIPE = gql`
  mutation Mutation($recipeId: Int!, $newData: recipeInput!) {
    updateRecipe(recipeId: $recipeId, newData: $newData) {
      id
    }
  }
`;

export const DELETE_RECIPE = gql`
  mutation Mutation($deleteRecipeId: Int!) {
    deleteRecipe(deleteRecipeId: $deleteRecipeId) {
      id
    }
  }
`;