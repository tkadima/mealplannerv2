import { gql } from '@apollo/client';

export const GET_INGREDIENT_BY_RECIPE_ID = gql`
query Ingredient($recipeIds: [Int]!) {
  ingredient(recipeIds: $recipeIds) {
    id
    quantity
    quantity2
    unitOfMeasure
    description
    have
    isGroupHeader
  }
}`;