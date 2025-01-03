<template>
  <div class="flex-wrap flex justify-between px-3 py-6 mt-3">
    <div class="flex items-center">
      <span v-if="route.fullPath.split('/').length <= 2"
        class="self-center text-2xl font-semibold whitespace-nowrap dark:text-gray-700">{{ paramId }}</span>
        <div v-else class="flex items-center gap-2 text-slate-500 cursor-pointer hover:text-blue-600" @click="goBack">
          <MdiIcon icon="mdiArrowLeft" size="30"/>
          <span class=" text-md font-semibold">Back</span>
        </div>
    </div>
    <MdiIcon v-if="props.hasMobileNav" size="40" icon="mdiMenu" class="text-slate-900 cursor-pointer mobile-burger"
        @click="showNav = true" />
    <span v-else class="date-span">{{ currentDateTime }}</span> <!-- Display live dynamic date/time -->
    <div class="mobile-menus" :class="{ 'active': showNav }" @click="showNav = false">
      <div class="self-center text-xl font-semibold whitespace-nowrap dark:text-white w-full px-2 mb-4">
        API HUB
      </div>
      <CommonDrawerSidebarMenu v-for="link in menuItems" :key="link.label" :text="link.label" :icon="link.icon"
        :to="link.to" :is-active="sidebarRoute.path === link.to || false" :isDrawerOpen="true" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const route = useRoute();
const paramId = computed(() => {
  const urlSegments = route.fullPath.split('/');
  console.log('segments', urlSegments)
  if (urlSegments.length <= 2) {
    const word = urlSegments[urlSegments.length - 1]
    const firstLetter = word.charAt(0)

    const firstLetterCap = firstLetter.toUpperCase()

    const remainingLetters = word.slice(1)

    const capitalizedWord = firstLetterCap + remainingLetters
    return capitalizedWord;
  }
});
const router = useRouter();
const currentRoute = computed(() => router.currentRoute.value);
const sidebarRoute = ref(currentRoute.value);

const showNav = ref(false)

const goBack = () => {
  router.go(-1)
}

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

// Initialize currentDateTime as a ref to allow reactivity
const currentDateTime = ref("");

// Function to update the date and time every second
const updateDateTime = () => {
  const now = new Date();
  const formattedDate = now.toLocaleString('en-US', {
    weekday: 'long',  // Full weekday name
    year: 'numeric',
    month: 'short',   // Abbreviated month name
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
  currentDateTime.value = formattedDate; // Just use the formatted date from toLocaleString
};

// Call `setInterval` only when mounted on the client-side
onMounted(() => {
  updateDateTime(); // Call initially to display time immediately
  setInterval(updateDateTime, 1000); // Update every second
});
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
