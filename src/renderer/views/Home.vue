<template>
  <div class="home">
    <todo-list />
  </div>
</template>

<script>
  import TodoList from '@/components/TodoList';
  export default {
    name: 'Home',
    components: {
      TodoList,
    },
  };
</script>
