<script setup lang="ts"></script>

<template>
  <div>
    <div class="flex justify-center items-center mb-10">
      <h1 class="font-semibold text-3xl ">Let’ s find an image, What’s on your mind?</h1>
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

    <div class="w-full p-4 ">
      <!-- Grid Container -->
      <div class="grid grid-cols-3 gap-[100px]">
        <!-- Image Box 1 -->
        <div class="bg-gray-300 flex justify-center items-center p-[100px] py-[130px] rounded-lg ">
          <h2>IMAGE</h2>
        </div>
        <!-- Image Box 2 -->
        <div class="bg-gray-300 flex justify-center items-center p-[100px] py-[130px] rounded-lg">
          <h2>IMAGE</h2>
        </div>
        <!-- Image Box 3 -->
        <div class="bg-gray-300 flex justify-center items-center p-[100px] py-[130px] rounded-lg">
          <h2>IMAGE</h2>
        </div>
      </div>
    </div>



  </div>
</template>

<style scoped></style>
