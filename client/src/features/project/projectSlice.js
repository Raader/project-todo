import { createSlice } from "@reduxjs/toolkit";

export const projectSlice = createSlice({
  name: "project",
  initialState: {
    current: { name: "", id: "", todos: [] },
    list: [],
    selected: { name: "", description: "", id: "" },
  },
  reducers: {
    setProject: (state, action) => {
      state.current = action.payload;
    },
    setList: (state, action) => {
      state.list = action.payload;
    },
    setTodos: (state, action) => {
      state.current.todos = action.payload;
    },
    addTodoList: (state, action) => {
      state.current.todos.push(action.payload);
    },
    editTodo: (state, action) => {
      const todo = state.current.todos.find(
        (val) => val.id === action.payload.id
      );
      if (!todo) return;
      if (action.payload.name) todo.name = action.payload.name;
      if (action.payload.id) todo.id = action.payload.id;
      if (action.payload.completed !== undefined)
        todo.completed = action.payload.completed;
      if (action.payload.description)
        todo.description = action.payload.description;
      if (action.payload.stats) {
        todo.stats.importance = action.payload.stats.importance;
        todo.stats.time = action.payload.stats.time;
        todo.stats.difficulty = action.payload.stats.difficulty;
      }
      if (action.payload.completed_date) {
        todo.completed_date = action.payload.completed_date;
      }
    },
    setSelectedTodo: (state, action) => {
      state.selected = action.payload;
    },
    removeTodo: (state, action) => {
      const todo = state.current.todos.find(
        (val) => val.id === action.payload.id
      );
      if (!todo) return;
      state.current.todos.splice(state.current.todos.indexOf(todo), 1);
    },
  },
});

export const {
  setProject,
  setList,
  setTodos,
  addTodoList,
  editTodo,
  setSelectedTodo,
  removeTodo,
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
      project.current.todos = [];
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
    body: JSON.stringify({ todo, project: state.project.current }),
  };
  return fetch("/api/todo/add", options)
    .then((res) => res.json())
    .then((data) => {
      if (!data.todo) return;
      dispatch(addTodoList(data.todo));
    });
};

export const completeTodo = (todo) => (dispatch, getState) => {
  const state = getState();
  const options = {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + state.user.token,
    },
    body: JSON.stringify({ todo, project: state.project.current }),
  };
  const c = !todo.completed;
  dispatch(editTodo({ id: todo.id, completed: c }));
  return fetch("/api/todo/complete", options)
    .then((res) => res.json())
    .then((data) => {
      if (!data.todo) return;
      dispatch(editTodo(data.todo));
    });
};

export const editTodoCloud = (todo) => (dispatch, getState) => {
  const state = getState();
  const options = {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + state.user.token,
    },
    body: JSON.stringify({ todo, project: state.project.current }),
  };
  dispatch(editTodo(todo));
  return fetch("/api/todo/edit", options)
    .then((res) => res.json())
    .then((data) => {
      if (!data.todo) return;
      dispatch(editTodo(data.todo));
    });
};

export const deleteTodo = (todo) => (dispatch, getState) => {
  const state = getState();
  const options = {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + state.user.token,
    },
    body: JSON.stringify({ todo, project: state.project.current }),
  };
  dispatch(setSelectedTodo({ name: "", description: "" }));
  return fetch("/api/todo/remove", options)
    .then((res) => res.json())
    .then((data) => {
      dispatch(removeTodo(todo));
    });
};
export const selectProject = (state) => state.project.current;
export const selectProjectList = (state) => state.project.list;

export const selectCurrentTodo = (state) => state.project.selected;

export default projectSlice.reducer;
