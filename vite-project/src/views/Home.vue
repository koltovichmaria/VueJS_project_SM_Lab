<template>
  <div class="home">
    <h1>Мои статьи</h1>

    <div class="controls">
      <button v-if="store.isLoading" @click="cancelLoad" class="cancel">Отмена</button>
      <button v-if="store.hasError" @click="retryLoad" class="retry">Повторить загрузку</button>
    </div>

    <div v-if="store.hasError" class="error">
      <p>Ошибка: {{ store.error }}</p>
    </div>

    <Suspense v-else>
      <template #default>
        <ArticleList />
      </template>
      <template #fallback>
        <div class="spinner"></div>
      </template>
    </Suspense>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useArticleStore } from '../stores/articleStore'
import ArticleList from '../components/ArticleList.vue'

const store = useArticleStore()

onMounted(() => {
  // если нужно принудительно начать загрузку, но ArticleList сам вызовет
  // оставим для возможности ручного повтора
})

const cancelLoad = () => store.cancelLoading()
const retryLoad = () => store.retryFetch()
</script>

<style scoped>
.home {
  padding: 1rem;
  color: white;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea, #764ba2);
}
.controls {
  margin: 1rem 0;
}
.cancel, .retry {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
.cancel {
  background: #e74c3c;
  color: white;
}
.retry {
  background: #3498db;
  color: white;
}
.error {
  background: white;
  padding: 1rem;
  border-radius: 8px;
  color: #333;
  max-width: 500px;
  margin: 1rem 0;
}
.spinner {
  width: 50px;
  height: 50px;
  border: 5px solid rgba(255,255,255,0.3);
  border-top-color: white;
  border-radius: 50%;
  margin: 2rem auto;
  animation: spin 1s linear infinite;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>