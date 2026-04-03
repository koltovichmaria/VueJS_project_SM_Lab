<template>
  <div class="home">
    <h1>Мои статьи</h1>

    <div class="controls">
      <!-- Кнопка отмены видна во время загрузки -->
      <button v-if="store.isLoading" @click="cancelLoad" class="cancel">Отмена</button>
      <!-- Кнопка повтора видна при ошибке (включая отмену) -->
      <button v-if="store.hasError" @click="retryLoad" class="retry">Повторить загрузку</button>
    </div>

    <!-- Блок ошибки (если есть) -->
    <div v-if="store.hasError" class="error">
      <p>Ошибка: {{ store.error }}</p>
    </div>

    <!-- Suspense для асинхронной загрузки ArticleList -->
    <Suspense v-else>
      <template #default>
        <!-- Используем key, чтобы при повторной загрузке компонент пересоздавался -->
        <ArticleList :key="componentKey" />
      </template>
      <template #fallback>
        <div class="spinner"></div>
      </template>
    </Suspense>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useArticleStore } from '../stores/articleStore'
import ArticleList from '../components/ArticleList.vue'

const store = useArticleStore()
const componentKey = ref(0)

const cancelLoad = () => {
  store.cancelLoading()
}

const retryLoad = () => {
  store.error = null
  componentKey.value += 1
}
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