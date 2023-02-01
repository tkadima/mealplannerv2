import { gql } from "@apollo/client";

export const ADD_FOOD = gql`
    mutation Mutation($ingredientId: Int, $newData: createFoodInput!) {
    createFood(ingredientId: $ingredientId, newData: $newData) {
        id,
        ingredients {
            id
        }
    }
}`;

export const DELETE_FOOD = gql`
    mutation Mutation($deleteFoodId: Int!) {
    deleteFood(deleteFoodId: $deleteFoodId) {
        id
        name
    }
    }
`;
