import { parseIngredient } from "parse-ingredient";

const createShoppingList = (recipe, fridgeItems) => {
    let ingredientList = parseIngredient(recipe)
    let shoppingList = ingredientList.filter(ingredient =>  { 
        return !fridgeItems.some( f => { 
            if (f.name === ingredient.description) 
                console.log(`${ingredient.description} - ${f.unit} vs ${ingredient.unitOfMeasure}
                => ${f.unit === ingredient.unitOfMeasure}`)
            f.name === ingredient.description 
            && f.quantity >= ingredient.quantity && f.unit === ingredient.unitOfMeasure
        })
    });
    return shoppingList.map(s => s.description);
}

export default createShoppingList;