import EntityModel from "./EntityModel";

type ResponseData = {
	id: number,
	email: string,
	specialty: string,
	crm: string,
	user: {
		name: string,
		login: string,
		cpf: string,
		phone: string,
	},
};

class Doctor extends EntityModel {
	protected attributes = {
		id: 0,
		name: '',
		login: '',
		email: '',
		specialty: '',
		crm: '',
		cpf: '',
		phone: '',
		password: '',
	};

	protected static resourceRoute = 'doctors';
	protected resourceRoute = 'doctors';

	public constructor(attributes: object) {
		const id = attributes['dcIdSec'] || 0;
		const name = attributes['name'] || '';
		const login = attributes['login'] || '';
		const email = attributes['email'] || '';
		const specialty = attributes['specialty'] || '';
		const crm = attributes['crm'] || '';
		const cpf = attributes['cpf'] || '';
		const phone = attributes['phone'] || '';

		super({
			id,
			name,
			login,
			email,
			specialty,
			crm,
			cpf,
			phone,
		});

		this.id = id;
		this.name = name;
		this.login = login;
		this.email = email;
		this.specialty = specialty;
		this.crm = crm;
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

	public get specialty(): string {
		return this.attributes.specialty;
	}

	public set specialty(value: string) {
		this.attributes.specialty = value;
	}

	public get crm(): string {
		return this.attributes.crm;
	}

	public set crm(value: string) {
		this.attributes.crm = value;
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

	protected static map = (data: ResponseData): Doctor => {
		return map(data);
	}
	
	protected map = (data: ResponseData): Doctor => {
		return map(data);
	}
};

function map(data: ResponseData) {
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
}

export default Doctor;
