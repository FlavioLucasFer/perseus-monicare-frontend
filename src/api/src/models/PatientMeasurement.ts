import MeasurementType from "./MeasurementType";
import HTTP from "../HTTP";
import { isEmpty } from "lodash";

type ResponseData = {
	id: number,
	value: number,
	measuredAt: Date,
	status: string,
	measurement: {
		id: number,
		name: string,
	}
};

class PatientMeasurement {
	private _id: number;
	private _value: number;
	private _measuredAt: Date; 
	private _measurementType: MeasurementType;
	private _status: string;

	private constructor(attributes: object) {
		const id = attributes['ptMeasIdSec'] || 0;
		const value = attributes['value'] || '';
		const measuredAt = attributes['measuredAt'] || '';
		const measurementType = attributes['measurementType'] || '';
		const status = attributes['status'] || ''

		this.id = id;
		this.value = value;
		this.measuredAt = measuredAt;
		this.measurementType = measurementType;
		this.status = status;
	}

	public get id(): number {
		return this._id;
	}

	private set id(value: number) {
		this._id = value;
	}

	public get value(): number {
		return this._value;
	}

	public set value(value: number) {
		this._value = value;
	}

	public get measuredAt(): Date {
		return this._measuredAt;
	}

	public set measuredAt(value: Date) {
		this._measuredAt = value;
	}

	public get measurementType(): MeasurementType {
		return this._measurementType;
	}

	private set measurementType(value: MeasurementType) {
		this._measurementType = value;
	}

	public get status(): string {
		return this._status;
	}

	public set status(value: string) {
		this._status = value;
	}

	public static async all(patientId: number): Promise<Array<PatientMeasurement>> {
		try {
			const route = `patient-measurements/${patientId}`;
	
			const { data } = await HTTP.get(route);
	
			if (data.length > 0)
				data.forEach((e: any, i: number) => {
					data[i] = this.map(e);
				});
	
			return data;
		} catch (err) {
			throw err;
		}
	}

	public static async find(patientId: number, id: number): Promise<PatientMeasurement> {
		try {
			const route = `patient-measurements/${patientId}/${id}`;

			const { data } = await HTTP.get(route);

			if (!isEmpty(data))
				return this.map(data);

			return null;
		} catch (err) {
			throw err;
		}
	}

	private static map = (data: ResponseData): PatientMeasurement => {
		const measurementType = new MeasurementType({
			mtIdSec: data.measurement.id,
			name: data.measurement.name,
		});

		return new PatientMeasurement({
			ptMeasIdSec: data.id,
			value: data.value,
			measuredAt: data.measuredAt,
			status: data.status,
			measurementType,
		});
	}
};


export default PatientMeasurement;
