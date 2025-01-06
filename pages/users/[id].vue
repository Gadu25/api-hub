<template>
    <div class="w-full bg-white rounded-lg overflow-hidden">
        <!-- User Header -->
        <div class="flex flex-col items-center p-6">
            <img 
                class="w-32 h-32 rounded-full border-4 border-blue-500" 
                :src="currentUser.picture.large" 
                :alt="`${currentUser.name.first} ${currentUser.name.last}`"
            />
            <h2 class="mt-4 text-xl font-bold text-gray-800">
                {{ currentUser.name.title }} {{ currentUser.name.first }} {{ currentUser.name.last }}
            </h2>
            <p class="text-gray-500">{{ currentUser.email }}</p>
        </div>

        <!-- Personal Information -->
        <div class="p-6 border-t border-gray-200">
            <h3 class="text-lg font-semibold text-gray-800">Personal Information</h3>
            <ul class="mt-4 space-y-2 text-gray-600">
                <li><span class="font-medium">Gender:</span> {{ currentUser.gender }}</li>
                <li>
                    <span class="font-medium">Date of Birth:</span> 
                    {{ new Date(currentUser.dob.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) }} 
                    ({{ currentUser.dob.age }} years old)
                </li>
                <li><span class="font-medium">Phone:</span> {{ currentUser.phone }}</li>
                <li><span class="font-medium">Cell:</span> {{ currentUser.cell }}</li>
            </ul>
        </div>

        <!-- Address -->
        <div class="p-6 border-t border-gray-200">
            <h3 class="text-lg font-semibold text-gray-800">Address</h3>
            <p class="mt-4 text-gray-600">
                {{ currentUser.location.street.number }} {{ currentUser.location.street.name }},<br>
                {{ currentUser.location.city }}, {{ currentUser.location.state }},<br>
                {{ currentUser.location.country }}, {{ currentUser.location.postcode }}
            </p>
            <p class="mt-2 text-gray-600">
                <span class="font-medium">Timezone:</span> 
                {{ currentUser.location.timezone.description }} (UTC {{ currentUser.location.timezone.offset }})
            </p>
        </div>

        <!-- Login Information -->
        <div class="p-6 border-t border-gray-200">
            <h3 class="text-lg font-semibold text-gray-800">Login Information</h3>
            <ul class="mt-4 space-y-2 text-gray-600">
                <li><span class="font-medium">Username:</span> {{ currentUser.login.username }}</li>
                <li><span class="font-medium">UUID:</span> {{ currentUser.login.uuid }}</li>
            </ul>
        </div>
    </div>
</template>


<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useUserStore } from "~/stores/useUserStore";

const userStore = useUserStore();
const route = useRoute();
const id = ref(route.params.id)

const currentUser = computed(() => {
  const userId = Number(id.value);
  return userStore.userData.results[userId] ?? null;
});

onMounted(() => {
});
</script>