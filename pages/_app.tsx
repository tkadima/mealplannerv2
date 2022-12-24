import React, { useEffect, useState } from 'react';
import { Food, Recipe } from './types';
import axios from 'axios';
import { AppProps } from 'next/app';
import '../styles/global.css';
import apolloClient from '../lib/apollo';
import { ApolloProvider } from '@apollo/client';

const App = ({Component,  pageProps}: AppProps) => {
	const [recipes, setRecipes] = useState<Recipe[]>([]); 

	const getRecipes = () => {
		axios.get('/api/recipes')
			.then(res => {			
				setRecipes(res.data);
			})
			.catch(err => {
				console.error('fetching recipes resulted in error: ', err);
			});
	};


	useEffect(() => {
		getRecipes();
	}, []);

	return (<ApolloProvider client={apolloClient}>
		<Component {...pageProps}  recipes={recipes} setRecipes={setRecipes} />
	</ApolloProvider>);
};
export default App;