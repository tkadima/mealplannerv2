import { objectType } from 'nexus'; 

export const Food = objectType({
	name: 'Food',
	definition(t) {
		t.nonNull.int('id'), 
		t.nonNull.string('name'),
		t.list.string('aliases');
	}
});