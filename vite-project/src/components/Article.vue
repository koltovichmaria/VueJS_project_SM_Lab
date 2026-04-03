<template>
  <div class="article-page">
    <button @click="$router.back()">Назад</button>
    <div v-if="article" class="article">
      <h1>{{ article.title }}</h1>
      <p>Автор: {{ article.author }}</p>
      <p>{{ article.body }}</p>
      <p>Статус: {{ article.isPublished ? 'Опубликовано' : 'Черновик' }}</p>
      <button @click="store.togglePublished(article.id)">Изменить статус</button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useArticleStore } from '../stores/articleStore'

const route = useRoute()
const store = useArticleStore()
const article = computed(() => store.articles.find(a => a.id === parseInt(route.params.id)))
</script>

<style scoped>
.article-page {
  padding: 2rem;
}
button {
  padding: 0.5rem 1rem;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 1rem;
}
.article {
  background: white;
  padding: 2rem;
  border-radius: 8px;
}
</style>