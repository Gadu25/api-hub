<template>
    <div class="w-full flex flex-col xl:flex-row p-2 gap-8">
        <!-- Left Column (Book Details) -->
        <div class="bg-white rounded-lg border shadow p-6 xl:w-[80%] overflow-auto xl:max-h-[80vh]">
            <!-- Book Information -->
            <div class="flex flex-col md:flex-row gap-6">
                <!-- Book Image -->
                <!-- <div class="w-40 h-60 bg-gray-200 rounded-lg overflow-hidden" v-if="hasImage(books.docs[id])">
                    <img class="object-cover w-full h-full" v-if="books.docs[id].isbn" :src="libraryStore.getBookImage(books.docs[id].isbn[0], 'isbn')" alt="book-image"/>
                    <img class="object-cover w-full h-full" v-else-if="books.docs[id].oclc" :src="libraryStore.getBookImage(books.docs[id].oclc[0], 'oclc')" alt="book-image"/>
                    <img class="object-cover w-full h-full" v-else-if="books.docs[id].lccn" :src="libraryStore.getBookImage(books.docs[id].lccn[0], 'lccn')" alt="book-image"/>
                    <img class="object-cover w-full h-full" v-else-if="books.docs[id].olid" :src="libraryStore.getBookImage(books.docs[id].olid[0], 'olid')" alt="book-image"/>
                </div> -->

                <div class="w-40 h-60 bg-gray-200 rounded-lg overflow-hidden" v-if="bookHasImages[id]">
                    <img class="object-cover w-full h-full" :src="bookImages[id]" alt="book-image" />
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
        <div class="bg-white rounded-lg border shadow p-6 xl:w-[20%] overflow-auto xl:max-h-[80vh]">
            <h2 class="text-lg font-semibold mb-4">Other results of your search</h2>
            <div class="space-y-4">
                 <template v-for="(book, index) in books.docs">
                    <nuxt-link v-if="index != id" :to="`/library/${index}`" class="block border-b pb-2">
                        <div class="flex items-center gap-2">
                            <div class="w-16 h-24 bg-gray-200 rounded-lg overflow-hidden" v-if="bookHasImages[index]">
                                <img class="object-cover w-full h-full" :src="bookImages[index]" alt="book-image" />
                            </div>
                            <div>
                                <p class="text-sm font-semibold text-gray-700">{{ book.title }}</p>
                                <p v-for="author in book.author_name" class="text-xs text-gray-500">
                                    {{ author }}
                                </p>
                                <p v-if="book.ratings_count > 0" class="text-xs text-gray-500">
                                    {{ parseFloat(book.ratings_average).toFixed(2) }} ★
                                </p>
                            </div>
                        </div>
                    </nuxt-link>
                 </template>
            </div>
        </div>
    </div>
</template>


<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useLibraryStore } from '~/stores/useLibraryStore';
import { useRoute } from 'vue-router';
import { checkImageSize } from "~/utils/imageUtils";

const libraryStore = useLibraryStore();
const { books, loading, error } = storeToRefs(libraryStore);

const route = useRoute();
const id = ref(route.params.id)
const bookHasImages = ref([]); // Reactive array to store image availability
const bookImages = ref([]);    // Reactive array to store image URLs

// const hasImage = (book) => {
//   return book.isbn || book.oclc || book.lccn || book.olid
// }

const hasImage = async (book) => {
  const imageSources = ['isbn', 'oclc', 'lccn', 'olid'];

  for (const source of imageSources) {
    if (book[source] && Array.isArray(book[source]) && book[source][0]) {
      const url = await libraryStore.getBookImage(book[source][0], source);
      const isValid = await checkImageSize(url, 10, 10);
      if (isValid) {
        return true;
      }
    }
  }
  return false;
};

const getImage = async (book) => {
  const imageSources = ['isbn', 'oclc', 'lccn', 'olid'];

  for (const source of imageSources) {
    if (book[source]) {
      const url = await libraryStore.getBookImage(book[source][0], source);
      const isValid = await checkImageSize(url, 10 , 10);
      if (isValid) {
        return url;
      }
    }
  }
  return null;
};

// Watch books and process their images
watchEffect(async () => {
  if (books.value.docs) {
    bookHasImages.value = Array(books.value.docs.length).fill(false);
    bookImages.value = Array(books.value.docs.length).fill(null);

    for (const [index, book] of books.value.docs.entries()) {
      bookHasImages.value[index] = await hasImage(book);
      bookImages.value[index] = await getImage(book);
    }
  }
});

const getDynamicRatingWidth = (rate) => {
    const rateCount = books.value.docs[id.value].ratings_count
    const result = (rate / rateCount) * 100
    return `width: ${Math.floor(result)}%`
}

</script>