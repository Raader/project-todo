import { createSlice } from "@reduxjs/toolkit";

export const projectSlice = createSlice({
  name: "project",
  initialState: {
    name: "project",
    id: "",
    todos: [],
  },
  reducers: {
    setProject(state, action) {
      state.name = action.payload.name;
      state.id = action.payload.id;
    },
  },
});

export const { setProject } = projectSlice.actions;

export const createProject = (project) => (dispatch, getState) => {
  const state = getState();
  console.log(state);
  const options = {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + state.user.token,
    },
    body: JSON.stringify({ project }),
  };
  fetch("/api/project/create", options)
    .then((res) => res.json())
    .then((project) => {
      dispatch(setProject(project.project));
    });
};

export const listProjects = () => (dispatch, getState) => {};
export const selectProject = (state) => state.project;

export default projectSlice.reducer;
