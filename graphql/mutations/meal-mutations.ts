import { gql } from '@apollo/client';

export const EDIT_MEAL= gql`
  mutation Mutation($mealId: Int!, $newRecipeIds: [Int]!, $removeRecipeIds: [Int]!) {
    updateMealRecipes(mealId: $mealId, newRecipeIds: $newRecipeIds, removeRecipeIds: $removeRecipeIds) {
      recipes {
        id
        ingredients {
          id
          quantity
          quantity2
          unitOfMeasure
          isGroupHeader
          description
        }
        instructions
        name
        prepTime
        requiresOven
        requiresStovetop
        serves
        cookTime
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