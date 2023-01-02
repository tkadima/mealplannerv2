import React from 'react';
import { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';

import apolloClient from '../lib/apollo';
import '../styles/global.css';

const App = ({Component,  pageProps}: AppProps) => {

	return (<ApolloProvider client={apolloClient}>
		<Component {...pageProps} />
	</ApolloProvider>);
};
export default App;

