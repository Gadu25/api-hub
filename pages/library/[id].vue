<template>
    <div class="w-full flex p-2 gap-8">
        <!-- Left Column (Book Details) -->
        <div class="bg-white rounded-lg border shadow p-6 w-[80%]">
            <!-- Book Information -->
            <div class="flex gap-6">
                <!-- Book Image -->
                <div class="w-40 h-60 bg-gray-200 rounded-lg overflow-hidden" v-if="hasImage(books.docs[id])">
                    <img class="object-cover w-full h-full" v-if="books.docs[id].isbn" :src="libraryStore.getBookImage(books.docs[id].isbn[0], 'isbn')" alt="book-image"/>
                    <img class="object-cover w-full h-full" v-else-if="books.docs[id].oclc" :src="libraryStore.getBookImage(books.docs[id].oclc[0], 'oclc')" alt="book-image"/>
                    <img class="object-cover w-full h-full" v-else-if="books.docs[id].lccn" :src="libraryStore.getBookImage(books.docs[id].lccn[0], 'lccn')" alt="book-image"/>
                    <img class="object-cover w-full h-full" v-else-if="books.docs[id].olid" :src="libraryStore.getBookImage(books.docs[id].olid[0], 'olid')" alt="book-image"/>
                </div>

                <!-- Book Details -->
                <div class="flex-1">
                    <h1 class="text-2xl font-bold mb-1">{{ books.docs[id].title }}</h1>
                    <p v-for="author in books.docs[id].author_name" class="text-gray-500 font-medium">
                        {{ author }}
                    </p>
                    <span class="text-sm"></span>
                    <p v-if="books.docs[id].want_to_read_count" class="text-gray-400 text-sm mt-1">
                        {{ books.docs[id].want_to_read_count }} people want to read this
                    </p>
                    <p v-if="books.docs[id].already_read_count" class="text-gray-400 text-sm mt-1">
                        {{ books.docs[id].already_read_count }} people read this
                    </p>
                </div>
            </div>
            <!-- Ratings -->
            <div v-if="books.docs[id].ratings_count > 0" class="mt-4">
                <div class="flex items-center text-yellow-500">
                    <span class="text-lg font-semibold mr-2">Ratings</span>
                    <span class="text-lg font-medium">{{ parseFloat(books.docs[id].ratings_average).toFixed(2) }} ★</span>
                </div>

                <!-- Rating Bars -->
                <div class="mt-2 space-y-2 w-full">
                    <div class="flex items-center">
                        <div class="text-gray-600 inline-flex items-center h-full">
                            <span class="text-gray-600 w-8 text-right mr-2 text-sm">({{ books.docs[id].ratings_count_5 }})</span>
                            <MdiIcon icon="mdiStar" /> 
                            <div class="mr-2">5</div>
                        </div>
                        <div class="h-full flex items-center w-full">
                            <div class="h-2 bg-yellow-500 rounded-full items-center" :style="getDynamicRatingWidth(books.docs[id].ratings_count_5)"></div>
                        </div>
                    </div>
                    <div class="flex items-center">
                        <div class="text-gray-600 inline-flex items-center h-full">
                            <span class="text-gray-600 w-8 text-right mr-2 text-sm">({{ books.docs[id].ratings_count_4}})</span>
                            <MdiIcon icon="mdiStar" /> 
                            <div class="mr-2">4</div>
                        </div>
                        <div class="h-full flex items-center w-full">
                            <div class="h-2 bg-yellow-500 rounded-full items-center" :style="getDynamicRatingWidth(books.docs[id].ratings_count_4)"></div>
                        </div>
                    </div>
                    <div class="flex items-center">
                        <div class="text-gray-600 inline-flex items-center h-full">
                            <span class="text-gray-600 w-8 text-right mr-2 text-sm">({{ books.docs[id].ratings_count_3}})</span>
                            <MdiIcon icon="mdiStar" /> 
                            <div class="mr-2">3</div>
                        </div>
                        <div class="h-full flex items-center w-full">
                            <div class="h-2 bg-yellow-500 rounded-full items-center" :style="getDynamicRatingWidth(books.docs[id].ratings_count_3)"></div>
                        </div>
                    </div>
                    <div class="flex items-center">
                        <div class="text-gray-600 inline-flex items-center h-full">
                            <span class="text-gray-600 w-8 text-right mr-2 text-sm">({{ books.docs[id].ratings_count_2}})</span>
                            <MdiIcon icon="mdiStar" /> 
                            <div class="mr-2">2</div>
                        </div>
                        <div class="h-full flex items-center w-full">
                            <div class="h-2 bg-yellow-500 rounded-full items-center" :style="getDynamicRatingWidth(books.docs[id].ratings_count_2)"></div>
                        </div>
                    </div>
                    <div class="flex items-center">
                        <div class="text-gray-600 inline-flex items-center h-full">
                            <span class="text-gray-600 w-8 text-right mr-2 text-sm">({{ books.docs[id].ratings_count_1}})</span>
                            <MdiIcon icon="mdiStar" /> 
                            <div class="mr-2">1</div>
                        </div>
                        <div class="h-full flex items-center w-full">
                            <div class="h-2 bg-yellow-500 rounded-full items-center" :style="getDynamicRatingWidth(books.docs[id].ratings_count_1)"></div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Publishers -->
            <div v-if="books.docs[id].publisher" class="mt-6">
                <h2 class="text-xl font-semibold mb-2">Publishers</h2>
                <ul class="list-none text-sm text-gray-700 leading-relaxed">
                    <li v-for="publisher in books.docs[id].publisher">{{ publisher }}</li>
                </ul>
            </div>
        </div>

        <!-- Right Column (Other Results) -->
        <div class="bg-white rounded-lg border shadow p-6 w-[20%]">
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
</template>


<script setup>
import newsPlaceholder from '~/assets/images/news-placeholder.png'
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useLibraryStore } from '~/stores/useLibraryStore';
import { useRoute } from 'vue-router';

const libraryStore = useLibraryStore();
const { books, loading, error } = storeToRefs(libraryStore);

const route = useRoute();
const id = ref(route.params.id)

const hasImage = (book) => {
  return book.isbn || book.oclc || book.lccn || book.olid
}

const getDynamicRatingWidth = (rate) => {
    const rateCount = books.value.docs[id.value].ratings_count
    const result = (rate / rateCount) * 100
    return `width: ${Math.floor(result)}%`
}

</script>