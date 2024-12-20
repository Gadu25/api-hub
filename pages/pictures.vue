<script setup lang="ts"></script>

<template>
  <div>
    <div class="flex justify-center items-center mb-10">
      <h1 class="font-semibold text-3xl ">Let’ s find an image, What’s on your mind?</h1>
    </div>

    <div class="px-[25%]">
      <form class="flex items-center  mx-auto mb-10" @submit.prevent>
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
          class="bg-gray-50 border border-gray-300 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
          placeholder="Look for something..." v-model="query" required @keypress.enter="searchPicture()" />
        </div>
      </form>
    </div>

    <div v-if="!loading" class="flex flex-wrap gap-2">
    <template v-if="pictureData" v-for="pic in pictureData.results">
      <div class="flex-1 lg:min-w-[calc(50%-1rem)] xl:min-w-[calc(33.333%-1rem)] ">
        <div class="card col-span-2 bg-gray-100 shadow-md rounded-lg overflow-hidden flex h-full cursor-pointer relative" @click="openUrl(pic.urls.full)">
          <img :src="pic.urls.regular" alt="image" class="object-cover h-full w-full"/>
          <div class="card-action">
            <p>{{ pic.alt_description }}</p>
          </div>
        </div>
      </div>
    </template>
  </div>
  <div v-else class="p-52 flex justify-center items-center">
    <p>fetching pictures...</p>
  </div>



  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import { storeToRefs } from 'pinia';
  import { usePictureStore } from '~/stores/usePictureStore';

  const pictureStore = usePictureStore();
  const { pictureData, loading, error } = storeToRefs(pictureStore);

  const query = ref('');
  const isSearch = ref(false);

  const searchPicture = async () => {
    if (query.value.trim()) {
      await pictureStore.fetchPicture(query.value);
      isSearch.value = true
    } else {
      alert('Please enter a query before fetching picture.');
    }
  };

  const openUrl = (link) => {
    return window.open(link)
  }
</script>

<style scoped>
.card {
  img {
    scale: 1.2;
    transition: all 0.2s;
  }
  &:hover {
    animation: upDown .2s;
    img {
      filter: brightness(80%);
      scale: 1;
    }
    .card-action {
      opacity: 1;
    }
  }
}

.card-action {
  position: absolute;
  color: #ffffff;
  width: 100%;
  height: 50%;
  bottom: 0;
  transition: all .5s;
  opacity: 0;
  background: linear-gradient(to top, black, transparent);
  p {
    position: absolute;
    bottom: 0;
    padding: 10px;
  }
}

@keyframes upDown {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-4px);
  }
  100% {
    transform: translateY(0);
  }
}
</style>
