<template>
    <aside
      id="logo-sidebar"
      class="z-40 my-12 mx-6 transition-transform sm:translate-x-0"
      :class="{ '-translate-x-full': !isDrawerOpen, 'w-20': !isDrawerOpen, 'w-80': isDrawerOpen }"
      aria-label="Sidebar"
    >
      <div
        class="h-screen px-3 py-4 overflow-y-auto rounded-2xl p-3 bg-blue-500 dark:bg-blue-500"
      >
        <a  class="flex items-center mb-5 ps-2.5">
          <span
            class="self-center text-xl font-semibold whitespace-nowrap dark:text-white"
            v-if="isDrawerOpen"
          >
            API HUB
          </span>
        </a>

        <button
        class="absolute top-20  transform -translate-y-1/2 bg-gray-300 rounded-full p-2 shadow-md transition-all"
        :class="{
          'right-4': isDrawerOpen,
          'right-[-12px]': !isDrawerOpen,
        }"
        @click="toggleDrawer"
      >
        <MdiIcon :icon="isDrawerOpen ? 'mdiChevronLeft' : 'mdiChevronRight'" />
      </button>
        <ul class="space-y-2 font-medium mt-14">
          <li
            v-for="(item, index) in menuItems"
            :key="index"
            class="flex items-center gap-4 px-4 hover:bg-gray-100 dark:hover:bg-white hover:text-gray-800 text-white rounded-lg p-2"
          >
            <MdiIcon :icon="item.icon" class="size-10" />
            <span
              class="ms-3 text-lg"
              v-if="isDrawerOpen"
            >
              {{ item.label }}
            </span>
          </li>
        </ul>
      </div>
      <button
        class="absolute top-20  transform -translate-y-1/2 bg-gray-300 rounded-full p-2 shadow-md transition-all"
        :class="{
          'right-4': isDrawerOpen,
          'right-[-12px]': !isDrawerOpen,
        }"
        @click="toggleDrawer"
      >
        <MdiIcon :icon="isDrawerOpen ? 'mdiChevronLeft' : 'mdiChevronRight'" />
      </button>
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
  
  #logo-sidebar.w-20 {
    width: 5rem;
  }
  
  button {
    transition: right 0.3s ease;
  }
  </style>
  