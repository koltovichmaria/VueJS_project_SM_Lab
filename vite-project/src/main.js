import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { useArticleStore } from './stores/articleStore'
import PrimeVue from 'primevue/config';
import Lara from '@primeuix/themes/lara';
import 'primeicons/primeicons.css'

import Menubar from 'primevue/menubar'
import Card from 'primevue/card'
import Image from 'primevue/image'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import Calendar from 'primevue/calendar'
import Dialog from 'primevue/dialog'
import ConfirmDialog from 'primevue/confirmdialog'
import ConfirmationService from 'primevue/confirmationservice'

const pinia = createPinia()

const app = createApp(App)
app.use(PrimeVue, {
    theme: {
        preset: Lara
    }
});
app.use(ConfirmationService)

app.component('Menubar', Menubar)
app.component('Card', Card)
app.component('Image', Image)
app.component('Button', Button)
app.component('InputText', InputText)
app.component('Textarea', Textarea)
app.component('Calendar', Calendar)
app.component('Dialog', Dialog)
app.component('ConfirmDialog', ConfirmDialog)

app.use(pinia)
app.use(router)
const articleStore = useArticleStore()
await articleStore.fetchArticles()
app.mount('#app')

