import { isEqual, isObject, transform } from 'lodash';

class ResourceModel {
	private initialState: object = {};
	
	constructor (initialState: object) {
		this.initialState = initialState;
	}

	protected isDirty(state: object): boolean {
		return !isEqual(state, this.initialState);
	}
	
	protected diff(object: object): object {
		return transform(object, (result: any, value: any, key: string) => {
			if (!isEqual(value, this.initialState[key])) {
				result[key] = isObject(value) && isObject(this.initialState[key]) ? this.diff(this.initialState[key]) : value;
			}
		});
	}
}

export default ResourceModel;
