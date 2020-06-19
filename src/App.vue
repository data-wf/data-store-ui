<template>
  <div class="container">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>-->

    <router-view />
  </div>
</template>

<style>
html,
body {
  height: 100%;
}
#app {
  height: 100%;
}
.f-table {
  width: 100%;
  table-layout: fixed;
  font-size: 12px;
  line-height: 1.2;
  border-top: 1px solid #e9eaec;
  border-left: 1px solid #e9eaec;
  text-align: center;
  table-layout: auto;
}

.f-table td,
.f-table th {
  border-right: 1px solid #e9eaec;
  border-bottom: 1px solid #e9eaec;
  height: 20px;
}

.f-table th {
  background-color: #f8f8f9;
  padding: 8px 0;
  text-align: center;
  vertical-align: middle;
}

.f-table td {
  font-size: 12px;
  line-height: 20px;
  padding: 0;
  /* 4px 15px 4px 9px; */
  text-align: center;
  vertical-align: middle;
}

.container {
  height: 100%;
  background: #fff;
  border: 1px solid #bec2c7;
}

.panel {
  height: 100%;
  padding: 20px;
}

.panel_header {
  min-height: 48px;
  padding: 0 24px;
  color: rgba(0, 0, 0, 0.85);
  font-weight: 500;
  font-size: 16px;
  background: transparent;
  border-bottom: 1px solid #bec2c7;
  border-radius: 2px 2px 0 0;
  zoom: 1;
}
</style>
