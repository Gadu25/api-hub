<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const screenWidth = ref(0);
const screenHeight = ref(0);

const updateScreenSize = () => {
  screenWidth.value = window.innerWidth;
  screenHeight.value = window.innerHeight;
};

onMounted(() => {
  updateScreenSize();
  window.addEventListener('resize', updateScreenSize);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateScreenSize);
});
</script>

<template>
  <div class="relative flex w-full px-6">
    <CommonDrawerSidebar v-if="screenWidth > 768" />
    <main class="w-full">
      <CommonNavbar :hasMobileNav="screenWidth <= 768"/>
      <div class="content-wrapper">
        <slot />
      </div>
    </main>
  </div>
</template>

<style scoped>
.content-wrapper {
  height: calc(100vh - 115px);
  overflow-y: auto;
  border-radius: 20px;
}
</style>
