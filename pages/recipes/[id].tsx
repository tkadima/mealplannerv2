import { Button } from 'react-bootstrap'
import Layout from '../../components/layout'
import RecipeForm from '../../components/recipe-form'
import { useDispatch } from 'react-redux'
import { editRecipe } from '../../redux/recipe-slice'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { store } from '../../store'
import { Recipe } from '../../types'
import React from 'react'


type PropTypes = {
  recipe: Recipe
}
export const RecipePage = ({ recipe } : PropTypes) => {
  const [recipeToEdit, setRecipeToEdit] = useState({ ...recipe })

  const router = useRouter()

  const dispatch = useDispatch()

  const handleSubmitRecipe = () => {
    try {
      dispatch(editRecipe(recipeToEdit))
    } catch (error) {
      console.error("Didn't work b/c ", error)
    } finally {
      // if result is 200
      router.push('/recipes')
    }
  }

  const handleChangeRecipe = (newRecipe: Recipe) => {
    setRecipeToEdit(newRecipe)
  }

  return <Layout>
        <RecipeForm recipe={recipeToEdit} onRecipeChange={handleChangeRecipe} op='edit'/>
        <div className="col text-center" style={{ paddingTop: '100px' }} >
            <Button onClick={handleSubmitRecipe} type="submit">Submit</Button>
         </div>
    </Layout>
}
export default Recipe

export const getStaticPaths = () => {
  const recipes = store.getState().recipes.recipes
  const paths = recipes.map(r => ({
    params: { id: r.id.toString() }
  }))
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps = ({ params }) => {
  const recipeData = store.getState().recipes.recipes.filter(r => r.id.toString() === params.id)[0]
  const recipe = { ...recipeData } // do I need this 
  return {
    props: {
      recipe
    }
  }
}
