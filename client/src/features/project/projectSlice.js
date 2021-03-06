import { createSlice } from "@reduxjs/toolkit";

export const projectSlice = createSlice({
  name: "project",
  initialState: {
    current: { name: "", id: "", todos: [] },
    list: [],
    syncing: false,
    loading: true,
    selected: { name: "", description: "", id: "" },
  },
  reducers: {
    setProject: (state, action) => {
      state.current = action.payload;
    },
    setList: (state, action) => {
      state.list = action.payload;
    },
    editList: (state, action) => {
      const project = action.payload;
      if (!project) return;
      const p = state.list.find((val) => val.id == project.id);
      if (!p) return;
      if (project.name) p.name = project.name;
      if (project.description) p.description = project.description;
    },
    removeFromList: (state, action) => {
      const project = action.payload;
      if (!project) return;
      state.list.splice(state.list.indexOf(project), 1);
    },
    setTodos: (state, action) => {
      state.current.todos = action.payload;
    },
    addTodoList: (state, action) => {
      state.current.todos.push(action.payload);
    },
    addSide: (state, action) => {
      state.selected.sides.push(action.payload);
    },
    editSide: (state, action) => {
      const side = action.payload;
      if (!side || !side.id || !state.selected.sides) return;
      const n = state.selected.sides.find((val) => val.id === side.id);
      if (!n) return;
      if (side.name) n.name = side.name;
      if (side.completed !== undefined) n.completed = side.completed;
    },
    removeSide: (state, action) => {
      const side = action.payload;
      if (!side || !side.id || !state.selected.sides) return;
      const n = state.selected.sides.find((val) => val.id === side.id);
      if (!n) return;
      state.selected.sides.splice(state.selected.sides.indexOf(n), 1);
    },
    setSyncing: (state, action) => {
      state.syncing = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
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
  editList,
  addSide,
  editSide,
  removeSide,
  removeFromList,
  setTodos,
  addTodoList,
  editTodo,
  setSelectedTodo,
  removeTodo,
  setSyncing,
  setLoading,
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
      if (!project.project) return;
      project.project.todos = [];
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
  dispatch(setLoading(true));
  return fetch("/api/todo/list", options)
    .then((res) => res.json())
    .then((data) => {
      dispatch(setLoading(false));
      dispatch(setProject(project));
      dispatch(setTodos(data.todos));
    });
};

export const editProject = (project) => (dispatch, getState) => {
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
  dispatch(setSyncing(true));
  dispatch(editList(project));
  return fetch("/api/project/edit", options)
    .then((res) => res.json())
    .then((data) => {
      dispatch(setSyncing(false));
      if (!data.project) return;
      dispatch(editList(data.project));
    });
};

export const deleteProject = (project) => (dispatch, getState) => {
  const state = getState();
  const options = {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + state.user.token,
    },
  };
  dispatch(setSyncing(true));
  return fetch("/api/project/remove/" + project.id, options)
    .then((res) => res.json())
    .then((data) => {
      if (data.err) return;
      dispatch(removeFromList(project));
      dispatch(setSyncing(false));
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
    body: JSON.stringify({ todo, project: { id: state.project.current.id } }),
  };
  dispatch(setSyncing(true));
  return fetch("/api/todo/add", options)
    .then((res) => res.json())
    .then((data) => {
      dispatch(setSyncing(false));
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
    body: JSON.stringify({ todo, project: { id: state.project.current.id } }),
  };
  const c = !todo.completed;
  dispatch(setSyncing(true));
  dispatch(editTodo({ id: todo.id, completed: c }));
  return fetch("/api/todo/complete", options)
    .then((res) => res.json())
    .then((data) => {
      dispatch(setSyncing(false));
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
    body: JSON.stringify({ todo, project: { id: state.project.current.id } }),
  };
  dispatch(setSyncing(true));
  dispatch(editTodo(todo));
  return fetch("/api/todo/edit", options)
    .then((res) => res.json())
    .then((data) => {
      dispatch(setSyncing(false));
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
    body: JSON.stringify({ todo, project: { id: state.project.current.id } }),
  };
  dispatch(setSyncing(true));
  dispatch(setSelectedTodo({ name: "", description: "" }));
  return fetch("/api/todo/remove", options)
    .then((res) => res.json())
    .then((data) => {
      dispatch(setSyncing(false));
      dispatch(removeTodo(todo));
    });
};

export const selectTodoCloud = (todo) => (dispatch, getState) => {
  dispatch(setSelectedTodo(todo));
  const state = getState();
  const options = {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + state.user.token,
    },
    body: JSON.stringify({ todo, project: { id: state.project.current.id } }),
  };
  return fetch("/api/side/list", options)
    .then((res) => res.json())
    .then((data) => {
      if (!data.sides) return;
      dispatch(setSelectedTodo({ sides: data.sides, ...todo }));
    });
};

export const addSideTask = (todo, side) => (dispatch, getState) => {
  const state = getState();
  const options = {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + state.user.token,
    },
    body: JSON.stringify({
      todo,
      project: { id: state.project.current.id },
      side,
    }),
  };
  return fetch("/api/side/add", options)
    .then((res) => res.json())
    .then((data) => {
      if (!data.side) return;
      dispatch(addSide(data.side));
    });
};

export const editSideTask = (todo, side) => (dispatch, getState) => {
  const state = getState();
  const options = {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + state.user.token,
    },
    body: JSON.stringify({
      todo,
      project: { id: state.project.current.id },
      side,
    }),
  };
  dispatch(setSyncing(true));
  return fetch("/api/side/edit", options)
    .then((res) => res.json())
    .then((data) => {
      dispatch(setSyncing(false));
      if (!data.side) return;
      dispatch(editSide(data.side));
    });
};

export const completeSideTask = (todo, side) => (dispatch, getState) => {
  const state = getState();
  const options = {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + state.user.token,
    },
    body: JSON.stringify({
      todo,
      project: { id: state.project.current.id },
      side,
    }),
  };
  dispatch(setSyncing(true));
  return fetch("/api/side/complete", options)
    .then((res) => res.json())
    .then((data) => {
      dispatch(setSyncing(false));
      if (!data.side) return;
      dispatch(editSide(data.side));
    });
};

export const removeSideTask = (todo, side) => (dispatch, getState) => {
  const state = getState();
  const options = {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + state.user.token,
    },
    body: JSON.stringify({
      todo,
      project: { id: state.project.current.id },
      side,
    }),
  };
  dispatch(setSyncing(true));
  return fetch("/api/side/remove", options)
    .then((res) => res.json())
    .then((data) => {
      dispatch(setSyncing(false));
      dispatch(removeSide(side));
    });
};
export const selectProject = (state) => state.project.current;
export const selectProjectList = (state) => state.project.list;
export const selectSyncing = (state) => state.project.syncing;
export const selectLoading = (state) => state.project.loading;
export const selectCurrentTodo = (state) => state.project.selected;
export const selectSideTasks = (state) => state.seleceted.sides;

export default projectSlice.reducer;
