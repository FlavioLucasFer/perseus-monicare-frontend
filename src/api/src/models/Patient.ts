import PatientMeasurement from "./PatientMeasurement";
import EntityModel from "./EntityModel";
import Caregiver from "./Caregiver";

type CaregiverT = {
	id: number,
	email: string,
	birthDate: Date,
	kinship: string,
	user: {
		name: string,
		login: string,
		cpf: string,
		phone: string,
	}
};

type ResponseData = {
	id: number,
	email: string|null,
	birthDate: Date,
	user: {
		name: string,
		login: string,
		cpf: string,
		phone: string,
	},
	caregivers: Array<CaregiverT>,
};

class Patient extends EntityModel {
	protected attributes = {
		id: 0,
		name: '',
		login: '',
		email: '',
		birthDate: undefined,
		cpf: '',
		phone: '',
		password: '',
	};

	private _caregivers: Array<Caregiver>|null = []; 
	private _measurements: Array<PatientMeasurement>|null = [];

	protected static resourceRoute = 'patients';
	protected resourceRoute = 'patients';

	public constructor(attributes: object = {}) {
		const id = attributes['ptIdSec'] || 0;
		const name = attributes['name'] || '';
		const login = attributes['login'] || '';
		const email = attributes['email'] || '';
		const birthDate = attributes['birthDate'] || '';
		const cpf = attributes['cpf'] || '';
		const phone = attributes['phone'] || '';
		const caregivers = attributes['caregivers'] || [];

		super({
			id,
			name,
			login,
			email,
			birthDate,
			cpf,
			phone,
		});

		this.id = id;
		this.name = name;
		this.login = login;
		this.email = email;
		this.birthDate = birthDate;
		this.cpf = cpf;
		this.phone = phone;
		this.caregivers = caregivers;
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

	public get email(): string|null {
		return this.attributes.email;
	}

	public set email(value: string|null) {
		this.attributes.email = value;
	}

	public get birthDate(): Date {
		return this.attributes.birthDate;
	}

	public set birthDate(value: Date) {
		this.attributes.birthDate = value;
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

	public get caregivers(): Array<Caregiver>|null {
		return this._caregivers;
	}

	private set caregivers(value: Array<Caregiver>|null) {
		this._caregivers = value;
	}

	public get measurements() {
		return this._measurements;
	}

	private set measurements(value: Array<PatientMeasurement>) {
		this._measurements = value;
	}

	public async allMeasurements(): Promise<Array<PatientMeasurement>> {
		try {
			const measurements = await PatientMeasurement.all(this.id);

			this.measurements = measurements;
			return measurements;
		} catch (err) {
			throw err;
		}
	}

	public async findMeasurement(id: number, forceDbSearch: boolean = false): Promise<PatientMeasurement> {
		try {
			if (!forceDbSearch && this.measurements.length > 0) {
				console.log('here');
				
				const measurement = this.measurements.find(e => e.id === id);
				
				if (measurement)
				return measurement;
			}
			console.log('here2');
			
			const measurement = await PatientMeasurement.find(this.id, id);

			const measurementIndex = this.measurements.findIndex(e => e.id === measurement.id);

			if (measurementIndex > -1)
				this.measurements[measurementIndex] = measurement;
			else
				this.measurements.push(measurement);

			return measurement;
		} catch (err) {
			throw err;
		}
	}

	protected static map = (data: ResponseData): Patient => {
		return map(data);
	}

	protected map = (data: ResponseData): Patient => {
		return map(data);
	}
};

function map(data: ResponseData): Patient {
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
}

export default Patient;
