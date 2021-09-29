import EntityModel from "./EntityModel";

type ResponseData = {
	id: number,
	name: string,
};

class MeasurementType extends EntityModel {
	protected attributes = {
		id: 0,
		name: '',
	};

	protected static resourceRoute = 'measurement-types';
	protected resourceRoute = 'measurement-types';

	public constructor(attributes: object = {}) {
		const id = attributes['mtIdSec'] || 0;
		const name = attributes['name'] || '';

		super({
			id,
			name,
		});

		this.id = id;
		this.name = name;
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

	protected static map = (data: ResponseData): MeasurementType => {
		return map(data);
	}

	protected map = (data: ResponseData): MeasurementType => {
		return map(data);
	}
};

function map(data: ResponseData): MeasurementType {
	return new MeasurementType({
		mtIdSec: data.id,
		name: data.name,
	});
}

export default MeasurementType;
