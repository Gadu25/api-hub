<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useNasaStore } from '~/stores/useNasaStore'; // Make sure to import the store

const nasaStore = useNasaStore();
const picture = ref<any>(null);
const loading = ref(true); // Add a loading state

onMounted(async () => {
  try {
    await nasaStore.fetchPictureOfTheDay();
    picture.value = nasaStore.getPictureOfTheDay();
  } finally {
    loading.value = false; // Ensure loading stops even if an error occurs
  }
});
</script>

<template>
  <!-- Main Container -->
  <div class="max-w-5xl mx-auto px-4 py-8">
    <!-- Title -->
    <h1 class="text-2xl md:text-3xl font-bold mb-6">
      NASA Picture of the Day
    </h1>

    <!-- Image Section -->
    <div
      class="bg-gray-200 w-full h-64 md:h-80 flex items-center justify-center text-gray-400 text-lg font-semibold rounded-lg"
      :style="picture?.url ? { backgroundImage: `url(${picture.url})`, backgroundSize: 'cover' } : {}">
      <!-- Show loading text or spinner -->
      <p v-if="loading">Loading image...</p>

      <!-- Show "No image available" if picture URL is not present -->
      <p v-else-if="!picture?.url">No image available</p>

      <!-- Show video if media type is video -->
      <div v-else-if="picture?.media_type === 'video'" class="w-full h-full">
        <video v-if="picture?.media_type === 'video' && picture?.url.endsWith('.mp4')" controls :src="picture.url"
          class="w-full h-full object-cover" autoplay loop muted>
          No video found
        </video>
        <!-- Render an <iframe> for YouTube or other video embeds -->
        <iframe v-else-if="picture?.media_type === 'video'" :src="`${picture.url}?autoplay=1&loop=1&mute=1`"
          class="w-full h-full rounded-lg" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>
        </iframe>

        <!-- Fallback for no video -->
        <p v-else>No video found</p>
      </div>
    </div>

    <!-- Description Section -->
    <div class="mt-6" v-if="!loading">
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
/* Optional: Add styles for loading spinner or skeleton */
</style>
