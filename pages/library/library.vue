<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useLibraryStore } from '~/stores/useLibraryStore';

const libraryStore = useLibraryStore();
const { books, loading, error } = storeToRefs(libraryStore);

const query = ref('');

const searchBook = async () => {
  if(query.value.trim()) {
    await libraryStore.fetchBooks(query.value);
  } else {
    alert('Please enter a query before searching for books.');
  }
}

const hasImage = (book) => {
  return book.isbn || book.oclc || book.lccn || book.olid
}
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
        <nuxt-link :to="`/library/${index}`" class="block">
          <div
            class="card border shadow-md rounded-lg overflow-hidden grid grid-cols-1 md:grid-cols-2 h-full cursor-pointer">
            <!-- Image Column -->
            <div class="w-full h-80" v-if="hasImage(book)">
              <img class="object-cover w-full h-full" v-if="book.isbn" :src="libraryStore.getBookImage(book.isbn[0], 'isbn')" alt="book-image"/>
              <img class="object-cover w-full h-full" v-else-if="book.oclc" :src="libraryStore.getBookImage(book.oclc[0], 'oclc')" alt="book-image"/>
              <img class="object-cover w-full h-full" v-else-if="book.lccn" :src="libraryStore.getBookImage(book.lccn[0], 'lccn')" alt="book-image"/>
              <img class="object-cover w-full h-full" v-else-if="book.olid" :src="libraryStore.getBookImage(book.olid[0], 'olid')" alt="book-image"/>
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
