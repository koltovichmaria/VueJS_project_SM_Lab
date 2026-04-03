<template>
  <div class="my-component">
    <h1>Привет, {{ name }}!</h1>
    <button @click="$emit('sayHi')">Сказать привет</button>
  </div>
</template>

<script setup>
defineProps({
  name: {
    type: String,
    default: 'Гость'
  }
})
defineEmits(['sayHi'])
</script>