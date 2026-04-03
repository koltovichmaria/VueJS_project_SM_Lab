<template>
  <div class="new-article">
    <Card>
      <template #title>
        <i class="pi pi-plus-circle"></i> Добавить статью
      </template>
      <template #content>
        <form @submit.prevent="submitForm">
          <div class="field">
            <label for="title">Заголовок <span class="required">*</span></label>
            <InputText
              id="title"
              v-model="form.title"
              :class="{ 'p-invalid': submitted && !form.title }"
              placeholder="Введите заголовок"
              aria-required="true"
            />
            <small v-if="submitted && !form.title" class="error-text">Заголовок обязателен</small>
          </div>
          <div class="field">
            <label for="author">Автор <span class="required">*</span></label>
            <InputText
              id="author"
              v-model="form.author"
              :class="{ 'p-invalid': submitted && !form.author }"
              placeholder="Имя автора"
              aria-required="true"
            />
            <small v-if="submitted && !form.author" class="error-text">Автор обязателен</small>
          </div>
          <div class="field">
            <label for="body">Текст <span class="required">*</span></label>
            <Textarea
              id="body"
              v-model="form.body"
              rows="5"
              :class="{ 'p-invalid': submitted && !form.body }"
              placeholder="Содержание статьи"
            />
            <small v-if="submitted && !form.body" class="error-text">Текст обязателен</small>
          </div>
          <div class="field">
            <label for="date">Дата публикации</label>
            <Calendar
              id="date"
              v-model="form.date"
              dateFormat="dd.mm.yy"
              showIcon
              placeholder="Выберите дату"
            />
          </div>
          <div class="form-actions">
            <Button type="submit" label="Добавить" icon="pi pi-check" class="p-button-success" />
            <Button type="button" label="Очистить" icon="pi pi-times" class="p-button-secondary" @click="resetForm" />
          </div>
        </form>
      </template>
    </Card>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useArticleStore } from '../stores/articleStore'
import { useConfirm } from 'primevue/useconfirm'

const router = useRouter()
const store = useArticleStore()
const confirm = useConfirm()

const form = reactive({ title: '', author: '', body: '', date: null })
const submitted = ref(false)

const submitForm = () => {
  submitted.value = true
  if (form.title && form.author && form.body) {
    confirm.require({
      message: 'Добавить новую статью?',
      header: 'Подтверждение',
      icon: 'pi pi-info-circle',
      acceptLabel: 'Да',
      rejectLabel: 'Нет',
      accept: () => {
        store.addArticle({ title: form.title, author: form.author, body: form.body })
        resetForm()
        router.push('/')
      }
    })
  }
}

const resetForm = () => {
  form.title = ''
  form.author = ''
  form.body = ''
  form.date = null
  submitted.value = false
}
</script>

<style scoped>
.new-article {
  max-width: 600px;
  margin: 0 auto;
}
.field {
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
label {
  font-weight: 600;
}
.required {
  color: #e74c3c;
}
.error-text {
  color: #e74c3c;
}
.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}
</style>