import EntityModel from "./EntityModel";
import Patient from "./Patient";

type ResponseData = {
	id: number,
	email: string | null,
	birthDate: Date,
	kinship: string,
	user: {
		name: string,
		login: string,
		cpf: string,
		phone: string,
	},
	patient: {
		id: number,
		email: string | null,
		birthDate: Date,
		user: {
			name: string,
			login: string,
			cpf: string,
			phone: string,
		},
	},
};

class Caregiver extends EntityModel {
	protected attributes = {
		id: 0,
		name: '',
		login: '',
		email: '',
		birthDate: undefined,
		kinship: '',
		cpf: '',
		phone: '',
		password: '',
	};

	private _patient: Patient|null = null; 

	protected static resourceRoute = 'caregivers';
	protected resourceRoute = 'caregivers';

	public constructor(attributes: object) {
		const id = attributes['cgIdSec'] || 0;
		const name = attributes['name'] || '';
		const login = attributes['login'] || '';
		const email = attributes['email'] || '';
		const birthDate = attributes['birthDate'] || '';
		const kinship = attributes['kinship'] || '';
		const cpf = attributes['cpf'] || '';
		const phone = attributes['phone'] || '';
		const patient = attributes['patient'] || {};

		super({
			id,
			name,
			login,
			email,
			birthDate,
			kinship,
			cpf,
			phone,
		});

		this.id = id;
		this.name = name;
		this.login = login;
		this.email = email;
		this.birthDate = birthDate;
		this.kinship = kinship;
		this.cpf = cpf;
		this.phone = phone;
		this.patient = patient;
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

	public get email(): string | null {
		return this.attributes.email;
	}

	public set email(value: string | null) {
		this.attributes.email = value;
	}

	public get birthDate(): Date {
		return this.attributes.birthDate;
	}

	public set birthDate(value: Date) {
		this.attributes.birthDate = value;
	}

	public get kinship(): string {
		return this.attributes.kinship;
	}

	public set kinship(value: string) {
		this.attributes.kinship = value;
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

	public get patient(): Patient|null {
		return this._patient;
	}

	private set patient(value: Patient|null) {
		this._patient = value;
	}

	protected static map = (data: ResponseData): Caregiver => {
		return map(data);
	}

	protected map = (data: ResponseData): Caregiver => {
		return map(data);
	}
};

function map(data: ResponseData): Caregiver {
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
}

export default Caregiver;
