import { createWebHistory, createRouter } from 'vue-router'
import Home from '../views/Home.vue'
import NewArticle from '../views/NewArticle.vue'
import Article from '../components/Article.vue'
import { useArticleStore } from '../stores/articleStore'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/article/:id',
    name: 'Article',
    component: Article,
    props: (route) => {
      
      return { id: parseInt(route.params.id) }
    }
  },
  {
    path: '/new',
    name: 'Add new article',
    component: NewArticle
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router