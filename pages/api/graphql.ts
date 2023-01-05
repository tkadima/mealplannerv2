import { ApolloServer } from 'apollo-server-micro';
import Cors from 'micro-cors'; 
import { NextApiRequest, NextApiResponse } from 'next';

import { schema } from '../../graphql/schema';
import { createContext } from '../../graphql/context';

const cors = new Cors();

const apolloServer = new ApolloServer({context: createContext, schema}); 

const startServer = apolloServer.start();

export default cors(async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'OPTIONS') {
		res.end(); 
		return false; 
	}
	await startServer;

	await apolloServer.createHandler({
		path: '/api/graphql'
	})(req, res);
});

export const config  = {
	api: {
		bodyParser: false
	}
};