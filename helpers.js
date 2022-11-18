import { parseIngredient } from "parse-ingredient";
import { convert } from 'convert-units';

export const createShoppingList = (recipe, fridgeItems) => {
    let ingredientList = parseIngredient(recipe.ingredients)
    let shoppingList = ingredientList.filter(ingredient =>  { 
        return !fridgeItems.some( f =>  f.name === ingredient.description 
            && haveEnoughItemInFridge(ingredient, f))
    });
    return shoppingList;
}

const haveEnoughItemInFridge = (ingredient, fridgeItem) => {
    if (ingredient.unitOfMeasure === fridgeItem.unit) {
        return fridgeItem.quantity >= ingredient.quantity;
    }
    else {
        let ingredientQuantity = convert(ingredient.quantity).from(ingredient.unitOfMeasure).to(fridgeItem.unit);
        return fridgeItem.quantity >= ingredientQuantity;
    }
}

export const normalizeIngredients = (ingredients) => {
    let ingredientLines = ingredients.map(ingredient => {
        let unit = ingredient.unitOfMeasure === null ? '' : ingredient.unitOfMeasure;
        return`${ingredient.quantity} ${unit} ${ingredient.ingredient}\n`
    })
    return  ingredientLines.join('')
}

