import { gql } from '@apollo/client';

export const CreateFoodMutation = gql` 
	mutation ($name: String!) {
		createFood(name: $name) {
			id 
			name
		}
	}
`;

export const UpdateFoodMutation = gql`
	mutation ($foodId: Int!, $newName: String!) {
		updateFood(foodId: $foodId, newName: $newName) {
			id
			name
		}
	}
`;

export const DeleteFoodMutation = gql`
	mutation ($foodId: Int!) { 
		deleteFood(foodId: $foodId) {
			id
			name
		}
	}
`;