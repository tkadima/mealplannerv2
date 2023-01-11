import { gql } from '@apollo/client';

export const UPDATE_INGREDIENT_HAVE = gql`
    mutation Mutation($ingredientIds: [Int]!) {
    updateIngredientsHave(ingredientIds: $ingredientIds)
    }
`; 