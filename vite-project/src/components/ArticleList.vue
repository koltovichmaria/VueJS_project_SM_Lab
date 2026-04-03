<template>
  <div class="article-list">
    <div v-for="article in articles" :key="article.id" class="article-card">
      <h3>{{ article.title }}</h3>
      <p><strong>Автор:</strong> {{ article.author }}</p>
      <p>{{ article.body.substring(0, 150) }}...</p>
      <p><strong>Статус:</strong> {{ article.isPublished ? 'Опубликовано' : 'Черновик' }}</p>
      <div class="actions">
        <button @click="store.togglePublished(article.id)">Изменить статус</button>
        <router-link :to="`/article/${article.id}`">Подробнее</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useArticleStore } from '../stores/articleStore'

const store = useArticleStore()
await store.fetchArticles()
const articles = store.articles
</script>

<style scoped>
.article-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
}
.article-card {
  background: white;
  color: black;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
.actions {
  margin-top: 1rem;
  display: flex;
  gap: 0.5rem;
}
button {
  padding: 0.3rem 0.8rem;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
a {
  color: #3498db;
  text-decoration: none;
}
</style>