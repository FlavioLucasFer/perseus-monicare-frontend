import HTTP from "../HTTP";
import HealthcareProfessional from "./HealthcareProfessional";

class Auth {
	public static async login(login: string, password: string): Promise<object> {
		try {
			const { data } = await HTTP.post('auth/login', { login, password });

			return data;
		} catch (err) {
			throw err;
		}		
	}

	public static async loggedUser()
		: Promise<HealthcareProfessional> {
		try {
			const { data } = await HTTP.post('auth/me');

			switch (data.type) {
				case 'HP':
					return new HealthcareProfessional(
						data.id,
						data.user.name,
						data.user.login,
						data.email,
						data.user.cpf,
						data.user.phone,
					);

				default:
					throw new Error('Unexpected internal error.');
			}

		} catch (err) {
			throw err;
		}
	}

	public static async refreshToken(): Promise<object> {
		try {
			const { data } = await HTTP.post('auth/refresh');

			return data;
		} catch (err) {
			throw err;
		}
	}

	public static async logout(): Promise<object> {
		try {
			const { data } = await HTTP.post('auth/logout');

			return data;
		} catch (err) {
			throw err;
		}
	}
};

export default Auth;
