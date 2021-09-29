import { Caregiver, Doctor, Patient } from "api";
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

	public static async loggedUser():
		Promise<HealthcareProfessional | Doctor | Caregiver | Patient> {
		try {
			const { data } = await HTTP.post('auth/me');

			switch (data.user.type) {
				case 'HP':
					return new HealthcareProfessional({
						hpIdSec: data.id,
						name: data.user.name,
						login: data.user.login,
						email: data.email,
						cpf: data.user.cpf,
						phone: data.user.phone,
					});

				case 'DC':
					return new Doctor({
						dcIdSec: data.id,
						name: data.user.name,
						login: data.user.login,
						email: data.email,
						specialty: data.specialty,
						crm: data.crm,
						cpf: data.user.cpf,
						phone: data.user.phone,
					});

				case 'CG':
					let patient = null;

					if (data.patient && data.patient.user) {
						patient = new Patient({
							ptIdSec: data.patient.id,
							name: data.patient.user.name,
							login: data.patient.user.login,
							email: data.patient.email,
							birthDate: data.patient.birthDate,
							cpf: data.patient.user.cpf,
							phone: data.patient.user.phone,
						});
					}

					return new Caregiver({
						cgIdSec: data.id,
						name: data.user.name,
						login: data.user.login,
						email: data.email,
						birthDate: data.birthDate,
						kinship: data.kinship,
						cpf: data.user.cpf,
						phone: data.user.phone,
						patient,
					});

				case 'PT':
					const carefivers: Array<Caregiver> = [];

					if (data.caregivers.length > 0) {
						data.caregivers.forEach(e => {
							if (!e.user)
								return;

							carefivers.push(
								new Caregiver({
									cgIdSec: e.id,
									name: e.user.name,
									login: e.user.login,
									email: e.email,
									birthDate: e.birthDate,
									kinship: e.kinship,
									cpf: e.user.cpf,
									phone: e.user.phone,
								}),
							);
						});
					}

					return new Patient({
						ptIdSec: data.id,
						name: data.user.name,
						login: data.user.login,
						email: data.email,
						birthDate: data.birthDate,
						cpf: data.user.cpf,
						phone: data.user.phone,
						carefivers,
					});

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
