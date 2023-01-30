import React from 'react';
import { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';

import apolloClient from '../lib/apollo';
import '../styles/global.css';
import Layout from '../components/layout';

const App = ({Component,  pageProps}: AppProps) => {

	return (<ApolloProvider client={apolloClient}>
		<Layout>
			<Component {...pageProps} />
		</Layout>
	</ApolloProvider>);
};
export default App;

