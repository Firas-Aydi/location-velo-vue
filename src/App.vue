<template>
  <div id="app">
    <div id="nav">
      <Nav />
    <router-view />
    </div>
  </div>
</template>

<script>
import Nav from "@/components/Nav";

export default {
  name: "App",
  components: { Nav },
};
</script>
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* background: #ebecec; */
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
