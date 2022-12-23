import { PrismaClient } from '@prisma/client';
import prisma from '../lib/prisma';

export type Context = { 
    prisma: PrismaClient
}

export async function createContext(req: object, res: object): Promise<Context> {
	return {
		prisma
	};
}