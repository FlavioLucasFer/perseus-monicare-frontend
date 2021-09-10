import {
  SET_USERS,
} from './types';

import initialState from './initialState';

const setUsers = (state, users) => {
  return [
    ...state,
    users,
  ];
}

const reducer = (state = initialState, action) => {

  switch (action.type) {
    case SET_USERS:
      setUsers(state, action.users);
      
    default:
      return state;
  }
};

export default reducer;