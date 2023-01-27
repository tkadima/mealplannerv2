import { gql } from "@apollo/client";

export const ADD_FOOD = gql`
    mutation Mutation($name: String!, $quantity: Float!, $unitOfMeasure: String!, $calories: Int) {
    createFood(name: $name, quantity: $quantity, unitOfMeasure: $unitOfMeasure, calories: $calories) {
        id
    }
}
`;
