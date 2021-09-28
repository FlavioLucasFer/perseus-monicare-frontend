import { isEmpty, isEqual, isObject, transform } from 'lodash';
import HTTP from '../HTTP';

type AttributesObject = {
	id: number,
};

class EntityModel {
	/**
	 * Entity attributes
	 */
	protected attributes: AttributesObject = { id: 0 };
	/**
	 * Resource route
	 */
	protected resourceRoute: string = '';
	/**
	 * Function to map api response data to some class
	 */
	protected map: any;
	/**
	 * Resource route
	 */
	protected static resourceRoute: string = '';
	/**
	 * Function to map api response data to some class
	 */
	protected static map: any;
	/**
	 * Keeps the original attributes
	 * 
	 * Used to check if attributes values has changed
	 */
	private _originalAttributes: object = {};

	constructor (attributes?: object) {
		if (attributes)
			this.originalAttributes = attributes;
	}

	protected get originalAttributes(): object {
		return this._originalAttributes;
	}

	private set originalAttributes(value: object) {
		this._originalAttributes = value;
	}

	/**
	 * Route parameters
	 * 
	 * @returns Array<string>
	 */
	private static routeParameters(): Array<string> {
		const args = [];
		let lastStartIndex = 0;
		let lastEndIndex = 0;
		const parametersQuantity = (this.resourceRoute.match(/{/g) || []).length;

		for (let i = 0; i < parametersQuantity; i++) {
			lastStartIndex = this.resourceRoute.indexOf('{', lastStartIndex);
			lastEndIndex = this.resourceRoute.indexOf('}', lastEndIndex) + 1
			
			const arg = this.resourceRoute.substring(lastStartIndex, lastEndIndex);

			lastStartIndex++;
			args.push(arg);
		}

		return args;
	}

	/**
	 * Resource route with parameters exchanged by arguments
	 * 
	 * @param args route arguments
	 * @returns string
	 */
	private static getRoute(args: Array<any>): string {
		let route = this.resourceRoute;
		const ARGS = this.routeParameters();

		for (let i = 0; i < ARGS.length; i++) {
			route = route.replace(ARGS[i], args[i]);
		}

		return route;
	}

	/**
	 * Check if attributes values has changed 
	 * 
	 * @returns boolean
	 */
	public isDirty(): boolean {
		return !isEqual(this.attributes, this.originalAttributes);
	}
	
	/**
	 * The attributes that values has changed and the new values
	 * 
	 * @returns object
	 */
	public dirty(): object {
		return transform(this.attributes, (result: any, value: any, key: string) => {
			if (!isEqual(value, this.originalAttributes[key])) {
				result[key] = isObject(value) && isObject(this.originalAttributes[key]) ? this.dirty() : value;
			}
		});
	}

	/**
	 * Restore attributes values to original values
	 * 
	 * @return void
	 */
	public restore(): void {
		for (const [key, value] of Object.entries(this.originalAttributes)) {
			this.attributes[key] = value;
		}
	}

	/**
	 * Fetch all entities
	 * 
	 * @returns Promise<Array<any>>
	 */
	public static async all(...args: any): Promise<Array<any>> {
		try {
			const route = this.getRoute(args);
			
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

	/**
	 * Fetch one entity by id
	 * 
	 * @param id number
	 * @returns Promise<any>
	 */
	public static async find(id: number, ...args: any): Promise<any> {
		try {
			const route = this.getRoute(args);

			const { data } = await HTTP.get(`${route}/${id}`);

			if (!isEmpty(data))
				return this.map(data);

			return null;
		} catch (err) {
			throw err;
		}
	}  

	/**
	 * Fetch one entity by id and update it
	 * 
	 * @param id number
	 * @param attributes object
	 * @returns Promise<any> 
	 */
	public static async findAndUpdate(id: number, attributes: object, ...args: any): Promise<any> {
		try {
			const resource = await this.find(id);

			if (!resource)
				throw new Error('Resource not found!');

			for (const [key, value] of Object.entries(attributes))
				resource[key] = value;

			return await resource.save();
		} catch (err) {
			throw err;
		}
	}

	/**
	 * Create new entity
	 * 
	 * @param body object
	 * @returns Promise<any>
	 */
	public static async create(body: object, ...args: any): Promise<any> {
		try {
			const route = this.getRoute(args);

			const { data } = await HTTP.post(route, body);

			return this.map(data);
		} catch (err) {
			throw err;
		}
	}

	/**
	 * Delete one entity by id
	 * 
	 * @param id number
	 * @returns Promise<boolean>
	 */
	public static async delete(id: number, ...args: any): Promise<boolean> {
		try {
			const route = this.getRoute(args);

			await HTTP.delete(`${route}/${id}`);

			return true;
		} catch (err) {
			throw err;
		}
	}

	private async create(body: object): Promise<any> {
		try {
			const { data } = await HTTP.post(this.resourceRoute, body);

			return this.map(data);
		} catch (err) {
			throw err;
		}
	}

	/**
	 * If instance is a new entity, then create it. Else, update it 
	 * 
	 * @returns Promise<any>
	 */
	public async save(): Promise<any> {
		try {
			if (!this.attributes.id) {
				return await this.create(this.attributes);
			}

			const { data } = await HTTP.put(
				`${this.resourceRoute}/${this.attributes.id}`,
				this.dirty(),
			);

			return this.map(data);
		} catch (err) {
			throw err;
		}
	}

	/**
	 * Delete instantiated entity
	 * 
	 * @returns Promise<boolean>
	 */
	public async delete(): Promise<boolean> {
		try {
			await HTTP.delete(`${this.resourceRoute}/${this.attributes.id}`);

			return true;
		} catch (err) {
			throw err;
		}
	}
}

export default EntityModel;
