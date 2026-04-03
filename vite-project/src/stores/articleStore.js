import { defineStore } from 'pinia'
import { articleService } from '../services/articleService'

export const useArticleStore = defineStore('articles', {
  state: () => ({
    articles: [],
    loading: false,
    error: null,
    abortController: null
  }),
  getters: {
    hasError: (state) => !!state.error,
    isLoading: (state) => state.loading
  },
  actions: {
    cancelLoading() {
      if (this.abortController) {
        this.abortController.abort()
        this.abortController = null
        this.loading = false
        this.error = 'Загрузка отменена'
        this.articles = []
      }
    },
    async fetchArticles() {
      if (this.abortController) this.abortController.abort()
      this.abortController = new AbortController()
      this.loading = true
      this.error = null
      try {
        const data = await articleService.fetchArticles(this.abortController)
        this.articles = data.map(article => ({
          ...article,
          isPublished: article.isPublished || false
        }))
      } catch (err) {
        if (err.name === 'AbortError') this.error = 'Загрузка отменена'
        else this.error = err.message
        this.articles = []
      } finally {
        this.loading = false
        this.abortController = null
      }
    },
    async retryFetch() {
      this.error = null
      await this.fetchArticles()
    },
    addArticle(articleData) {
      const newId = Math.max(0, ...this.articles.map(a => a.id)) + 1
      const newArticle = {
        id: newId,
        title: articleData.title,
        author: articleData.author,
        body: articleData.body,
        isPublished: false
      }
      this.articles.push(newArticle)
    },
    togglePublished(id) {
      const article = this.articles.find(a => a.id === id)
      if (article) article.isPublished = !article.isPublished
    }
  }
})