<template>
  <div class="article" :class="{ 'unpublished': !article.isPublished }">
    <h2 class="article-title">
      <router-link :to="`/article/${article.id}`">
        {{ article.title }}
      </router-link>
    </h2>
    
    <div>{{ article.author }}</div>
    <p>{{ article.body }}</p>
    
    <div class="article-author">Статус: {{ article.isPublished ? 'Опубликовано' : 'Не опубликовано' }}</div>

    <BaseButton @click="$emit('toggle-published', article.id)">
      {{ article.isPublished ? 'Снять с публикации' : 'Опубликовать' }}
    </BaseButton>
    
    <router-link :to="`/article/${article.id}`" class="read">Читать далее</router-link>
  </div>
</template>

<script setup>
defineProps({
  article: {
    type: Object,
    required: true
  }
})

defineEmits(['toggle-published'])
</script>

<style scoped>
.article {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  margin: 15px 0;
  background-color: #f9f9f9;
  transition: all 0.3s ease;
  width: 500px;
}

.article.unpublished {
  border-color: #ff6b6b;
  background-color: #fff5f5;
}

.article-title a {
  color: #2c3e50;
  margin-bottom: 10px;
  font-size: 1.5rem;
}

.article.unpublished .article-title {
  color: #e74c3c;
}

.article-author {
  color: #34495e;
  margin-bottom: 10px;
  font-size: 1.1rem;
}

.article-body {
  color: #7f8c8d;
  line-height: 1.6;
  margin-bottom: 15px;
}

.article-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 15px;
  border-top: 1px solid #eee;
}

.read {
    color: black;
    padding: 20px;
}

.article-status {
  font-size: 0.95rem;
}

.published-text {
  color: #27ae60;
  font-weight: bold;
}

.unpublished-text {
  color: #e74c3c;
  font-weight: bold;
}
</style>