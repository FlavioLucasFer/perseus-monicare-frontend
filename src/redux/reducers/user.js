import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    value: {},
  },
  reducers: {
    setUser: (state, action) => {
      state.value = action.payload;
    },
  },
});

const { setUser } = userSlice.actions;

export {
  userSlice,
  setUser,
};

export default userSlice.reducer;