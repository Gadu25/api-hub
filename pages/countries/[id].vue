
    <template>
        <div v-if="!loading">
            <div class="mx-auto bg-white rounded-lg overflow-hidden">
                <div class="flex flex-col md:flex-row rounded-lg py-2">
                    <!-- Left Section -->
                    <div>
                        <div class="flex items-center space-x-4 mb-6">
                            <img :src="country?.flags?.svg" alt="Country Flag" class="w-20 h-20 rounded-lg shadow" />
                            <div>
                                <h1 class="text-3xl font-bold text-gray-800">{{ country?.name?.common }}</h1>
                                <p class="text-gray-500 text-lg">{{ country?.region }}</p>
                                <p class="text-gray-400 text-md">{{ country?.subregion }}</p>
                            </div>
                        </div>
                        <div class="mt-4">
                            <h2 class="text-xl font-semibold text-gray-800">Flag</h2>
                            <div class="py-4 rounded-lg">
                                <img :src="country?.flags?.svg" alt="Country Flag" class="w-full h-auto rounded-lg" />
                            </div>
                            <p class="text-gray-600 text-sm leading-relaxed mt-4">
                                The flag of {{ country?.name?.common }} is composed of two equal horizontal bands...
                            </p>
                        </div>
                    </div>

                    <!-- Right Section -->
                    <div class="md:w-1/2 p-6 bg-gray-100 rounded-xl ms-2">
                        <h2 class="text-2xl font-semibold text-gray-800 mb-6">Country Info</h2>
                        <ul class="space-y-4 text-gray-700">
                            <li>
                                <strong class="block text-gray-800 font-medium">Native Name:</strong>
                                <span>{{ country?.translations?.eng?.common || 'N/A' }}</span>
                            </li>
                            <li>
                                <strong class="block text-gray-800 font-medium">Population:</strong>
                                <span>{{ country?.population?.toLocaleString() || 'N/A' }}</span>
                            </li>
                            <li>
                                <strong class="block text-gray-800 font-medium">Capital:</strong>
                                <span>{{ country?.capital?.[0] || 'N/A' }}</span>
                            </li>
                            <li>
                                <strong class="block text-gray-800 font-medium">Languages:</strong>
                                <span>{{ Object.values(country?.languages || {}).join(', ') || 'N/A' }}</span>
                            </li>
                            <li>
                                <strong class="block text-gray-800 font-medium">Currencies:</strong>
                                <span>{{ Object.values(country?.currencies || {}).map(c => c.name).join(', ') || 'N/A'
                                    }}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <div v-else class="flex items-center justify-center min-h-screen bg-gray-50">
            <p class="text-gray-500 text-lg">Loading...</p>
        </div>
    </template>




<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useCountryStore } from '~/stores/useCountryStore';

const route = useRoute();
const countryStore = useCountryStore();
const { countriesData, loading } = storeToRefs(countryStore);

const country = ref(null);

// Fetch the country details using the route parameter
onMounted(async () => {
    if (!countriesData.value.length) {
        await countryStore.fetchCountries();
    }
    const countryCode = route.params.id;
    country.value = countriesData.value.find((c) => c.cca3 === countryCode);
});
</script>
<style scoped>
    /* Additional styles for a polished look */
    body {
            font-family: 'Inter', sans-serif;
        }

        h1,
        h2,
        strong {
            letter-spacing: 0.5px;
        }

        ul li {
            line-height: 1.6;
        }
</style>