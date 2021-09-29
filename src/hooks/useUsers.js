import {
  SET_USERS,
} from '/redux/types';

import { useSelector, useDispatch } from 'react-redux';
 
function useUsers() {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users);

  function setUsers(users) {
    dispatch({
      type: SET_USERS,
      users,
    });
  }

  return [users, setUsers];
};

export default useUsers;