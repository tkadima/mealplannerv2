import React from 'react';
import Button from 'react-bootstrap/Button';
import Layout from '../../components/layout';
import SaveIngredientForm from '../../components/recipe/save-ingredient-form';
import { Ingredient } from '../../components/types';

const HandleIngredients = () => {
    const sampleIngredients = [
        { 
            description: 'milk',
            quantity: 1, 
            quantity2: null, 
            unitOfMeasure: 'cups',
            isGroupHeader: false, // filter group headers out 
            have: true
        },
        { 
            description: 'rolled oats',
            quantity: 0.5, 
            quantity2: null, 
            unitOfMeasure: 'cup',
            isGroupHeader: false, 
        },
        { 
            description: 'maple syrup',
            quantity: 2, 
            quantity2: null, 
            unitOfMeasure: 'tbsp',
            isGroupHeader: false,
            have: false
        }
    ]; 
    return (
        <Layout>

                <h3>Save the Following Ingredients?</h3>
                { 
                sampleIngredients.map((ingredient: Ingredient) => {
                    return (<SaveIngredientForm ingredient={ingredient}/>)
                })
            }
               <Button>Finish</Button>
        </Layout>
    );
}

export default HandleIngredients