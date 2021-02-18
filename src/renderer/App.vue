<template>
  <a-layout class="layout">
    <a-layout-header class="title-bar">
      <div class="logo">TO<span>DO</span></div>
      <a-menu theme="dark" mode="horizontal" :style="{ lineHeight: '64px' }">
        <a-menu-item key="1"
          ><router-link to="/">Home</router-link></a-menu-item
        >
        <a-menu-item key="2"
          ><router-link to="/about">About</router-link></a-menu-item
        >
      </a-menu>
    </a-layout-header>
    <a-layout-content style="padding: 0 50px;">
      <router-view />
    </a-layout-content>
    <a-layout-footer style="text-align: center;">
      ELECTRON TODO APP ©2021 Created by Ersen
    </a-layout-footer>
  </a-layout>
</template>
<script>
import { Layout, Menu } from "ant-design-vue";
export default {
  components: {
    "a-layout": Layout,
    "a-layout-header": Layout.Header,
    "a-layout-content": Layout.Content,
    "a-layout-footer": Layout.Footer,
    "a-menu": Menu,
    "a-menu-item": Menu.Item
  }
};
</script>
<style scoped>
.title-bar {
  -webkit-app-region: drag;
}

.layout {
  height: 100vh;
  width: 100vw;
}
.logo {
  float: left;
  padding: 0 25px 0 0;
  font-size: 2.5rem;
  color: darkorange;
  font-weight: bold;
}
.logo span {
  color: white;
}
</style>
