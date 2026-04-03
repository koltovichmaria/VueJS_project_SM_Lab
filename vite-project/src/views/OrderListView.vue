<template>
  <div class="orderlist-page">
    <h1>Список статей</h1>
    <div v-if="store.isLoading" class="spinner">
      <i class="pi pi-spin pi-spinner" style="font-size: 3rem"></i>
      <p>Загрузка...</p>
    </div>
    <div v-else-if="store.hasError" class="error">
      <i class="pi pi-exclamation-triangle"></i>
      <p>{{ store.error }}</p>
    </div>
    <OrderList v-else :value="store.articles" listStyle="height:500px" dataKey="id">
      <template #item="slotProps">
        <div class="order-item">
          <i class="pi pi-bars" style="margin-right: 10px; color: #999"></i>
          <div class="item-content">
            <strong>{{ slotProps.item.title }}</strong>
            <span style="margin-left: 10px; color: #666">
              <i class="pi pi-user"></i> {{ slotProps.item.author }}
            </span>
          </div>
        </div>
      </template>
    </OrderList>
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
.orderlist-page {
  max-width: 800px;
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
.order-item {
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #eee;
}
.order-item:last-child {
  border-bottom: none;
}
.item-content {
  flex: 1;
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