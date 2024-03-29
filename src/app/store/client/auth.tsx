// src/service/auth.js
import { githubProvider, googleProvider, facebookProvider } from '.';

const getProvider = (name: any) => {
	switch (name) {
		case 'Google':
			return googleProvider;
		case 'Github':
			return githubProvider;
		case 'Facebook':
			return facebookProvider;
		default:
			throw new Error(`${name} is unknown provider.`);
	}
};

export { getProvider };
