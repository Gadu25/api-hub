<template>
  <div class=" flex-wrap gap-4">
    <!-- First Box -->
    <div v-if="!showForm"
      class="box w-80 h-48 bg-gray-300 items-center flex justify-center rounded-lg hover:cursor-pointer"
      @click="showForm = !showForm">
      <MdiIcon class="text-white size-8" icon="mdiPlusCircle" />
    </div>
    <div v-if="showForm" class="w-80 h-48 bg-gray-300 p-4 flex flex-col justify-start rounded-lg relative">
      <div>
        <label for="first_name" class="block mb-2 text-xl font-medium text-gray-900 dark:text-white">
          Enter Location
        </label>
        <input id="location" v-model="newLocation" type="text" placeholder="Location"
          class="mb-2 w-full p-2 rounded border border-gray-400" />
      </div>
      <button @click="cancelForm" type="button"
        class="text-white bg-orange-700 hover:bg-yellow-400 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-yellow-400 dark:hover:bg-yellow-600 focus:outline-none dark:focus:ring-yellow-400 absolute bottom-4">
        Cancel
      </button>
      <button @click="addLocation" type="button"
        class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800 absolute bottom-4 right-4">
        Submit
      </button>
    </div>

    <!-- Main Content -->
    <div class="flex flex-wrap gap-4 mt-4">
      <nuxt-link v-for="(item, index) in locations" :key="index" :to="`/weather/${item.id}`">

        <div
          class="bg-gray-100 w-80 h-48 p-4 flex flex-col justify-start rounded-lg hover:cursor-pointer"
          @click="navigateToDetails(item.id)">
          <h2 class="text-lg font-semibold">{{ item.location }}</h2>
          <p>Temperature: {{ item.temperature }}°C</p>
          <p>Condition: {{ item.condition }}</p>
        </div>
      </nuxt-link>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const showForm = ref(false);
const newLocation = ref("");
const locations = ref<{ id: string; location: string; temperature: number; condition: string }[]>([]);
const generateId = () => "_" + Math.random().toString(36).substring(2, 11);

const addLocation = () => {
  if (!newLocation.value) return;

  const newEntry = {
    id: generateId(),
    location: newLocation.value,
    temperature: Math.floor(Math.random() * 40),
    condition: ["Sunny", "Cloudy", "Rainy"][Math.floor(Math.random() * 3)],
  };

  const storedData = JSON.parse(localStorage.getItem("locations") || "[]");
  storedData.unshift(newEntry);
  localStorage.setItem("locations", JSON.stringify(storedData));

  locations.value.unshift(newEntry);

  newLocation.value = "";
  showForm.value = false;
};

const cancelForm = () => {
  showForm.value = false;
  newLocation.value = "";
};
const navigateToDetails = (id: string) => {

  router.push({ name: "weather", params: { id: id } });
};

onMounted(() => {
  const storedData = JSON.parse(localStorage.getItem("locations") || "[]");
  locations.value = storedData;
});
</script>

<style scoped>
/* Additional styles if necessary */
</style>

