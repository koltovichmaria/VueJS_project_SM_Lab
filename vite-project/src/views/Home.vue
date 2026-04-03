<template>
  <div class="home">
    <h1 class="title">Мои статьи</h1>

    <div class="controls">
      <Button
        v-if="store.isLoading"
        label="Отмена"
        icon="pi pi-times"
        class="p-button-danger"
        @click="cancelLoad"
      />
      <Button
        v-if="store.hasError"
        label="Повторить загрузку"
        icon="pi pi-refresh"
        @click="retryLoad"
      />
    </div>

    <div v-if="store.hasError" class="error">
      <i class="pi pi-exclamation-triangle"></i>
      <p>{{ store.error }}</p>
    </div>

    <Suspense v-else>
      <template #default>
        <ArticleList :key="componentKey" />
      </template>
      <template #fallback>
        <div class="spinner">
          <i class="pi pi-spin pi-spinner" style="font-size: 3rem"></i>
          <p>Загрузка статей...</p>
        </div>
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

const cancelLoad = () => store.cancelLoading()
const retryLoad = () => {
  store.error = null
  componentKey.value += 1
}
</script>

<style scoped>
.home {
  max-width: 1200px;
  margin: 0 auto;
}
.title {
  text-align: center;
  color: white;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
  margin-bottom: 2rem;
}
.controls {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
}
.error {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  text-align: center;
  color: #e74c3c;
  max-width: 500px;
  margin: 0 auto;
}
.error i {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}
.spinner {
  text-align: center;
  padding: 3rem;
  color: white;
}
.spinner i {
  display: block;
  margin-bottom: 1rem;
}
</style>