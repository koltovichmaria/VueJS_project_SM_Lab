<template>
  <Suspense @pending="onPending" @resolve="onResolve" @fallback="onFallback">
    <!-- Основной контент (загружается) -->
    <template #default>
      <slot />
    </template>
    
    <!-- Заглушка во время загрузки -->
    <template #fallback>
      <div class="suspense-fallback">
        <div class="spinner"></div>
        <h3>Загрузка статей...</h3>
        <p class="delay-note">Задержка 2 секунды (json-server)</p>
        
        <!-- Кнопка отмены во время загрузки -->
        <button 
          v-if="showCancel" 
          @click="onCancel" 
          class="cancel-btn"
        >
          ⛔ Отменить загрузку
        </button>
      </div>
    </template>
  </Suspense>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  showCancel: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['pending', 'resolve', 'fallback', 'cancel'])

const onPending = () => {
  console.log('⏳ Suspense: начало загрузки')
  emit('pending')
}

const onResolve = () => {
  console.log('✅ Suspense: загрузка завершена')
  emit('resolve')
}

const onFallback = () => {
  console.log('🔄 Suspense: показываем заглушку')
  emit('fallback')
}

const onCancel = () => {
  console.log('⛔ Suspense: отмена по требованию')
  emit('cancel')
}
</script>

<style scoped>
.suspense-fallback {
  text-align: center;
  padding: 60px 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  color: white;
  max-width: 500px;
  margin: 40px auto;
}

.spinner {
  width: 60px;
  height: 60px;
  border: 6px solid rgba(255, 255, 255, 0.3);
  border-top: 6px solid white;
  border-radius: 50%;
  margin: 0 auto 20px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.delay-note {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  margin: 10px 0;
}

.cancel-btn {
  margin-top: 20px;
  padding: 12px 30px;
  background: #e74c3c;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
}

.cancel-btn:hover {
  background: #c0392b;
  transform: translateY(-2px);
}
</style>