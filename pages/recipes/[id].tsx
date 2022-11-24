import { Button } from 'react-bootstrap'
import Layout from '../../components/layout'
import RecipeForm from '../../components/recipe-form'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { Recipe } from '../../types'
import React from 'react';
import axios from 'axios'
import recipes from '.'
import { GetStaticPaths } from 'next'

type PropTypes = {
  recipe: Recipe,
  recipes: Recipe[],
  setRecipes: Function,
}
export const RecipePage = ({ recipe, recipes, setRecipes } : PropTypes) => {
  const [recipeToEdit, setRecipeToEdit] = useState({ ...recipe })

  const router = useRouter()

  const handleSubmitRecipe = () => {
    try {
      let updatedRecipeList = recipes.map(r => r.id === recipeToEdit.id ? recipeToEdit : r)
      console.log('u', updatedRecipeList)
      setRecipes(updatedRecipeList)
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
export default RecipePage

export const getStaticPaths: GetStaticPaths = async() => {
  let data  = await fetch('http:localhost:3000/api/recipes')
  let recipes = await data.json(); 
  const paths = recipes.map((recipe : Recipe) => ({params: {id: recipe.id.toString()}}))
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps = async ({ params }) => {
  console.log('id', params.id)
  let data  = await fetch(`http:localhost:3000/api/recipes/${params.id}`);
  console.log('data', data)
  const recipe = await data.json()

  return {
    props: {
      recipe
    }
  }
}
