import { Button } from 'react-bootstrap'
import Layout from '../../components/layout'
import RecipeForm from '../../components/recipe-form'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { Recipe } from '../../types'
import React from 'react';
import axios from 'axios'
import { GetStaticPaths } from 'next'

type PropTypes = {
  recipe: Recipe,
}
export const RecipePage = ({ recipe } : PropTypes) => {
  const [recipeChanges, setRecipeChanges] = useState({ ...recipe })

  const router = useRouter()

  const handleSubmitRecipe = () => {
    axios.put(`/api/recipes/${recipe.id}`, recipeChanges)
      .then(res => {
        if (res.status === 200) router.push('/recipes')

      })
      .catch(err => {
        console.error(err)
      })
  
}

  const handleChangeRecipe = (changes: any) => {
    setRecipeChanges(changes)
  }

  return <Layout>
        <RecipeForm recipe={recipe} onRecipeChange={handleChangeRecipe} />
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
  let data  = await fetch(`http:localhost:3000/api/recipes/${params.id}`);
  const recipe = await data.json() as Recipe 

  return {
    props: {
      recipe
    }
  }
}
