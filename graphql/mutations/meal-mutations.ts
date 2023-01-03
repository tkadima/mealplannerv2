import { gql } from '@apollo/client';

export const EDIT_MEAL= gql`
    mutation Mutation($mealId: Int!, $recipeIdList: [Int]!) {
        updateMealRecipes(mealId: $mealId, recipeIdList: $recipeIdList) {
            id
            recipes {
                name
            }
        }
}`;
