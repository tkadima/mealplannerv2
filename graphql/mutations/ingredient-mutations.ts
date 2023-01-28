import { gql } from '@apollo/client';

export const UPDATE_INGREDIENT_FOOD_ID = gql`
    mutation Mutation($ingredientId: Int!, $foodId: Int!) {
  updateIngredientFoodIdMutation(ingredientId: $ingredientId, foodId: $foodId) {
    id
    foodId
  }
}`; 