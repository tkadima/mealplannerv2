import { gql } from '@apollo/client';

export const UPDATE_INGREDIENT_FOOD_ID = gql`
  mutation Mutation($ingredientId: Int!, $foodId: Int!, $attach: Boolean!) {
    updateIngredientFoodIdMutation(ingredientId: $ingredientId, foodId: $foodId, attach: $attach) {
      id
      foodId
    }
  }
`; 