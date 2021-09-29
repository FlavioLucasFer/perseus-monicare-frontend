import EntityModel from "./EntityModel";

type ResponseData = {
	id: number,
	email: string,
	user: {
		name: string,
		login: string,
		cpf: string,
		phone: string,
	},
};

class HealthcareProfessional extends EntityModel {
	protected attributes = {
		id: 0,
		name: '',
		login: '',
		email: '',
		cpf: '',
		phone: '',
		password: '',
	};

	protected static resourceRoute = 'healthcare-professionals';
	protected resourceRoute = 'healthcare-professionals';

	public constructor(attributes: object = {}) {
		const id = attributes['hpIdSec'] || 0;
		const name = attributes['name'] || '';
		const login = attributes['login'] || '';
		const email = attributes['email'] || '';
		const cpf = attributes['cpf'] || '';
		const phone = attributes['phone'] || '';

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
		return this.attributes.id;
	}

	private set id(value: number) {
		this.attributes.id = value;
	}

	public get name(): string {
		return this.attributes.name;
	}

	public set name(value: string) {
		this.attributes.name = value;
	}

	public get login(): string {
		return this.attributes.login;
	}

	public set login(value: string) {
		this.attributes.login = value;
	}

	public set password(value: string) {
		this.attributes.password = value;
	}

	public get email(): string {
		return this.attributes.email;
	}

	public set email(value: string) {
		this.attributes.email = value;
	}

	public get cpf(): string {
		return this.attributes.cpf;
	}

	public set cpf(value: string) {
		this.attributes.cpf = value;
	}

	public get phone(): string {
		return this.attributes.phone;
	}

	public set phone(value: string) {
		this.attributes.phone = value;
	}

	protected static map = (data: ResponseData): HealthcareProfessional => {
		return new HealthcareProfessional({
			hpIdSec: data.id,
			name: data.user.name,
			login: data.user.login,
			email: data.email,
			cpf: data.user.cpf,
			phone: data.user.phone,
		});
	}

	protected map = (data: ResponseData): HealthcareProfessional  => {
		return new HealthcareProfessional({
			hpIdSec: data.id,
			name: data.user.name,
			login: data.user.login,
			email: data.email,
			cpf: data.user.cpf,
			phone: data.user.phone,
		});
	}
}

export default HealthcareProfessional;
