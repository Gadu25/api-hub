<template>
  <div class="sidebar-wrapper">
    <div class="main" :class="{'close':!isDrawerOpen}">
      <div class="self-center text-xl font-semibold whitespace-nowrap dark:text-white w-full px-2 mb-4">
        {{ isDrawerOpen ? 'API HUB' : 'API' }}
      </div>
      <button
        class="floating-button"
        @click="toggleDrawer">
        <MdiIcon :icon="isDrawerOpen ? 'mdiChevronLeft' : 'mdiChevronRight'" />
      </button>
      <div class="flex flex-col gap-2">
        <CommonDrawerSidebarMenu
          v-for="link in menuItems"
          :key="link.label"
          :text="link.label"
          :icon="link.icon"
          :to="link.to"
          :is-active="sidebarRoute.path === link.to || false"
          :isDrawerOpen="isDrawerOpen" />
      </div>
    </div>
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

const menuItems = [
  { label: 'Weather', icon: 'mdiWeatherPouring', to: '/weather/weather' },
  { label: 'News', icon: 'mdiNewspaperVariantOutline', to: '/news' },
  { label: 'Pictures', icon: 'mdiPictureInPictureTopRightOutline', to: '/pictures' },
  { label: 'Countries', icon: 'mdiFlagOutline', to: '/countries/countries' },
  { label: 'Users', icon: 'mdiAccountMultipleOutline', to: '/users/users' },
  { label: 'Jokes', icon: 'mdiAlphaJ', to: '/joke/joke' },
  { label: 'Exchange', icon: 'mdiSwapHorizontal', to: '/exchange/exchange' },
  { label: 'NASA', icon: 'mdiSpaceStation', to: '/nasa/nasa' },
  { label: 'Library', icon: 'mdiLibraryOutline', to: '/library/library' },
];

const isDrawerOpen = ref(true);

const toggleDrawer = () => {
  isDrawerOpen.value = !isDrawerOpen.value;
};
</script>

<style scoped>
.sidebar-wrapper {
  height: 100vh;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.main {
  height: 95%;
  width: 240px;
  border-radius: 14px;
  background-color: #3498DB;
  margin-right: 18px;
  position: relative;
  transition: all .3s;
  padding: 20px;
}
.main.close {
  width: 95px;
}

.main .floating-button {
  position: absolute;
  top: 55px;
  right: -10px;
  padding: 8px;
  border-radius: 100%;
  background-color: #F39C12;
  color: #ffffff
}
</style>