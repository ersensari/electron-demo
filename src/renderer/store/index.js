import { createStore } from "vuex";
import { ipcRenderer } from "electron";
export default createStore({
  state: {
    todos: []
  },
  mutations: {
    setTodos(state, todos) {
      state.todos = todos;
    },
    addTodo(state, todo) {
      state.todos.push(todo);
    },
    updateTodo(state, todo) {
      state.todos = state.todos.map(el => (el.id === todo.id ? todo : el));
    },
    removeTodo(state, id) {
      state.todos.splice(
        state.todos.findIndex(x => x.id === id),
        1
      );
    }
  },
  actions: {
    saveTodo({ commit }, todo) {
      ipcRenderer.once("saveTodoCompleted", (_, savedTodo) => {
        commit("addTodo", savedTodo);
      });
      ipcRenderer.send("saveTodo", todo);
    },
    updateTodo({ commit }, todo) {
      ipcRenderer.once("updateTodoCompleted", () => {
        commit("updateTodo", todo);
      });
      ipcRenderer.send("updateTodo", JSON.stringify(todo));
    },

    deleteTodo({ commit }, id) {
      ipcRenderer.once("deleteTodoCompleted", () => {
        commit("removeTodo", id);
      });
      ipcRenderer.send("deleteTodo", id);
    },

    getTodos({ commit }) {
      ipcRenderer.once("getTodosCompleted", (_, todos) => {
        commit("setTodos", todos);
      });
      ipcRenderer.send("getTodos");
    }
  },
  modules: {}
});
