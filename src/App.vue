<template>
  <div id="app">
    <nav class="navbar navbar-expand-xl navbar-dark bg-dark">
      <router-link class="navbar-brand" to="/">
        <img src="./assets/logo.svg" alt="" class="w-25 img-fluid">
      </router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <router-link class="nav-item nav-link" to="/profile">Профиль</router-link>
          <router-link class="nav-item nav-link" to="/files">Файлы</router-link>
          <router-link class="nav-item nav-link" to="/setting">Настройки</router-link>
        </div>
      </div>
    </nav>
    <main>
      <router-view></router-view>
    </main>
    <footer>
      <div class="text-center pt-2">
        <!-- GitHub URL: https://github.com/Fiasko99 -->
        <span class="font-weight-bold">GitHub: </span>
        <a href="https://github.com/Fiasko99" target="_blank" data-title="Личный гитхаб автора" class="a-response"><img src="./assets/githubicon.svg" alt="ico" class="footer-icon"></a>
      </div>
    </footer>
  </div>
</template>

<script>
  export default {
    name: 'App',
    components: {},
  };
</script>

<style>
main {
  min-height: calc(100vh - 112px);
  background-color: seashell;
}
footer {
  height: 49px;
  background-color: gainsboro;
}
.footer-icon {

  min-height: 32px !important;
}
.footer-icon:hover {
  padding: 3px;
}
.a-response {
  display: inline-block; 
  position: relative;
}
.a-response:hover::after {
  content: attr(data-title);
  position: absolute;
  left: 20%;
  top: -64px;
  z-index: 1; 
  background: rgba(255,255,230,0.9);
  font-size: 12px; 
  padding: 5px 10px; 
  border: 1px solid #333; 
  border-radius: 5px;
}
</style>
