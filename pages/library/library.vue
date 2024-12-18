<script setup lang="ts">
import newsPlaceholder from '~/assets/images/news-placeholder.png'

const books = [
  {
    book_id: 1,
    title: "Article 1",
    description: "This is a sample description for Article 1. Add as much detail as needed.",
    details: "Further article information can go here. The layout ensures the content and image are balanced and responsive.",
    imageSrc: "https://via.placeholder.com/300x400",
  },
  {
    book_id: 2,
    title: "Article 2",
    description: "This is a sample description for Article 2. Add as much detail as needed.",
    details: "Further article information can go here. The layout ensures the content and image are balanced and responsive.",
    imageSrc: "https://via.placeholder.com/300x400",
  },
  {
    book_id: 3,
    title: "Article 3",
    description: "This is a sample description for Article 3. Add as much detail as needed.",
    details: "Further article information can go here. The layout ensures the content and image are balanced and responsive.",
    imageSrc: "https://via.placeholder.com/300x400",
  },
];

</script>

<template>
  <div>
    <div class="flex justify-center items-center mb-10">
      <h1 class="font-semibold text-3xl ">Let’ s find a books, What’s on your mind?</h1>
    </div>

    <div class="px-[25%]">
      <form class="flex items-center  mx-auto mb-10">
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
            class="bg-gray-50  text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-100 dark:border-gray-200 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Look for something..." required />
        </div>
      </form>
    </div>

    <!-- Grid Layout -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="book in books" :key="book.book_id" class="p-2">
        <nuxt-link :to="`/library/${book.book_id}`" class="block">
          <div
            class="card border shadow-md rounded-lg overflow-hidden grid grid-cols-1 md:grid-cols-2 h-full cursor-pointer">
            <!-- Image Column -->
            <div class="w-full h-80">
              <img :src="book.imageSrc" alt="Book Image" class="object-cover w-full h-full" />
            </div>

            <!-- Content Column -->
            <div class="flex flex-col p-6">
              <h2 class="text-xl font-semibold mb-4 text-gray-700">
                {{ book.title }}
              </h2>
              <p class="text-sm text-gray-600 mb-4">
                {{ book.description }}
              </p>
              <p class="text-xs text-gray-500 leading-relaxed">
                {{ book.details }}
              </p>
            </div>
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
