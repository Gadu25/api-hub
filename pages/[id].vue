<template>
    <div class="flex flex-col md:flex-row justify-between p-6 bg-gray-50 min-h-screen">
      <!-- Main Weather Section -->
      <div class="flex-1 bg-white shadow-lg rounded-lg p-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold">Manila</h1>
            <p class="text-gray-500">Heavy Rain</p>
          </div>
          <div class="text-5xl font-bold">32°C</div>
        </div>
        <div class="mt-4 flex justify-between items-center bg-gray-100 p-4 rounded-lg overflow-x-auto">
          <div class="flex flex-col items-center">
            <span>Now</span>
            <span>🌩️</span>
            <span>32°C</span>
          </div>
          <div class="flex flex-col items-center">
            <span>12pm</span>
            <span>🌩️</span>
            <span>34°C</span>
          </div>
          <div class="flex flex-col items-center">
            <span>3pm</span>
            <span>🌞</span>
            <span>40°C</span>
          </div>
          <div class="flex flex-col items-center">
            <span>6pm</span>
            <span>⛅</span>
            <span>42°C</span>
          </div>
          <div class="flex flex-col items-center">
            <span>9pm</span>
            <span>🌑</span>
            <span>40°C</span>
          </div>
          <div class="flex flex-col items-center">
            <span>12am</span>
            <span>🌑</span>
            <span>38°C</span>
          </div>
          <div class="flex flex-col items-center">
            <span>6am</span>
            <span>🌅</span>
            <span>37°C</span>
          </div>
        </div>
        <div class="mt-4">
          <p class="text-lg">Winds</p>
          <p>1.54 m/s</p>
          <p>130 deg</p>
        </div>
      </div>
  
      <!-- Sidebar for Other Locations -->
      <div class="mt-6 md:mt-0 md:ml-6 w-full md:w-1/4 bg-white shadow-lg rounded-lg p-6">
        <h2 class="text-lg font-bold mb-4">Other Locations</h2>
        <ul>
          <li class="flex items-center justify-between p-2 bg-gray-100 rounded-lg mb-2">
            <span>New York</span>
            <span>❄️</span>
          </li>
          <li class="flex items-center justify-between p-2 bg-gray-100 rounded-lg mb-2">
            <span>Paranaque</span>
            <span>🌩️</span>
          </li>
          <li class="flex items-center justify-between p-2 bg-gray-100 rounded-lg">
            <span>Taguig</span>
            <span>🌤️</span>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script setup>
  // No functionality needed for this static view.
  </script>
  
  <style scoped>
  /* Additional styles if necessary */
  </style>
  