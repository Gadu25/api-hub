<template>
  <div class="sidebar-wrapper">
    <div class="main" :class="{'close':!isDrawerOpen}">
      <div class="self-center text-2xl font-bold whitespace-nowrap dark:text-white w-full px-2 mb-6">
        {{ isDrawerOpen ? 'API HUB' : 'API' }}
      </div>
      <button
        class="floating-button"
        @click="toggleDrawer">
        <MdiIcon class="icon" icon="mdiChevronLeft" :class="{'close':!isDrawerOpen}"/>
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
import logo from '~/assets/images/api-hub-logo.jpeg'

watch(
  currentRoute,
  (newRoute) => {
    sidebarRoute.value = newRoute;
  },
  { immediate: true }
);

const menuItems = [
  { label: 'Weather', icon: 'mdiWeatherPouring', to: '/weather' },
  { label: 'News', icon: 'mdiNewspaperVariantOutline', to: '/news' },
  { label: 'Pictures', icon: 'mdiPictureInPictureTopRightOutline', to: '/pictures' },
  { label: 'Countries', icon: 'mdiFlagOutline', to: '/countries' },
  { label: 'Users', icon: 'mdiAccountMultipleOutline', to: '/users' },
  { label: 'Jokes', icon: 'mdiAlphaJ', to: '/joke' },
  { label: 'Exchange', icon: 'mdiSwapHorizontal', to: '/exchange' },
  { label: 'NASA', icon: 'mdiSpaceStation', to: '/nasa' },
  { label: 'Library', icon: 'mdiLibraryOutline', to: '/library' },
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
  top: 60px;
  right: -10px;
  padding: 8px;
  border-radius: 100%;
  background-color: #F39C12;
  color: #ffffff;
  transition: all .2s;
  z-index: 99;
}

.floating-button:hover {
  scale: 1.2;
  box-shadow: 0 0 4px #F39C12;
}

.icon {
  transition: all .3s;
}

.floating-button:hover .icon {
  transform: rotate(270deg) scale(1.3);
}

.icon.close {
  transform: rotate(180deg);
}

.floating-button:active {
  scale: .9;
}
</style>