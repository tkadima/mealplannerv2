import React, { useState } from 'react'; 
import Button from 'react-bootstrap/Button';
import  ButtonGroup  from 'react-bootstrap/ButtonGroup';
import Card  from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { Food, Ingredient } from '../types';
import { useForm } from 'react-hook-form';
import FoodForm from '../food/food-form';

type PropTypes = {
    ingredient: Ingredient,
    foodList: Food[],
    onSubmitFood: (food: Food, ingredientId: number) => void
    onSaveIngredientToFood: (foodId: number, ingredientId: number) => void
    completed: boolean,
    onReset: (ingredientId: number, foodId: number) => void
 }

const IngredientCard = ({ ingredient, foodList, onSubmitFood, onSaveIngredientToFood, completed, onReset }: PropTypes) => { 
   
    const [addingToPantry, setAddingToPantry] = useState(false); 
    const [savingExisting, setSavingExisting] = useState(false);

    const { register, handleSubmit } = useForm({});

     const handleSubmitForm = (formObject: object) => {
        onSubmitFood(formObject as Food, ingredient.id);
     }

     const handleSaveIngredient = (formObject: object) => {
        onSaveIngredientToFood( ingredient.id, parseInt(formObject['foodId']),);
     }

     const handleReset = (ingredientId: number, foodId: number) => {
        onReset(ingredientId, foodId)
     }

     const defaultFood = { id: null, name: ingredient.description, quantity: ingredient.quantity2 ?? 0,
         unitOfMeasure: ingredient.unitOfMeasure, calories: 0, have: false, ingredients: [] as Ingredient[] };
     

    return (<Card className='ingredient-card'>
                <Card.Title>{ingredient.description}</Card.Title>
                <Card.Body>
                    {
                        !addingToPantry && !savingExisting && !completed && <ButtonGroup>
                            <Button  onClick={() => setAddingToPantry(true)} variant="warning">Add To Pantry</Button>
                            <Button  onClick={() => setSavingExisting(true)}>Already in Pantry</Button>
                        </ButtonGroup>
                    }
                    {
                        addingToPantry && !completed && <FoodForm food={defaultFood} onSubmit={handleSubmitForm} onCancel={() => {
                            setAddingToPantry(false);
                            setSavingExisting(false);
                        }}/>
                    }

                    {
                        savingExisting && !completed && <Form onSubmit={handleSubmit(handleSaveIngredient)}>
                            <Form.Control as='select' {...register('foodId')}>
                                <option>Select food from pantry</option>
                                { foodList.map(food => {
                                    return <option key={food.id} value={food.id}>{food.name}</option>
                                })}
                            </Form.Control>
                            <Button type="submit">Save Food</Button>
                        </Form>
                    }
                    
                    
                    {
                        completed &&
                        <Button className="float-right" onClick={() => handleReset(ingredient.id, ingredient.foodId)}>Reset</Button>
                    }

                </Card.Body>
            </Card>);
}

export default IngredientCard;

