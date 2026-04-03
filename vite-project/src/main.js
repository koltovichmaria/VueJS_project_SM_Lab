import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import BaseButton from './components/BaseButton.vue'
import { useArticleStore } from './stores/articleStore'

const pinia = createPinia()

const app = createApp(App)

app.component('BaseButton', BaseButton)

app.use(pinia)
app.use(router)
const articleStore = useArticleStore()
await articleStore.fetchArticles()
app.mount('#app')

