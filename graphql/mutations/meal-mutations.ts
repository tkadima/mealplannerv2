import { gql } from '@apollo/client';

export const EDIT_MEAL= gql`
  mutation Mutation($mealId: Int!, $newRecipeIds: [Int]!, $removeRecipeIds: [Int]!) {
    updateMealRecipes(mealId: $mealId, newRecipeIds: $newRecipeIds, removeRecipeIds: $removeRecipeIds) {
      id
      recipes {
        id
        name
        ingredients {
          id
          quantity
          unitOfMeasure
          description
        }
        instructions
        prepTime
        cookTime
        serves
      }
    }
}`;

export const  CLEAR_MEAL_RECIPES = gql`
  mutation Mutation {
    clearMealRecipes {
      mealType
  }
}
`;