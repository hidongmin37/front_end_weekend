import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "utils/axios";
const initialState = {
  todos: [],
  getTodoState: {
    loading: false, //모두 초기값을 설정을 해줬다.
    done: false,
    err: null,
  },
  addTodoState: {
    loading: false, //모두 초기값을 설정을 해줬다.
    done: false,
    err: null,
  },
  deleteTodoState: {
    loading: false,
    done: false,
    err: null,
  },
  updateTodoState: {
    loading: false,
    done: false,
    err: null,
  },
  checkTodoState: {
    loading: false,
    done: false,
    err: null,
  },
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,

  extraReducers: (builder) => {
    builder.addCase(getTodo.pending, (state, action) => {
      // 로딩중이라고 생각하면 됨
      // state.todos = action.payload;
      state.getTodoState.loading = true;
      state.getTodoState.done = false;
      state.getTodoState.err = null;
    });
    builder.addCase(getTodo.fulfilled, (state, action) => {
      //thunk가 return한 값은 action.payload
      state.todos = action.payload;
      state.getTodoState.loading = false;
      state.getTodoState.done = true;
      state.getTodoState.err = null;
    });
    builder.addCase(getTodo.rejected, (state, action) => {
      // state.todos = action.payload.initialTodos;
      state.getTodoState.loading = false;
      state.getTodoState.done = true;
      state.getTodoState.err = "불러오지 못했습니다.";
    });

    builder.addCase(addTodo.pending, (state, action) => {
      // 로딩중이라고 생각하면 됨
      state.backup = [...state.todos];
      state.todos.unshift(action.meta.arg);
      state.addTodoState.loading = true;
      state.addTodoState.done = false;
      state.addTodoState.err = null;
    });
    builder.addCase(addTodo.fulfilled, (state, action) => {
      //thunk가 return한 값은 action.payload

      state.addTodoState.loading = false;
      state.addTodoState.done = true;
      state.addTodoState.err = null;
    });
    builder.addCase(addTodo.rejected, (state, action) => {
      state.todos = state.backup;
      state.backup = null;
      state.addTodoState.loading = false;
      state.addTodoState.done = true;
      state.addTodoState.err = action.payload;
    });
    //dispatch를 세번씩 나누지 않아도 자동으로 상태를 업데이트 해준다.
    //addTodo fulfilled

    builder.addCase(deleteTodo.pending, (state, action) => {
      state.backup = [...state.todos];
      state.todos = state.todos.filter((v) => v.id !== Number(action.meta.arg));
      state.deleteTodoState.loading = true;
      state.deleteTodoState.done = false;
      state.deleteTodoState.err = null;
    });
    builder.addCase(deleteTodo.fulfilled, (state, action) => {
      //thunk가 return한 값은 action.payload
      // state.todos = state.todos.filter(
      //   (v) => v.id !== Number(action.payload.id)
      // );
      state.deleteTodoState.loading = false;
      state.deleteTodoState.done = true;
      state.deleteTodoState.err = null;
    });
    builder.addCase(deleteTodo.rejected, (state, action) => {
      state.todos = state.backup;
      state.backup = null;
      state.deleteTodoState.loading = false;
      state.deleteTodoState.done = true;
      state.deleteTodoState.err = action.payload;
    });

    builder.addCase(updateTodo.pending, (state, action) => {
      console.log("로딩");
      // 로딩중이라고 생각하면 됨
      console.log(action.meta.arg);
      state.backup = [...state.todos];

      const stateCopy = state.todos.find(
        (v) => v.id === Number(action.meta.arg.id)
      );
      stateCopy.content = action.meta.arg.content;
      state.updateTodoState.loading = true;
      state.updateTodoState.done = false;
      state.updateTodoState.err = null;
    });
    builder.addCase(updateTodo.fulfilled, (state, action) => {
      //thunk가 return한 값은 action.payload\
      // console.log(action.payload.content);
      // const stateCopy = state.todos.find(
      //   (v) => v.id === Number(action.payload.id)
      // );
      // stateCopy.content = action.payload.content;
      state.updateTodoState.loading = false;
      state.updateTodoState.done = true;
      state.updateTodoState.err = null;
    });
    builder.addCase(updateTodo.rejected, (state, action) => {
      state.todos = state.backup;
      state.backup = null;
      state.updateTodoState.loading = false;
      state.updateTodoState.done = true;
      state.updateTodoState.err = action.payload;
    });

    builder.addCase(checkTodo.pending, (state, action) => {
      // 로딩중이라고 생각하면 됨
      console.log("hello");
      // state.todos.backup = state.todos;
      state.backup = [...state.todos];

      const stateCopy = state.todos.find(
        (v) => v.id === Number(action.meta.arg.id)
      );
      stateCopy.state = action.meta.arg.state;
      state.checkTodoState.loading = true;
      state.checkTodoState.done = false;
      state.checkTodoState.err = null;
    });
    builder.addCase(checkTodo.fulfilled, (state, action) => {
      //thunk가 return한 값은 action.payload
      // const stateCopy = state.todos.find(
      //   (v) => v.id === Number(action.payload.id)
      // );
      // stateCopy.state = action.payload.state;
      state.checkTodoState.loading = false;
      state.checkTodoState.done = true;
      state.checkTodoState.err = null;
    });
    builder.addCase(checkTodo.rejected, (state, action) => {
      console.log("실패");
      state.todos = state.backup;
      state.backup = null;
      state.checkTodoState.loading = false;
      state.checkTodoState.done = true;
      state.checkTodoState.err = action.payload;
    });
  },
});

export const getTodo = createAsyncThunk("todo/getTodo", async () => {
  try {
    const res = await axiosInstance.get("/todo");
    return res.data.data;
  } catch (err) {
    console.error(err);
  }
});

export const addTodo = createAsyncThunk(
  "todo/addTodo",
  async ({ title, content }) => {
    const res = await axiosInstance.post("/todo", { title, content });
    return res.data.data;
  }
);

export const deleteTodo = createAsyncThunk("todo/deleteTodo", async (id) => {
  const res = await axiosInstance.delete(`/todo/${id}`);
  return res.data.data;
});

export const updateTodo = createAsyncThunk(
  "todo/updateTodo",
  async ({ id, title, content, state }) => {
    const res = await axiosInstance.put(`/todo/${id}`, {
      title,
      content,
      state,
    });
    return res.data.data;
  }
);

export const checkTodo = createAsyncThunk(
  "todo/checkTodo",
  async ({ id, title, content, state }) => {
    const res = await axiosInstance.put(`/todo/${id}`, {
      title,
      content,
      state,
    });
    return res.data.data;
  }
);
