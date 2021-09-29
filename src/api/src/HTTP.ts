import { API_URL } from "./config";

let accessToken: string|null = null;

class HTTP {
	public static async get(route: string): Promise<any> {
		const headers = {
			'Authorization': `Bearer ${accessToken}`,
		};

		const requestOptions = {
			method: 'GET',
			headers,
		};

		try {
			const res = await fetch(`${API_URL}/${route}`, requestOptions);
			return await res.json();
		} catch (err) {
			throw err;
		}
	}

	public static async post(route: string, body: object|void): Promise<any> {
		const headers = {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${accessToken}`,
		}

		const requestOptions = {
			method: 'POST',
			headers,
			body: JSON.stringify(body),
		};

		try {
			const res = await fetch(`${API_URL}/${route}`, requestOptions);
			const { data } = await res.clone().json();

			if (data?.accessToken)
				accessToken = data.accessToken;

			if (route === 'auth/logout')
				accessToken = null;

			return await res.json();
		} catch (err) {
			throw err;
		}
	}

	public static async put(route: string, body: object): Promise<any> {
		const headers = {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${accessToken}`,
		}

		const requestOptions = {
			method: 'PUT',
			headers,
			body: JSON.stringify(body),
		};

		try {
			const res = await fetch(`${API_URL}/${route}`, requestOptions);

			return await res.json();
		} catch (err) {
			throw err;
		}
	}

	static async delete(route: string): Promise<any> {
		const headers = {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${accessToken}`,
		}

		const requestOptions = {
			method: 'DELETE',
			headers,
		};

		try {
			const res = await fetch(`${API_URL}/${route}`, requestOptions);
			return await res.json();
		} catch (err) {
			throw err;
		}
	}

};

export default HTTP;
