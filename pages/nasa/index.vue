<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useNasaStore } from '~/stores/useNasaStore'; // Make sure to import the store

const nasaStore = useNasaStore();
const picture = ref<any>(null);

onMounted(async () => {
  await nasaStore.fetchPictureOfTheDay();
  picture.value = nasaStore.getPictureOfTheDay();
});
</script>

<template>
  <!-- Main Container -->
  <div class="max-w-5xl mx-auto px-4 py-8">
    <!-- Title -->
    <h1 class="text-2xl md:text-3xl font-bold mb-6">
      NASA Picture of the Day
    </h1>

    <!-- Image Placeholder -->
    <div v-if="picture"
      class="bg-gray-200 w-full h-64 md:h-80 flex items-center justify-center text-gray-400 text-lg font-semibold rounded-lg"
      :style="{ backgroundImage: `url(${picture?.url})`, backgroundSize: 'cover' }">
      <p v-if="!picture?.url">No image available</p>
    </div>

    <!-- Description Section -->
    <div class="mt-6">
      <h2 class="text-xl md:text-2xl font-semibold mb-4">
        {{ picture?.title || 'Title not available' }}
      </h2>
      <p class="text-sm md:text-base leading-relaxed text-gray-700">
        {{ picture?.explanation || 'Description not available' }}
      </p>
    </div>
  </div>
</template>

<style scoped>
/* Optional: Add styles for the image and description sections */
</style>
