import { parseIngredient } from "parse-ingredient";
var convert = require('convert-units')

const createShoppingList = (recipe, fridgeItems) => {
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

export default createShoppingList;