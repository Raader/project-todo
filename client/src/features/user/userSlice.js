import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "",
    email: "",
    id: "",
    token: "",
  },
  reducers: {
    setUser: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value = action.payload;
    },
    setToken: (state, action) => {
      state.value.token = action.payload;
    },
  },
});

export const { setUser, setToken } = userSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched

export const registerUser = (user) => (dispatch) => {
  const options = {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user }),
  };
  fetch("/api/user/register", options)
    .then((res) => res.json())
    .then((data) => {
      if (data.err) throw data.err;
      const user = data.user;
      user.token = data.token;
      dispatch(setUser(user));
    })
    .catch((err) => console.error(err));
};
// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectUser = (state) => state.user.value;

export default userSlice.reducer;
