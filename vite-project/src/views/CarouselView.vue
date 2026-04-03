<template>
  <div class="carousel-page">
    <h1>Карусель статей</h1>
    <div v-if="store.isLoading" class="spinner">
      <i class="pi pi-spin pi-spinner" style="font-size: 3rem"></i>
      <p>Загрузка...</p>
    </div>
    <div v-else-if="store.hasError" class="error">
      <i class="pi pi-exclamation-triangle"></i>
      <p>{{ store.error }}</p>
    </div>
    <Carousel v-else :value="store.articles" :numVisible="3" :numScroll="1" :responsiveOptions="responsiveOptions">
      <template #item="slotProps">
        <div class="carousel-item">
          <Card>
            <template #header>
              <Image :src="`https://picsum.photos/seed/${slotProps.data.id}/400/200`" alt="img" width="100%" height="150px" preview />
            </template>
            <template #title>{{ slotProps.data.title }}</template>
            <template #subtitle><i class="pi pi-user"></i> {{ slotProps.data.author }}</template>
            <template #content>
              <p>{{ slotProps.data.body.substring(0, 80) }}...</p>
              <p class="status" :class="{ published: slotProps.data.isPublished }">
                <i :class="slotProps.data.isPublished ? 'pi pi-check-circle' : 'pi pi-clock'"></i>
                {{ slotProps.data.isPublished ? 'Опубликовано' : 'Черновик' }}
              </p>
            </template>
            <template #footer>
              <Button label="Подробнее" icon="pi pi-eye" @click="$router.push(`/article/${slotProps.data.id}`)" />
            </template>
          </Card>
        </div>
      </template>
    </Carousel>
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

const responsiveOptions = [
  { breakpoint: '1024px', numVisible: 2, numScroll: 1 },
  { breakpoint: '768px', numVisible: 1, numScroll: 1 }
]
</script>

<style scoped>
.carousel-page {
  max-width: 1200px;
  margin: 0 auto;
}
h1 {
  text-align: center;
  color: white;
  margin-bottom: 2rem;
}
.carousel-item {
  padding: 0.5rem;
}
.status {
  margin-top: 0.5rem;
  font-weight: bold;
}
.status.published {
  color: #27ae60;
}
.status:not(.published) {
  color: #e67e22;
}
.spinner, .error {
  text-align: center;
  padding: 3rem;
  color: white;
}
.error {
  background: white;
  color: #e74c3c;
  border-radius: 12px;
  max-width: 500px;
  margin: 0 auto;
}
</style>