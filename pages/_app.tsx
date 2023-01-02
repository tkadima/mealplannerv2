import React, { useEffect, useState } from 'react';
import { AppProps } from 'next/app';
import { ApolloProvider, useQuery } from '@apollo/client';

import apolloClient from '../lib/apollo';
import '../styles/global.css';
import { GET_RECIPES } from '../graphql/queries/recipe-queries';

const App = ({Component,  pageProps}: AppProps) => {
	const [recipeList, setRecipeList] = useState([]);
	const { data } = useQuery(GET_RECIPES);

	useEffect(()=> {
		setRecipeList(data.recipes);
	});
	
	return (<ApolloProvider client={apolloClient}>
		<Component {...pageProps}  recipes={recipeList}/>
	</ApolloProvider>);
};
export default App;

