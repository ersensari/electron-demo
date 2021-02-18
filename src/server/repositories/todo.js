import Todo from "../models/todo";
export default {
  queries: {
    findAll: async () => {
      return await Todo.findAll();
    }
  },
  mutations: {
    save: async payload => {
      return await Todo.create(payload);
    },
    update: async payload => {
      return await Todo.update(payload, { where: { id: payload.id } });
    },
    delete: async id => {
      await Todo.destroy({ where: { id: id } });
    }
  }
};
