import { gql } from '@apollo/client';

export const GET_RECIPES = gql`
    query Query {
    recipe {
        id
        name
        ingredients {
            id
            quantity
            unitOfMeasure
        }
        instructions
        prepTime
        serves
        cookTime
    }
    }
`;