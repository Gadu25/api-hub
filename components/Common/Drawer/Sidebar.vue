<template>
    <aside 
      id="logo-sidebar" 
      class="transition-transform sm:translate-x-0 h-screen"
      :class="{ '-translate-x-full': !isDrawerOpen, 'w-44': !isDrawerOpen, 'w-80': isDrawerOpen }"
      aria-label="Sidebar"
    >
      <div class="overflow-y-auto rounded-2xl h-full bg-blue-500 dark:bg-blue-500 mx-8 my-10 p-6">
        <a class="flex items-center mb-5 ps-2.5">
          <!-- Sidebar title visible only when open -->
          <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white" v-if="isDrawerOpen">
            API HUB
          </span>
          <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white" v-if="!isDrawerOpen">
            API
          </span>
        </a>
        
        <!-- Toggle Button -->
        <button
          class="absolute top-20 transform -translate-y-1/2 bg-orange-400 rounded-full p-2 text-white font-semibold shadow-md transition-all"
          :class="{
            'right-4': isDrawerOpen,
            'right-[20px]': !isDrawerOpen,
          }" 
          @click="toggleDrawer"
        >
          <MdiIcon :icon="isDrawerOpen ? 'mdiChevronLeft' : 'mdiChevronRight'" />
        </button>
  
        <!-- Menu Items -->
        <ul class="space-y-2 font-medium mt-14">
          <li v-for="(item, index) in menuItems" :key="index"
            class="flex items-center gap-4  hover:bg-gray-100 dark:hover:bg-white hover:text-gray-800 text-white rounded-lg p-2">
            
            <!-- Icon always visible -->
            <MdiIcon :icon="item.icon" class="text-4xl" />
            
            <!-- Label only visible when sidebar is open -->
            <span class="ms-3 text-lg" v-if="isDrawerOpen">
              {{ item.label }}
            </span>
          </li>
        </ul>
      </div>
    </aside>
  </template>
  
  <script setup lang="ts">
  import { ref } from "vue";
  
  const menuItems = [
    { label: "Weather", icon: "mdiWeatherPouring", link: "#" },
    { label: "News", icon: "mdiNewspaperVariantOutline", link: "#" },
    { label: "Pictures", icon: "mdiPictureInPictureTopRightOutline", link: "#" },
    { label: "Users", icon: "mdiAccountMultipleOutline", link: "#" },
    { label: "Jokes", icon: "mdiAlphaJ", link: "#" },
    { label: "Exchange", icon: "mdiSwapHorizontal", link: "#" },
    { label: "NASA", icon: "mdiSpaceStation", link: "#" },
    { label: "Library", icon: "mdiLibraryOutline", link: "#" },
  ];
  
  const isDrawerOpen = ref(true);
  
  const toggleDrawer = () => {
    isDrawerOpen.value = !isDrawerOpen.value;
  };
  </script>
  
  <style scoped>
  #logo-sidebar {
    transition: width 0.3s ease, transform 0.3s ease;
  }
  
  #logo-sidebar.w-48 {
    width: 12rem; /* Adjusted width for better visibility of icons */
  }
  
  button {
    transition: right 0.3s ease;
  }
  </style>
  