<template>
  <div class="app-container" :class="{ mobile: isMobile }">
    <aside v-if="!isMobile" class="sidebar">
      <Menubar :model="menuItems" class="vertical-menu" />
    </aside>
    <div class="main-content">
      <header v-if="isMobile" class="mobile-header">
        <Menubar :model="menuItems" class="horizontal-menu" />
      </header>
      <main>
        <router-view />
      </main>
    </div>
    <ConfirmDialog />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isMobile = ref(window.innerWidth <= 768)

const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768
}
window.addEventListener('resize', checkMobile)
onUnmounted(() => window.removeEventListener('resize', checkMobile))

const menuItems = computed(() => [
  { label: 'Главная', icon: 'pi pi-home', command: () => router.push('/') },
  { label: 'О нас', icon: 'pi pi-info-circle', command: () => router.push('/about') },
  { label: 'Добавить статью', icon: 'pi pi-plus', command: () => router.push('/new') }
])
</script>

<style>
:root {
  --primary-color: #3B82F6;
  --text-color: #2c3e50;
  --font-size-base: 16px;
  --border-radius: 12px;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: var(--font-size-base);
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
.app-container {
  display: flex;
  min-height: 100vh;
}
.app-container.mobile {
  flex-direction: column;
}
.sidebar {
  width: 260px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-right: 1px solid #dee2e6;
}
.vertical-menu {
  height: 100%;
  border: none;
  background: transparent;
}
.vertical-menu .p-menubar-root-list {
  flex-direction: column;
  width: 100%;
}
.vertical-menu .p-menuitem {
  width: 100%;
}
.vertical-menu .p-menuitem-link {
  padding: 1rem;
  justify-content: flex-start;
}
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.mobile-header {
  background: rgba(255, 255, 255, 0.95);
  border-bottom: 1px solid #dee2e6;
}
.horizontal-menu {
  border: none;
  background: transparent;
}
main {
  flex: 1;
  padding: 2rem;
}
/* Переопределение цветов PrimeVue */
.p-button {
  background: var(--primary-color);
  border-color: var(--primary-color);
}
.p-button:hover {
  background: #2563eb;
}
.p-card {
  border-radius: var(--border-radius);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}
</style>