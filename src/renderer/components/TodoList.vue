<template>
  <div style="margin-top: 2rem;">
    <a-input
      v-model:value="newTodo"
      style="margin-bottom: 1em;"
      @keyup.enter="onEnterNewTodoItem"
    ></a-input>

    <a-list
      size="large"
      :bordered="true"
      :data-source="todos"
      style="background-color: white; height: 400px; overflow: hidden; overflow-y: scroll;"
    >
      <template #renderItem="{ item }">
        <a-list-item>
          <a-checkbox
            v-model:checked="item.done"
            @change="onToggleCheck(item.id, item.done)"
          >
            {{ item.explanation }}
          </a-checkbox>
          <template #actions>
            <a-popconfirm
              title="Bu kaydı silmek istediğinizden emin misiniz?"
              placement="left"
              ok-text="Evet"
              cancel-text="Hayır"
              @confirm="onDeleteClick(item.id)"
            >
              <a-button type="link">
                <template #icon>
                  <DeleteTwoTone />
                </template>
              </a-button>
            </a-popconfirm>
          </template>
        </a-list-item>
      </template>
    </a-list>
  </div>
</template>

<script>
import { List, Checkbox, Input, Button, Popconfirm } from "ant-design-vue";
import { DeleteTwoTone } from "@ant-design/icons-vue";

import { useState, useActions } from "@/store/hooks";
import { reactive, toRefs } from "vue";
export default {
  components: {
    "a-list": List,
    "a-list-item": List.Item,
    "a-checkbox": Checkbox,
    "a-input": Input,
    "a-button": Button,
    "a-popconfirm": Popconfirm,
    DeleteTwoTone
  },
  setup() {
    const state = reactive({ newTodo: "" });
    const { newTodo } = toRefs(state);

    const { todos } = useState(["todos"]);

    const { saveTodo, updateTodo, getTodos, deleteTodo } = useActions([
      "saveTodo",
      "getTodos",
      "updateTodo",
      "deleteTodo"
    ]);

    const onEnterNewTodoItem = function() {
      saveTodo({ explanation: newTodo.value, done: false }).then(
        () => (state.newTodo = "")
      );
    };

    const onToggleCheck = function(id, checked) {
      const todo = todos.value.find(x => x.id === id);
      todo.done = checked;
      updateTodo(todo);
    };

    const onDeleteClick = function(id) {
      deleteTodo(id);
    };

    getTodos();

    return {
      newTodo,
      todos,
      onEnterNewTodoItem,
      onToggleCheck,
      onDeleteClick
    };
  }
};
</script>

<style></style>
