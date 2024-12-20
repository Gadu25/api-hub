<script setup>
import { ref, watchEffect } from 'vue';
import { storeToRefs } from 'pinia';
import { useLibraryStore } from '~/stores/useLibraryStore';
import { checkImageSize } from "~/utils/imageUtils";

const libraryStore = useLibraryStore();
const { books, loading, error } = storeToRefs(libraryStore);

const query = ref('');
const bookHasImages = ref([]); // Reactive array to store image availability
const bookImages = ref([]);    // Reactive array to store image URLs

const searchBook = async () => {
  if (query.value.trim()) {
    await libraryStore.fetchBooks(query.value);
    bookHasImages.value = []; // Reset state
    bookImages.value = [];
  } else {
    alert('Please enter a query before searching for books.');
  }
};

const hasImage = async (book) => {
  const imageSources = ['isbn', 'oclc', 'lccn', 'olid'];

  for (const source of imageSources) {
    if (book[source] && Array.isArray(book[source]) && book[source][0]) {
      const url = await libraryStore.getBookImage(book[source][0], source);
      const isValid = await checkImageSize(url, 10, 10);
      if (isValid) {
        return true;
      }
    }
  }
  return false;
};

const getImage = async (book) => {
  const imageSources = ['isbn', 'oclc', 'lccn', 'olid'];

  for (const source of imageSources) {
    if (book[source]) {
      const url = await libraryStore.getBookImage(book[source][0], source);
      console.log(`Checking URL: ${url}`);
      const isValid = await checkImageSize(url, 10 , 10);
      if (isValid) {
        console.log(`Valid image URL found: ${url}`);
        return url;
      }
    }
  }
  console.log(`No valid image found for book: ${book.title}`);
  return null;
};


// Watch books and process their images
watchEffect(async () => {
  if (books.value.docs) {
    bookHasImages.value = Array(books.value.docs.length).fill(false);
    bookImages.value = Array(books.value.docs.length).fill(null);

    for (const [index, book] of books.value.docs.entries()) {
      bookHasImages.value[index] = await hasImage(book);
      bookImages.value[index] = await getImage(book);
    }
  }
});
</script>


<template>
  <div>
    <div class="flex justify-center items-center mb-10">
      <h1 class="font-semibold text-3xl ">Let’ s find a books, What’s on your mind?</h1>
    </div>

    <div class="px-[25%]">
      <form class="flex items-center  mx-auto mb-10" @submit.prevent>
        <label for="simple-search" class="sr-only">Search</label>
        <div class="relative w-full">
          <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M21 21l-4.35-4.35m1.35-5.65a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input type="text" id="simple-search"
          class="bg-gray-50 border border-gray-300 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
          placeholder="Look for something..." v-model="query" required @keypress.enter="searchBook()" />
        </div>
      </form>
    </div>

    <!-- Grid Layout -->
    <div v-if="books.docs" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="(book, index) in books.docs" class="p-2">
        <nuxt-link :to="`/library/${index}`" class="block h-full">
          <div class="card border shadow-md rounded-lg overflow-hidden grid grid-cols-1 h-full cursor-pointer" :class="bookHasImages[index]?'md:grid-cols-2':''">
            <!-- Image Column -->
            <div class="w-full h-80" v-if="bookHasImages[index]">
              <img class="object-cover w-full h-full" :src="bookImages[index]" alt="book-image" />
            </div>

            <!-- Content Column -->
            <div class="flex flex-col p-6">
              <h2 class="text-xl font-semibold mb-4 text-gray-700">
                {{ book.title }}
              </h2>
              <p class="text-sm text-gray-600 mb-4 inline-flex items-center" v-if="book.ratings_average">
                <MdiIcon icon="mdiStar" /> {{ parseFloat(book.ratings_average).toFixed(2) }}
              </p>
              <p v-for="author in book.author_name" class="text-xs text-gray-500 leading-relaxed">
                {{ author }}
              </p>
            </div>
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  &:hover {
    animation: upDown .2s;
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
