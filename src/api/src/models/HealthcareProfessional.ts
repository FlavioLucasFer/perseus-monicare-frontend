import HTTP from "../HTTP";
import ResourceModel from "./ResourceModel";

class HealthcareProfessional extends ResourceModel {
	private _id: number = 0;
	private _name: string = '';
	private _login: string = '';
	private _email: string = '';
	private _cpf: string = '';
	private _phone: string = '';

	constructor(id: number, name: string, login: string, email: string, cpf: string, phone: string) {
		super({
			id,
			name,
			login,
			email,
			cpf,
			phone,
		});

		this.id = id;
		this.name = name;
		this.login = login;
		this.email = email;
		this.cpf = cpf;
		this.phone = phone;
	}

	public get id(): number {
		return this._id;
	}

	private set id(id: number) {
		this._id = id;
	}

	public get name(): string {
		return this._name;
	}

	public set name(value: string) {
		this._name = value;
	}

	public get login(): string {
		return this._login;
	}

	public set login(value: string) {
		this._login = value;
	}

	public get email(): string {
		return this._email;
	}

	public set email(value: string) {
		this._email = value;
	}

	public get cpf(): string {
		return this._cpf;
	}

	public set cpf(value: string) {
		this._cpf = value;
	}

	public get phone(): string {
		return this._phone;
	}

	public set phone(value: string) {
		this._phone = value;
	}

	private toObject(): object {
		return {
			id: this.id,
			name: this.name,
			login: this.login,
			email: this.email,
			cpf: this.cpf,
			phone: this.phone,
		};
	}
	
	public static async all(): Promise<Array<HealthcareProfessional>|void> {
		try {
			const { data } = await HTTP.get('healthcare-professionals');

			data.forEach((e: any, i: number) => {
				data[i] = new HealthcareProfessional(
					e.id,
					e.user.name,
					e.user.login,
					e.email,
					e.user.cpf,
					e.user.phone,
				);
			});
			
			return data;
		} catch (err) {
			
		}
	}

	public static async find(id: number): Promise<HealthcareProfessional> {
		try {
			const { data } = await HTTP.get(`healthcare-professionals/${id}`);

			return new HealthcareProfessional(
				data.id,
				data.user.name,
				data.user.login,
				data.email,
				data.user.cpf,
				data.user.phone,
			);
		} catch (err) {
			throw err;
		}
	}

	public static async findAndUpdate(id: number, attributes: object): Promise<HealthcareProfessional> {
		try {
			const healthcareProfessional = await this.find(id);

			for (const [key, value] of Object.entries(attributes)) 
				healthcareProfessional[key] = value;
			
			return await healthcareProfessional.save();
		} catch (err) {
			throw err;
		}
	}

	public static async create(
		name: string, 
		login: string, 
		password: string, 
		email: string, 
		cpf: string, 
		phone: string,
	): Promise<HealthcareProfessional> {
		try {
			const body = {
				name,
				login,
				password,
				email,
				cpf,
				phone,
			};

			const { data } = await HTTP.post('healthcare-professionals', body);

			return new HealthcareProfessional(
				data.id,
				data.user.name,
				data.user.login,
				data.email,
				data.user.cpf,
				data.user.phone,
			);
		} catch (err) {
			throw err;
		}
	}

	public static async delete(id: number) : Promise<boolean> {
		try {
			await HTTP.delete(`healthcare-professionals/${id}`);

			return true;
		} catch (err) {
			throw err;
		}
	}

	public async save(): Promise<HealthcareProfessional> {
		try {
			const { data } = await HTTP.put(
				`healthcare-professionals/${this.id}`,
				super.diff(this.toObject()),
			);

			return new HealthcareProfessional(
				data.id,
				data.user.name,
				data.user.login,
				data.email,
				data.user.cpf,
				data.user.phone,
			);
		} catch (err) {
			throw err;
		}
	}

	public async delete(): Promise<boolean> {
		try {
			await HTTP.delete(`healthcare-professionals/${this.id}`);

			return true;
		} catch (err) {
			throw err;
		}
	}

	public isDirty(): boolean {
		return super.isDirty(this.toObject());
	}
}

export default HealthcareProfessional;
