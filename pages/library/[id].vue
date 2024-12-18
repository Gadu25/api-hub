<template>
    <div class="p-8 bg-gray-100 ">
        <!-- Container -->
        <div class="w-full flex gap-8">
            <!-- Left Column (Book Details) -->
            <div class="bg-white rounded-lg shadow p-6 w-[80%]">
                <!-- Book Information -->
                <div class="flex gap-6">
                    <!-- Book Image -->
                    <div class="w-40 h-60 bg-gray-200 rounded-lg overflow-hidden">
                        <img src="https://via.placeholder.com/150x240" alt="Book Cover"
                            class="object-cover w-full h-full" />
                    </div>

                    <!-- Book Details -->
                    <div class="flex-1">
                        <h1 class="text-2xl font-bold mb-1">The Lord of the Rings</h1>
                        <p class="text-gray-500 font-medium">J.R.R. Tolkien <span class="text-sm">(1954)</span></p>
                        <p class="text-gray-400 text-sm mt-1">
                            1625 people want to read this <br />
                            151 people read this
                        </p>

                        <!-- Ratings -->
                        <div class="mt-4">
                            <div class="flex items-center text-yellow-500">
                                <span class="text-lg font-semibold mr-2">Ratings</span>
                                <span class="text-lg font-medium">4.5 ★</span>
                            </div>

                            <!-- Rating Bars -->
                            <div class="mt-2 space-y-2">
                                <div class="flex items-center">
                                    <span class="text-gray-600 w-8 text-right mr-2 text-sm">(60)</span>
                                    <div class="h-2 bg-yellow-500 rounded-full w-[80%]"></div>
                                </div>
                                <div class="flex items-center">
                                    <span class="text-gray-600 w-8 text-right mr-2 text-sm">(9)</span>
                                    <div class="h-2 bg-yellow-500 rounded-full w-[50%]"></div>
                                </div>
                                <div class="flex items-center">
                                    <span class="text-gray-600 w-8 text-right mr-2 text-sm">(6)</span>
                                    <div class="h-2 bg-yellow-500 rounded-full w-[30%]"></div>
                                </div>
                                <div class="flex items-center">
                                    <span class="text-gray-600 w-8 text-right mr-2 text-sm">(3)</span>
                                    <div class="h-2 bg-yellow-500 rounded-full w-[20%]"></div>
                                </div>
                                <div class="flex items-center">
                                    <span class="text-gray-600 w-8 text-right mr-2 text-sm">(2)</span>
                                    <div class="h-2 bg-yellow-500 rounded-full w-[10%]"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Publishers -->
                <div class="mt-6">
                    <h2 class="text-xl font-semibold mb-2">Publishers</h2>
                    <ul class="list-none text-sm text-gray-700 leading-relaxed">
                        <li>Mladá fronta</li>
                        <li>HarperCollins Publishers Limited</li>
                        <li>BBC Audiobooks</li>
                        <li>Presses Pocket</li>
                        <li>Folio Society</li>
                        <li>Booket</li>
                        <li>HARPER COLLINS PUBLISHERS</li>
                        <li>Recorded Books</li>
                        <li>TERRA</li>
                        <li>BBD Audio Publishing</li>
                    </ul>
                </div>
            </div>

            <!-- Right Column (Other Results) -->
            <div class="bg-white rounded-lg shadow p-6 w-[20%]">
                <h2 class="text-lg font-semibold mb-4">Other results of your search</h2>
                <div class="space-y-4">
                    <!-- Result Card -->
                    <div class="flex items-center gap-4">
                        <div class="w-16 h-24 bg-gray-200 rounded-lg overflow-hidden">
                            <img src="https://via.placeholder.com/50x75" alt="Thumbnail"
                                class="object-cover w-full h-full" />
                        </div>
                        <div>
                            <p class="text-sm font-semibold text-gray-700">The fellowship of rings</p>
                            <p class="text-xs text-gray-500">J.R.R. Tolkien</p>
                        </div>
                    </div>

                    <!-- Duplicate Results -->
                    <div class="flex items-center gap-4">
                        <div class="w-16 h-24 bg-gray-200 rounded-lg overflow-hidden">
                            <img src="https://via.placeholder.com/50x75" alt="Thumbnail"
                                class="object-cover w-full h-full" />
                        </div>
                        <div>
                            <p class="text-sm font-semibold text-gray-700">The fellowship of rings</p>
                            <p class="text-xs text-gray-500">J.R.R. Tolkien</p>
                        </div>
                    </div>

                    <div class="flex items-center gap-4">
                        <div class="w-16 h-24 bg-gray-200 rounded-lg overflow-hidden">
                            <img src="https://via.placeholder.com/50x75" alt="Thumbnail"
                                class="object-cover w-full h-full" />
                        </div>
                        <div>
                            <p class="text-sm font-semibold text-gray-700">The fellowship of rings</p>
                            <p class="text-xs text-gray-500">J.R.R. Tolkien</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>


<script setup lang="ts">
import newsPlaceholder from '~/assets/images/news-placeholder.png'
</script>