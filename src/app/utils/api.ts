// utils/api.ts
import axios, { AxiosResponse } from 'axios';

type apiConfig = {
	url: string;
	params?: object;
	data?: object;
	headers?: object;
	options?: any;
	body?: string;
};

const api = {
	get: async function ({
		url,
		params,
		headers,
	}: apiConfig): Promise<AxiosResponse> {
		try {
			const response = await axios.get(url, { params, headers });
			return response;
		} catch (error) {
			throw error;
		}
	},

	post: async function ({
		url,
		data,
		headers,
	}: apiConfig): Promise<AxiosResponse> {
		try {
			const response = await axios.post(url, data, { headers });
			return response;
		} catch (error) {
			throw error;
		}
	},
};

const get = api.get;
const post = api.post;

export { get, post };
