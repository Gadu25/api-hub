<template>

  <div>

    <form class="flex items-center max-w-full mx-auto mb-10" @submit.prevent="searchNews()">
      <label for="simple-search" class="sr-only">Search</label>
      <div class="relative w-full flex items-center">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-4.35-4.35m1.35-5.65a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          type="text"
          id="simple-search"
          class="bg-gray-100 border border-gray-300 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
          placeholder="Look for something..."
          v-model="query"
          required
        />
        <button
          type="submit"
          class="ml-2 bg-blue-500 text-white text-sm font-medium rounded-full px-4 py-2 transition-all duration-300 hover:bg-blue-600 focus:ring focus:ring-blue-300"
        >
          Search
        </button>
      </div>
    </form>

  </div>
  <!-- Container -->
  <div v-if="!loading" class="flex flex-wrap gap-2">
    <template v-for="article in isSearch ? searched.articles : headlineData.articles">
      <div v-if="article.content != '[Removed]'" class="flex-1 min-w-80">
        <!-- Card -->
        <div class="card col-span-2 bg-gray-100 shadow-md rounded-lg overflow-hidden flex flex-col h-full cursor-pointer p-6" @click="openUrl(article.url)">
          <!-- Left Column: Full Image -->
          <div class="h-80 rounded-lg overflow-hidden ">
            <img :src="article.urlToImage ? article.urlToImage: newsPlaceholder" alt="News Image"
              class="object-cover h-full" />
          </div>
          <!-- Right Column: Content -->
          <div class="w-4/5 mt-2 flex flex-col">
            <h2 class="text-lg font-semibold mb-2">
              {{ article.title }}
            </h2>
            <p class="text-sm text-gray-600 mb-2">
              {{ article.author }}
            </p>
            <p class="text-xs text-gray-500 leading-relaxed">
              {{ article.description }}
            </p>
          </div>
        </div>
      </div>
    </template>
  </div>
  <div v-else class="p-52 flex justify-center items-center">
    <p>fetching news...</p>
  </div>

</template>

<script setup>
  import { ref } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useNewsStore } from '~/stores/useNewsStore';
  import newsPlaceholder from '~/assets/images/news-placeholder.png'

  const newsStore = useNewsStore();
  const { headlineData, searched, loading, error } = storeToRefs(newsStore);

  const query = ref('');
  const isSearch = ref(false);

  const fetchHeadLines = async () => {
    await newsStore.fetchHeadLines('us');
  };

  const searchNews = async () => {
    event.preventDefault();
    isSearch.value = true;
    if (query.value.trim()) {
      await newsStore.fetchEverything(query.value);
    } else {
      alert('Please enter a query before fetching news.');
    }
  };

  const openUrl = (link) => {
    return window.open(link)
  }
  onMounted(fetchHeadLines);
</script>
<style scoped>
.card {
  img {
    scale: 1.2;
    transition: all 0.3s;
  }
  &:hover {
    animation: upDown .2s;
    img {
      scale: 1;
    }
  }
}

@keyframes upDown {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-4px);
  }
  100% {
    transform: translateY(0);
  }
}
</style>
