<template>
  <div class="flex h-screen">
    <!-- Sidebar Drawer -->
    <div
      :class="{
        ' top-0 left-0 z-10 h-full transition-transform duration-300 delay-150 sm:translate-x-0': true,
        'translate-x-0': isDrawerOpen ,
        '-translate-x-full': !isDrawerOpen,
      }"
      class="py-1 px-3 flex flex-col gap-3 h-screen sm:translate-x-0 ">
    <div class="overflow-y-auto rounded-2xl h-full bg-blue-500 dark:bg-blue-500  my-10 p-6">
      <a class="flex items-center mb-5 ps-2.5">
        <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white" >
          {{ isDrawerOpen ? 'API HUB' : 'API' }}
        </span>
      
      </a>

      <!-- Toggle Button -->
      <button
        class="absolute top-32 items-center flex transform -translate-y-1/2 bg-orange-400 rounded-full p-2 text-white font-semibold shadow-md transition-all duration-300 delay-200"
        :class="{
          'right-0': isDrawerOpen,
          'right-[0px]': !isDrawerOpen,
        }" @click="toggleDrawer">
        <MdiIcon :icon="isDrawerOpen ? 'mdiChevronLeft' : 'mdiChevronRight'" />
      </button>
      <div class="flex flex-col gap-2">
        <CommonDrawerSidebarMenu v-for="link in menuItems" :key="link.label" :text="link.label" :icon="link.icon"
          :to="link.to" :is-active="sidebarRoute.path === link.to || false" :active-menu="activeColor"  :isDrawerOpen="isDrawerOpen" />
      </div>
    </div>
    </div>

    <!-- Main Content Area -->
    <main
      :class="{
        ' mt-12 transition-all duration-300 delay-300': true,
        'ml-0': !isDrawerOpen,
        'ml-30': isDrawerOpen ,
      }"
    >
      <slot />
    </main>
  </div>

</template>

<script setup lang="ts">

const router = useRouter();
const currentRoute = computed(() => router.currentRoute.value);
const sidebarRoute = ref(currentRoute.value);



watch(
  currentRoute,
  (newRoute) => {
    sidebarRoute.value = newRoute;
  },
  { immediate: true }
);


// Dynamically determine which menu to render
const activeMenu = computed(() => {
  return sidebarRoute.value.path.startsWith("/weather")
});
// Determine active color based on URL path
const activeColor = computed(() => {
  return sidebarRoute.value.path.startsWith("/admin")
    ? "#4ea819" // Green for admin
    : sidebarRoute.value.path.startsWith("/users")
      ? "#4ea819" // Blue for users
      : ""; // Default if no match
});


const menuItems = [
  { label: "Weather", icon: "mdiWeatherPouring", to: '/weather' },
  { label: "News", icon: "mdiNewspaperVariantOutline", to: '/news' },
  { label: "Pictures", icon: "mdiPictureInPictureTopRightOutline", to: '/pictures' },
  { label: "Users", icon: "mdiAccountMultipleOutline", to: '/users' },
  { label: "Jokes", icon: "mdiAlphaJ", to: '/jokes' },
  { label: "Exchange", icon: "mdiSwapHorizontal", to: '/exhange' },
  { label: "NASA", icon: "mdiSpaceStation", to: '/nasa' },
  { label: "Library", icon: "mdiLibraryOutline", to: '/library' },
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
  width: 12rem;
  /* Adjusted width for better visibility of icons */
}

button {
  transition: right 0.3s ease;
}

@media (max-width: 768px) {
  .sidebar {
    transform: translateX(-100%);
  }
}

.sidebar {
  width: 40px; /* adjust this value to your liking */
  height: 40px;
}

.sidebar, button, main {
  transition: transform 0.3s ease, margin-left 0.3s ease;
  transition-delay: 0.15s;
}

button {
  transition-delay: 0.2s;
}

main {
  transition-delay: 0.3s;
}
/* Hide the sidebar on small screens */
@media (max-width: 768px) {
  .sidebar {
    transform: translateX(-100%);
  }
}

/* Show the sidebar on large screens */
@media (min-width: 768px) {
  .sidebar {
    transform: translateX(0);
  }
}
</style>