<template>
  <div class="articles-grid">
    <Card v-for="article in articles" :key="article.id" class="article-card">
      <template #header>
        <Image
          :src="`https://picsum.photos/seed/${article.id}/400/200`"
          alt="Изображение статьи"
          width="100%"
          height="200px"
          preview
        />
      </template>
      <template #title>
        <router-link :to="`/article/${article.id}`" class="article-title">
          {{ article.title }}
        </router-link>
      </template>
      <template #subtitle>
        <i class="pi pi-user"></i> {{ article.author }}
      </template>
      <template #content>
        <p>{{ article.body.substring(0, 100) }}...</p>
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
          @click="confirmToggle(article)"
          size="small"
        />
        <Button
          label="Подробнее"
          icon="pi pi-eye"
          class="p-button-info"
          size="small"
          @click="$router.push(`/article/${article.id}`)"
        />
      </template>
    </Card>
  </div>
</template>

<script setup>
import { useConfirm } from 'primevue/useconfirm'
import { useArticleStore } from '../stores/articleStore'

const store = useArticleStore()
const confirm = useConfirm()

await store.fetchArticles()
const articles = store.articles

const confirmToggle = (article) => {
  confirm.require({
    message: `Изменить статус статьи "${article.title}"?`,
    header: 'Подтверждение',
    icon: 'pi pi-info-circle',
    acceptLabel: 'Да',
    rejectLabel: 'Нет',
    accept: () => store.togglePublished(article.id)
  })
}
</script>

<style scoped>
.articles-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}
@media (max-width: 768px) {
  .articles-grid {
    grid-template-columns: 1fr;
  }
}
.article-card {
  transition: transform 0.2s;
}
.article-card:hover {
  transform: translateY(-5px);
}
.article-title {
  color: var(--text-color);
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: bold;
}
.article-title:hover {
  color: var(--primary-color);
}
.status {
  margin-top: 1rem;
  font-weight: bold;
}
.status.published {
  color: #27ae60;
}
.status:not(.published) {
  color: #e67e22;
}
</style>