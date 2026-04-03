<template>
  <div id="app">
    <nav>
      <router-link to="/">Главная</router-link>
      <router-link to="/about">О нас</router-link>
      <router-link to="/new">Добавить статью</router-link>
    </nav>
    
    <router-view />
  </div>
</template>


<style>
body {
  margin: 0;
  font-family: Arial, sans-serif;
}

nav {
  padding: 20px;
  background-color: black;
}

nav a {
  margin: 0 10px;
  color: white;
  text-decoration: none;
}
</style>