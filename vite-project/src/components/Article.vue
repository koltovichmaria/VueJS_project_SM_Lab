<template>
  <div class="article-page">
    <Button icon="pi pi-arrow-left" label="Назад" class="p-button-text" @click="$router.back()" />
    <Card v-if="article">
      <template #header>
        <Image
          :src="`https://wowprofi.ru/src/Frontend/Files/MediaLibrary/01/kubanskiy.jpg`"
          alt="Изображение"
          width="100%"
          height="300px"
          preview
        />
      </template>
      <template #title>{{ article.title }}</template>
      <template #subtitle><i class="pi pi-user"></i> {{ article.author }}</template>
      <template #content>
        <p class="body">{{ article.body }}</p>
        <p class="status" :class="{ published: article.isPublished }">
          <i :class="article.isPublished ? 'pi pi-check-circle' : 'pi pi-clock'"></i>
          {{ article.isPublished ? 'Опубликовано' : 'Черновик' }}
        </p>
      </template>
      <template #footer>
        <Button
          :label="article.isPublished ? 'Снять с публикации' : 'Опубликовать'"
          :icon="article.isPublished ? 'pi pi-ban' : 'pi pi-check'"
          :class="article.isPublished ? 'p-button-warning' : 'p-button-success'"
          @click="store.togglePublished(article.id)"
        />
      </template>
    </Card>
    <div v-else class="not-found">Статья не найдена</div>
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
  max-width: 800px;
  margin: 0 auto;
}
.body {
  line-height: 1.6;
  white-space: pre-line;
}
.status {
  margin-top: 1rem;
  font-weight: bold;
}
.status.published {
  color: #27ae60;
}
.not-found {
  text-align: center;
  background: white;
  padding: 2rem;
  border-radius: 12px;
  color: #e74c3c;
}
</style>