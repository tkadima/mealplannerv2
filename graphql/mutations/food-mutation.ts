import { gql } from "@apollo/client";

export const ADD_FOOD = gql`
    mutation Mutation($ingredientId: Int!, $newData: createFoodInput!) {
    createFood(ingredientId: $ingredientId, newData: $newData) {
        id,
        ingredients {
            id
        }
    }
}`;
