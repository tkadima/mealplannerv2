import { gql } from "@apollo/client";

export const ADD_FOOD = gql`
    mutation Mutation($ingredientId: Int, $newData: foodInput!) {
    createFood(ingredientId: $ingredientId, newData: $newData) {
        id,
        ingredients {
            id
        }
    }
}`;

export const UPDATE_FOOD = gql`
    mutation Mutation($foodId: Int!, $newData: foodInput!) {
        updateFood(foodId: $foodId, newData: $newData) {
            id
        }
    }
`;

export const DELETE_FOOD = gql`
    mutation Mutation($deleteFoodId: Int!) {
    deleteFood(deleteFoodId: $deleteFoodId) {
        id
        name
    }
    }
`;
