<template>
    <div class="flex-wrap flex justify-between px-3 py-6">
      <div class="flex gap-4 items-center">
        <MdiIcon v-if="props.hasMobileNav" size="40" icon="mdiMenu" class="text-slate-900 cursor-pointer mobile-burger" @click="showNav = true"/>
        <a href="#" class="items-center">
          <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-gray-700"> {{ paramId.charAt(0).toUpperCase() + paramId.slice(1).toLowerCase() }}</span>
        </a>
      </div>
      <span class="date-span">2021-12-24 14:23:25</span>
      <div class="mobile-menus" :class="{'active': showNav}" @click="showNav = false">
        <div class="self-center text-xl font-semibold whitespace-nowrap dark:text-white w-full px-2 mb-4">
          API HUB
        </div>
        <CommonDrawerSidebarMenu
          v-for="link in menuItems"
          :key="link.label"
          :text="link.label"
          :icon="link.icon"
          :to="link.to"
          :is-active="sidebarRoute.path === link.to || false"
          :isDrawerOpen="true" />
      </div>
    </div>
</template>
<script setup lang="ts">

const route = useRoute();
const paramId = computed(() => {
  const urlSegments = route.fullPath.split('/');
  return urlSegments[urlSegments.length - 1];
});
const router = useRouter();
const currentRoute = computed(() => router.currentRoute.value);
const sidebarRoute = ref(currentRoute.value);

const showNav = ref(false)

const props = defineProps({
  hasMobileNav: {
    type: Boolean,
    default: false,
    required: true,
  },
});

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

</script>
<style scoped>
.mobile-burger {
  cursor: pointer;
  transition: all .3s;
}
.mobile-burger:hover {
  color: #F39C12;
}
.mobile-menus {
  position: absolute;
  background-color: #3498DB;
  top: calc(-100vh);
  left: 0;
  width: 100vw;
  height: 100vh;
  transition: all .3s;
  z-index: 1000;

  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  padding-left: 40px;
  padding-top: 50px;
}
.mobile-menus.active {
  top: 0
}
</style>
