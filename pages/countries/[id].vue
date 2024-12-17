<template>
    <div>
        <div class="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full flex flex-col md:flex-row">
            <!-- Left Section -->
            <div class="md:w-1/2">
                <div class="flex items-center space-x-4 mb-6">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Coat_of_arms_of_the_Philippines.svg/800px-Coat_of_arms_of_the_Philippines.svg.png"
                        alt="Coat of Arms" class="w-16 h-16" />
                    <div>
                        <h1 class="text-2xl font-bold">{{ }}</h1>
                        <p class="text-gray-600">Republic of the Philippines</p>
                        <p class="text-gray-500">Asia</p>
                    </div>
                </div>
                <div>
                    <h2 class="font-semibold text-lg mb-2">Flag</h2>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Flag_of_the_Philippines.svg/800px-Flag_of_the_Philippines.svg.png"
                        alt="Philippines Flag" class="w-32 mb-4" />
                    <p class="text-gray-600 text-sm leading-relaxed">
                        The flag of Philippines is composed of two equal horizontal bands of
                        blue and red, with a white equilateral triangle superimposed on the
                        hoist side of the field. This triangle has its base on the hoist
                        end, spans about two-fifth the width of the field and bears a
                        central golden-yellow sun with eight rays and a five-pointed
                        golden-yellow star at each vertex.
                    </p>
                </div>
            </div>

            <!-- Right Section -->
            <div class="md:w-1/2 md:pl-8 mt-6 md:mt-0">
                <h2 class="font-semibold text-lg mb-4">Info</h2>
                <ul class="space-y-2 text-gray-700">
                    <li>
                        <strong class="text-gray-800">Native Name:</strong> Pilipinas
                    </li>
                    <li>
                        <strong class="text-gray-800">Population:</strong> 109581085
                    </li>
                    <li>
                        <strong class="text-gray-800">Capital:</strong> Manila
                    </li>
                    <li>
                        <strong class="text-gray-800">Languages:</strong> Filipino, English
                    </li>
                    <li>
                        <strong class="text-gray-800">Currencies:</strong> Philippine peso
                        (₱)
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const countryId = route.params.id;
const country = ref(null);

onMounted(async () => {
    const response = await fetch(`/countries/countries/${countryId}`);
    country.value = await response.json();
    console.log(country.value);
});
</script>