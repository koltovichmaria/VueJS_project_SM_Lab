<template>
  <div>
    <router-link to="/"> Назад</router-link>
    <h1>Добавить новую статью</h1>
    <ArticleForm @add-article="handleAddArticle" />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import ArticleForm from '../components/ArticleForm.vue'
import { useArticleStore } from '../stores/articleStore'

const router = useRouter()
const articleStore = useArticleStore()

const handleAddArticle = (articleData) => {
  articleStore.addArticle(articleData)
  console.log('статья добавлена через pinia')
  router.push('/')
}
</script>