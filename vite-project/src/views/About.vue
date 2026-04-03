<template>
  <div class="about">
    <Card>
      <template #title>О нас</template>
      <template #content>
        <p>Добро пожаловать на сайт статей!</p>
        <p>Используемые технологии:</p>
        <ul>
          <li><i class="pi pi-vue"></i> Vue 3</li>
          <li><i class="pi pi-database"></i> Pinia</li>
          <li><i class="pi pi-prime"></i> PrimeVue</li>
          <li><i class="pi pi-server"></i> json-server</li>
        </ul>
      </template>
    </Card>
  </div>
</template>

<style scoped>
.about {
  max-width: 600px;
  margin: 0 auto;
}
ul {
  list-style: none;
  padding: 0;
}
li {
  margin: 1rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
</style>