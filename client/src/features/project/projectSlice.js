import { createSlice } from "@reduxjs/toolkit";

export const projectSlice = createSlice({
  name: "project",
  initialState: {
    name: "project",
    id: "",
    todos: [],
    list: [],
  },
  reducers: {
    setProject(state, action) {
      state.name = action.payload.name;
      state.id = action.payload.id;
    },
    setList(state, action) {
      state.list = action.payload;
    },
    setTodos(state, action) {
      state.todos = action.payload;
    },
    addTodoList(state, action) {
      state.todos.push(action.payload);
    },
  },
});

export const {
  setProject,
  setList,
  setTodos,
  addTodoList,
} = projectSlice.actions;

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
  return fetch("/api/project/create", options)
    .then((res) => res.json())
    .then((project) => {
      dispatch(setProject(project.project));
    });
};

export const listProjects = () => (dispatch, getState) => {
  const state = getState();
  const token = state.user.token;
  const options = {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + state.user.token,
    },
  };
  return fetch("/api/project/list", options)
    .then((res) => res.json())
    .then((data) => {
      if (data.projects) {
        dispatch(setList(data.projects));
      }
    });
};

export const getProject = (project) => (dispatch, getState) => {
  const state = getState();
  const options = {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + state.user.token,
    },
    body: JSON.stringify({ project }),
  };
  return fetch("/api/todo/list", options)
    .then((res) => res.json())
    .then((data) => {
      dispatch(setProject(project));
      dispatch(setTodos(data.todos));
    });
};

export const addTodo = (todo) => (dispatch, getState) => {
  const state = getState();
  const options = {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + state.user.token,
    },
    body: JSON.stringify({ todo, project: state.project }),
  };
  return fetch("/api/todo/add", options)
    .then((res) => res.json())
    .then((data) => {
      if (!data.todo) return;
      dispatch(addTodoList(data.todo));
    });
};
export const selectProject = (state) => state.project;
export const selectProjectList = (state) => state.project.list;

export default projectSlice.reducer;
