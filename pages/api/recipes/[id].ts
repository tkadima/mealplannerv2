import data from '../data.json'; 

export default (req, res) => {
    const { query: {id}} = req; 
    res.json({
        ...data.recipes.find(recipe => recipe.id === parseInt(id))
    })
}