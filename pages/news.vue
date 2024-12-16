<script setup lang="ts"></script>

<template>

  <div>

    <form class="flex items-center max-w-full mx-auto mb-10">
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
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-100 dark:border-gray-200 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Look for something..." required />
      </div>

    </form>

  </div>
  <!-- Container -->
  <div class="flex gap-6 justify-start  ">
    <div class=" gap-4 w-[50%]">
      <!-- Card -->
      <div class="col-span-2 bg-gray-100 shadow-md rounded-lg overflow-hidden flex">
        <!-- Left Column: Full Image -->
        <div class="w-96 h-80 p-6">
          <img src="https://via.placeholder.com/300x200" alt="News Image"
            class="object-cover w-full h-full rounded-lg" />
        </div>
        <!-- Right Column: Content -->
        <div class="w-4/5 p-2 flex flex-col py-6">
          <h2 class="text-lg font-semibold mb-2">
            Trouble in paradise in Philadelphia?
          </h2>
          <p class="text-sm text-gray-600 mb-2">
            Jalen Hurts-A.J. Brown relationship: Eagles' Brandon Graham says 'they were friends, but things have
            changed'
            - CBS Sports
          </p>
          <p class="text-xs text-gray-500 leading-relaxed">
            For the second consecutive year, there appears to be tension between Jalen Hurts and A.J. Brown that is
            affecting the Philadelphia Eagles locker room. Forget the fact that the Eagles are 11-2 and won...
          </p>
        </div>
      </div>
    </div>

    <!-- Container -->
    <div class=" gap-4 w-[50%]">
      <!-- Card -->
      <div class="col-span-2 bg-gray-100 shadow-md rounded-lg overflow-hidden flex">
        <!-- Left Column: Full Image -->
        <div class="w-96 h-80 p-6">
          <img src="https://via.placeholder.com/300x200" alt="News Image"
            class="object-cover w-full h-full rounded-lg" />
        </div>
        <!-- Right Column: Content -->
        <div class="w-4/5 p-2 flex flex-col py-6">
          <h2 class="text-lg font-semibold mb-2">
            Trouble in paradise in Philadelphia?
          </h2>
          <p class="text-sm text-gray-600 mb-2">
            Jalen Hurts-A.J. Brown relationship: Eagles' Brandon Graham says 'they were friends, but things have
            changed'
            - CBS Sports
          </p>
          <p class="text-xs text-gray-500 leading-relaxed">
            For the second consecutive year, there appears to be tension between Jalen Hurts and A.J. Brown that is
            affecting the Philadelphia Eagles locker room. Forget the fact that the Eagles are 11-2 and won...
          </p>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped></style>
