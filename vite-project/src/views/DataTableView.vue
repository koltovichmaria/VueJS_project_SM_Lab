<template>
  <div class="datatable-page">
    <h1>Таблица статей</h1>
    <div v-if="store.isLoading" class="spinner">
      <i class="pi pi-spin pi-spinner" style="font-size: 3rem"></i>
      <p>Загрузка...</p>
    </div>
    <div v-else-if="store.hasError" class="error">
      <i class="pi pi-exclamation-triangle"></i>
      <p>{{ store.error }}</p>
    </div>
    <DataTable v-else :value="store.articles" stripedRows responsiveLayout="scroll">
      <Column field="id" header="ID" sortable></Column>
      <Column field="title" header="Заголовок" sortable></Column>
      <Column field="author" header="Автор" sortable></Column>
      <Column field="isPublished" header="Статус">
        <template #body="slotProps">
          <span :class="slotProps.data.isPublished ? 'published' : 'draft'">
            <i :class="slotProps.data.isPublished ? 'pi pi-check-circle' : 'pi pi-clock'"></i>
            {{ slotProps.data.isPublished ? 'Опубликовано' : 'Черновик' }}
          </span>
        </template>
      </Column>
      <Column header="Действия">
        <template #body="slotProps">
          <Button icon="pi pi-eye" class="p-button-info" @click="$router.push(`/article/${slotProps.data.id}`)" />
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useArticleStore } from '../stores/articleStore'

const store = useArticleStore()

onMounted(async () => {
  if (store.articles.length === 0 && !store.isLoading) {
    await store.fetchArticles()
  }
})
</script>

<style scoped>
.datatable-page {
  max-width: 1200px;
  margin: 0 auto;
  background: white;
  border-radius: 12px;
  padding: 1rem;
}
h1 {
  text-align: center;
  color: #333;
  margin-bottom: 1.5rem;
}
.published {
  color: #27ae60;
  font-weight: bold;
}
.draft {
  color: #e67e22;
  font-weight: bold;
}
.spinner, .error {
  text-align: center;
  padding: 2rem;
}
.error {
  background: white;
  color: #e74c3c;
  border-radius: 12px;
}
</style>