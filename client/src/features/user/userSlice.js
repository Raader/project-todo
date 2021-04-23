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
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.id = action.payload.id;
      state.token = action.payload.token;
    },
    setToken: (state, action) => {
      state.token = action.payload;
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
  return fetch("/api/user/register", options)
    .then((res) => res.json())
    .then((data) => {
      if (data.err) throw data.err;
      const user = data.user;
      user.token = data.token;
      dispatch(setUser(user));
      localStorage.setItem("token", data.token);
    });
};

export const loginUser = (user) => (dispatch) => {
  const options = {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user }),
  };
  console.log(user);
  return fetch("/api/user/login", options)
    .then((res) => res.json())
    .then((data) => {
      if (data.err) throw data.err;
      const user = data.user;
      user.token = data.token;
      dispatch(setUser(user));
      console.log(data.token);
      localStorage.setItem("token", data.token);
    });
};

export const getUser = (token) => (dispatch) => {
  const options = {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  return fetch("/api/user", options)
    .then((res) => res.json())
    .then((data) => {
      if (data.err) throw data.err;
      if (!data.user) return;
      const user = data.user;
      user.token = token;
      dispatch(setUser(user));
    });
};

export const logoutUser = () => (dispatch) => {
  dispatch(
    setUser({
      name: "",
      email: "",
      id: "",
      token: "",
    })
  );
  localStorage.setItem("token", "");
};
// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectUser = (state) => state.user;

export default userSlice.reducer;
